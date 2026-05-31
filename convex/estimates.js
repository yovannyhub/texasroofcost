import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Save anonymous estimate — no PII collected
export const saveEstimate = mutation({
  args: {
    session_id:  v.string(),
    city:        v.string(),
    home_size:   v.string(),
    sqft_est:    v.number(),
    roof_shape:  v.string(),
    material:    v.string(),
    age_bracket: v.string(),
    total_low:   v.number(),
    total_high:  v.number(),
    total_mid:   v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("estimates", {
      ...args,
      created_at: Date.now(),
    });
  },
});

// City stats — powers "X estimates done this month" social proof on the page
export const getCityStats = query({
  args: { city: v.string() },
  handler: async (ctx, { city }) => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const estimates = await ctx.db
      .query("estimates")
      .withIndex("by_city", q => q.eq("city", city))
      .collect();
    const recent = estimates.filter(e => e.created_at > thirtyDaysAgo);
    return {
      total:        estimates.length,
      last_30_days: recent.length,
      avg_mid:      recent.length
        ? Math.round(recent.reduce((s, e) => s + e.total_mid, 0) / recent.length)
        : null,
    };
  },
});

// Site-wide stats for homepage social proof
export const getSiteStats = query({
  handler: async (ctx) => {
    const all = await ctx.db.query("estimates").collect();
    return {
      total_estimates: all.length,
    };
  },
});
