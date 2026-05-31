import { query } from "./_generated/server";
import { v } from "convex/values";

// Get active contractors for a city — premium listings first, then featured, then free
export const getByCity = query({
  args: { city: v.string() },
  handler: async (ctx, { city }) => {
    const all = await ctx.db
      .query("contractors")
      .withIndex("by_city", q => q.eq("city", city))
      .collect();
    const tierOrder = { premium: 0, featured: 1, free: 2 };
    return all
      .filter(c => c.active)
      .sort((a, b) => (tierOrder[a.listing_tier] ?? 3) - (tierOrder[b.listing_tier] ?? 3));
  },
});

// Get all contractors for the full directory page
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("contractors")
      .filter(q => q.eq(q.field("active"), true))
      .collect();
  },
});
