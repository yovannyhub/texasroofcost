// convex/seed.js
// Run once after deploying: npx convex run seed:seedAll
import { mutation } from "./_generated/server";

export const seedAll = mutation({
  handler: async (ctx) => {

    // ── ZIP RATES (Texas cities) ──
    const cities = [
      { city:"Houston",        region:"Gulf Coast",    labor_multiplier:1.05, avg_permit_cost:380 },
      { city:"Dallas",         region:"DFW Metroplex", labor_multiplier:1.02, avg_permit_cost:350 },
      { city:"San Antonio",    region:"South Texas",   labor_multiplier:0.97, avg_permit_cost:290 },
      { city:"Austin",         region:"Central Texas", labor_multiplier:1.08, avg_permit_cost:420 },
      { city:"Fort Worth",     region:"DFW Metroplex", labor_multiplier:1.00, avg_permit_cost:320 },
      { city:"El Paso",        region:"West Texas",    labor_multiplier:0.91, avg_permit_cost:260 },
      { city:"Arlington",      region:"DFW Metroplex", labor_multiplier:1.01, avg_permit_cost:330 },
      { city:"Corpus Christi", region:"Coastal Bend",  labor_multiplier:0.94, avg_permit_cost:270 },
      { city:"Plano",          region:"DFW Metroplex", labor_multiplier:1.04, avg_permit_cost:360 },
      { city:"Lubbock",        region:"West Texas",    labor_multiplier:0.89, avg_permit_cost:240 },
      { city:"Laredo",         region:"South Texas",   labor_multiplier:0.88, avg_permit_cost:230 },
      { city:"Amarillo",       region:"Panhandle",     labor_multiplier:0.90, avg_permit_cost:250 },
      { city:"Garland",        region:"DFW Metroplex", labor_multiplier:1.01, avg_permit_cost:320 },
      { city:"Irving",         region:"DFW Metroplex", labor_multiplier:1.02, avg_permit_cost:335 },
      { city:"Other Texas",    region:"Statewide",     labor_multiplier:0.95, avg_permit_cost:290 },
    ];
    for (const c of cities) {
      await ctx.db.insert("zip_rates", { ...c, updated_at: Date.now() });
    }

    // ── MATERIALS ──
    const materials = [
      {
        slug:"asphalt", name:"Asphalt shingles",
        cost_low:3.50, cost_high:5.50, lifespan_years:"20–30 years",
        popular_in_texas:true,
        description:"Most common roofing material in Texas. Affordable, widely available, and handles Texas heat well.",
      },
      {
        slug:"metal", name:"Metal roofing",
        cost_low:7.00, cost_high:14.00, lifespan_years:"40–70 years",
        popular_in_texas:true,
        description:"Increasingly popular in Texas for hail resistance and energy efficiency. Higher upfront cost, lower long-term cost.",
      },
      {
        slug:"tile", name:"Clay / Concrete tile",
        cost_low:10.00, cost_high:18.00, lifespan_years:"50+ years",
        popular_in_texas:true,
        description:"Common in South Texas and San Antonio. Beautiful and durable, but heavy — requires reinforced framing.",
      },
    ];
    for (const m of materials) {
      await ctx.db.insert("materials", { ...m });
    }

    // ── CONTRACTORS (initial Texas seed data) ──
    const contractors = [
      // Houston
      { name:"Longhorn Roofing", city:"Houston", metro_area:"Houston Metro",
        phone:"(713) 555-0142", website:"https://longhornroofing.com",
        rating:5.0, review_count:142, badge:"Top rated",
        specialties:["Residential","Storm damage","Free inspection"],
        listing_tier:"featured", active:true },
      { name:"Christian Brothers Roofing", city:"Houston", metro_area:"Houston Metro",
        phone:"(713) 555-0198", rating:5.0, review_count:98, badge:"Licensed & insured",
        specialties:["Residential","Insurance claims"],
        listing_tier:"free", active:true },
      { name:"Amstill Roofing", city:"Houston", metro_area:"Houston Metro",
        phone:"(713) 555-0201", rating:4.0, review_count:201, badge:"25+ years",
        specialties:["Asphalt","Metal","Tile"],
        listing_tier:"free", active:true },
      // Dallas
      { name:"Hedrick Construction", city:"Dallas", metro_area:"DFW Metroplex",
        phone:"(214) 555-0187", rating:5.0, review_count:187, badge:"Top rated",
        specialties:["Residential","Commercial","Hail repair"],
        listing_tier:"featured", active:true },
      { name:"ProCraft Roofing", city:"Dallas", metro_area:"DFW Metroplex",
        phone:"(972) 555-0113", rating:5.0, review_count:113, badge:"Licensed & insured",
        specialties:["Asphalt","Metal","Storm"],
        listing_tier:"free", active:true },
      { name:"Falcon Roofing", city:"Dallas", metro_area:"DFW Metroplex",
        phone:"(214) 555-0076", rating:4.0, review_count:76, badge:"Family owned",
        specialties:["Residential","Free estimate"],
        listing_tier:"free", active:true },
      // San Antonio
      { name:"Remedy Roofing", city:"San Antonio", metro_area:"San Antonio Metro",
        phone:"(210) 555-0164", rating:5.0, review_count:164, badge:"Top rated",
        specialties:["Residential","Tile","Asphalt"],
        listing_tier:"featured", active:true },
      { name:"Rhino Roofing", city:"San Antonio", metro_area:"San Antonio Metro",
        phone:"(210) 555-0209", rating:5.0, review_count:209, badge:"Licensed & insured",
        specialties:["Storm damage","Insurance"],
        listing_tier:"free", active:true },
      // Austin
      { name:"Centex Roofing", city:"Austin", metro_area:"Austin Metro",
        phone:"(512) 555-0143", rating:5.0, review_count:143, badge:"Top rated",
        specialties:["Residential","Storm","Insurance"],
        listing_tier:"featured", active:true },
      { name:"Dreamstyle Roofing", city:"Austin", metro_area:"Austin Metro",
        phone:"(512) 555-0097", rating:5.0, review_count:97, badge:"Licensed & insured",
        specialties:["Premium","Metal","Asphalt"],
        listing_tier:"free", active:true },
    ];
    for (const c of contractors) {
      await ctx.db.insert("contractors", { ...c, joined_at: Date.now() });
    }

    return { message: "✅ Seed complete", cities: cities.length, materials: materials.length, contractors: contractors.length };
  },
});
