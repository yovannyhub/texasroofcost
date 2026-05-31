import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  // Labor cost multipliers per Texas city
  zip_rates: defineTable({
    city:              v.string(),
    region:            v.string(),   // "DFW", "Houston Metro", etc.
    labor_multiplier:  v.number(),   // 1.05 = 5% above state avg
    avg_permit_cost:   v.number(),   // average permit fee in $
    updated_at:        v.number(),
  }).index("by_city", ["city"]),

  // Roofing material cost data
  materials: defineTable({
    slug:              v.string(),   // "asphalt", "metal", "tile"
    name:              v.string(),
    cost_low:          v.number(),   // $ per sq ft, low end
    cost_high:         v.number(),   // $ per sq ft, high end
    lifespan_years:    v.string(),   // "20-30 years"
    popular_in_texas:  v.boolean(),
    description:       v.string(),
  }).index("by_slug", ["slug"]),

  // Anonymous estimate sessions — zero PII stored
  estimates: defineTable({
    session_id:   v.string(),   // random UUID, never linked to a user
    city:         v.string(),
    home_size:    v.string(),   // "Small", "Medium", "Large", "Extra large"
    sqft_est:     v.number(),
    roof_shape:   v.string(),   // "Gable", "Hip", "Flat", "Steep"
    material:     v.string(),   // "asphalt", "metal", "tile"
    age_bracket:  v.string(),   // "Recently", "2010–2020", etc.
    total_low:    v.number(),
    total_high:   v.number(),
    total_mid:    v.number(),
    created_at:   v.number(),
    // ✅ No name, email, phone, address — ever
  }).index("by_city",    ["city"])
    .index("by_created", ["created_at"]),

  // Texas contractor directory
  contractors: defineTable({
    name:          v.string(),
    city:          v.string(),
    metro_area:    v.string(),
    phone:         v.string(),
    website:       v.optional(v.string()),
    rating:        v.number(),              // 1.0 – 5.0
    review_count:  v.number(),
    specialties:   v.array(v.string()),     // ["Residential","Metal","Storm damage"]
    badge:         v.string(),              // "Top rated", "Licensed & insured"
    listing_tier:  v.string(),              // "free" | "featured" | "premium"
    active:        v.boolean(),
    joined_at:     v.number(),
  }).index("by_city",  ["city"])
    .index("by_metro", ["metro_area"])
    .index("by_tier",  ["listing_tier"]),

  // SEO blog articles
  articles: defineTable({
    slug:             v.string(),
    title:            v.string(),
    meta_description: v.string(),
    category:         v.string(),          // "cost-guides", "materials", "contractors"
    city_tag:         v.optional(v.string()),
    published:        v.boolean(),
    published_at:     v.number(),
    read_time_mins:   v.number(),
  }).index("by_slug",     ["slug"])
    .index("by_category", ["category"]),

});
