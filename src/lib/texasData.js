export const TEXAS_CITIES = [
  { city:'Houston',        region:'Gulf Coast',    mult:1.05, permit:380, icon:'🌆', sub:'Harris County area' },
  { city:'Dallas',         region:'DFW Metroplex', mult:1.02, permit:350, icon:'🏙️', sub:'DFW Metroplex' },
  { city:'San Antonio',    region:'South Texas',   mult:0.97, permit:290, icon:'🌉', sub:'Bexar County area' },
  { city:'Austin',         region:'Central Texas', mult:1.08, permit:420, icon:'🎸', sub:'Travis County area' },
  { city:'Fort Worth',     region:'DFW Metroplex', mult:1.00, permit:320, icon:'🤠', sub:'Tarrant County area' },
  { city:'El Paso',        region:'West Texas',    mult:0.91, permit:260, icon:'🏜️', sub:'West Texas' },
  { city:'Arlington',      region:'DFW Metroplex', mult:1.01, permit:330, icon:'🏟️', sub:'Tarrant County' },
  { city:'Corpus Christi', region:'Coastal Bend',  mult:0.94, permit:270, icon:'🌊', sub:'Nueces County' },
  { city:'Plano',          region:'DFW Metroplex', mult:1.04, permit:360, icon:'🏘️', sub:'Collin County' },
  { city:'Lubbock',        region:'West Texas',    mult:0.89, permit:240, icon:'🌾', sub:'West Texas' },
  { city:'Laredo',         region:'South Texas',   mult:0.88, permit:230, icon:'🌵', sub:'Webb County' },
  { city:'Amarillo',       region:'Panhandle',     mult:0.90, permit:250, icon:'💨', sub:'Panhandle Texas' },
  { city:'Garland',        region:'DFW Metroplex', mult:1.01, permit:320, icon:'🏠', sub:'Dallas County' },
  { city:'Irving',         region:'DFW Metroplex', mult:1.02, permit:335, icon:'🏢', sub:'Dallas County' },
  { city:'Other Texas',    region:'Statewide',     mult:0.95, permit:290, icon:'📍', sub:'Regional average' },
]

export const HOME_SIZES = [
  { label:'Small',       sqft:1100, desc:'Under 1,500 sq ft', sub:'1–2 bedrooms',    icon:'🏠' },
  { label:'Medium',      sqft:1800, desc:'1,500–2,200 sq ft', sub:'3 bedrooms',      icon:'🏡' },
  { label:'Large',       sqft:2700, desc:'2,200–3,200 sq ft', sub:'4 bedrooms',      icon:'🏘️' },
  { label:'Extra large', sqft:3800, desc:'Over 3,200 sq ft',  sub:'5+ bedrooms',     icon:'🏰' },
  { label:'Not sure',    sqft:1800, desc:'Texas average',     sub:"We'll estimate",  icon:'🤷' },
]

export const ROOF_SHAPES = [
  { shape:'Gable', pitch:1.00, label:'Gable / Triangle', desc:'Two sloping sides, peak in middle' },
  { shape:'Hip',   pitch:1.18, label:'Hip roof',         desc:'All four sides slope inward' },
  { shape:'Flat',  pitch:0.85, label:'Flat / Low slope', desc:'Nearly flat or very slight pitch' },
  { shape:'Steep', pitch:1.28, label:'Steep / Tall peak', desc:'Very steep slopes, tall peak' },
]

export const AGE_BRACKETS = [
  { label:'Recently',      years:5,  adj:0.95, hint:'Within last 5 years' },
  { label:'2010 – 2020',   years:12, adj:1.00, hint:'About 5–15 years old' },
  { label:'2000 – 2010',   years:22, adj:1.06, hint:'About 15–25 years old' },
  { label:'Before 2000',   years:32, adj:1.12, hint:'25+ years old' },
  { label:"I don't know",  years:15, adj:1.02, hint:"We'll use a safe estimate" },
]

export const MATERIALS = [
  { slug:'asphalt', name:'Asphalt shingles', costLow:3.50, costHigh:5.50, life:'20–30 years', pop:'80% of TX homes',      icon:'🏠', texasNote:'Most common in Texas' },
  { slug:'metal',   name:'Metal roofing',    costLow:7.00, costHigh:14.0, life:'40–70 years', pop:'Hail resistant',        icon:'⚙️', texasNote:'Great for hail resistance' },
  { slug:'tile',    name:'Clay / Tile',      costLow:10.0, costHigh:18.0, life:'50+ years',   pop:'Popular in South TX',   icon:'🏛️', texasNote:'Common in San Antonio area' },
  { slug:'notsure', name:'Not sure',         costLow:3.50, costHigh:5.50, life:'20–30 years', pop:'Safe default',          icon:'🤷', texasNote:"We'll use asphalt average" },
]

export const CONTRACTORS = {
  'Houston': [
    { name:'Longhorn Roofing',           metro:'Houston & surrounding areas', badge:'Top rated',        tags:['Residential','Storm damage'],   stars:'★★★★★', reviews:'142 reviews', phone:'(713) 555-0142', color:'#C8572A' },
    { name:'Christian Brothers Roofing', metro:'Greater Houston area',        badge:'Licensed & insured',tags:['Insurance claims'],             stars:'★★★★★', reviews:'98 reviews',  phone:'(713) 555-0198', color:'#3D4A5C' },
    { name:'Amstill Roofing',            metro:'Houston metro',               badge:'25+ years',         tags:['Asphalt','Metal','Tile'],       stars:'★★★★☆', reviews:'201 reviews', phone:'(713) 555-0201', color:'#2D7A4F' },
  ],
  'Dallas': [
    { name:'Hedrick Construction', metro:'DFW Metroplex',    badge:'Top rated',         tags:['Residential','Hail repair'], stars:'★★★★★', reviews:'187 reviews', phone:'(214) 555-0187', color:'#C8572A' },
    { name:'ProCraft Roofing',     metro:'DFW & North Texas',badge:'Licensed & insured',tags:['Asphalt','Metal'],           stars:'★★★★★', reviews:'113 reviews', phone:'(972) 555-0113', color:'#3D4A5C' },
    { name:'Falcon Roofing',       metro:'Dallas metro',     badge:'Family owned',      tags:['Residential'],               stars:'★★★★☆', reviews:'76 reviews',  phone:'(214) 555-0076', color:'#854F0B' },
  ],
  'San Antonio': [
    { name:'Remedy Roofing', metro:'San Antonio & Bexar County', badge:'Top rated',         tags:['Residential','Tile'], stars:'★★★★★', reviews:'164 reviews', phone:'(210) 555-0164', color:'#C8572A' },
    { name:'Rhino Roofing',  metro:'San Antonio metro',          badge:'Licensed & insured',tags:['Storm damage'],       stars:'★★★★★', reviews:'209 reviews', phone:'(210) 555-0209', color:'#3D4A5C' },
    { name:'Big G Roofing',  metro:'Greater San Antonio area',   badge:'20+ years',         tags:['Metal','Asphalt'],    stars:'★★★★☆', reviews:'88 reviews',  phone:'(210) 555-0088', color:'#2D7A4F' },
  ],
  'Austin': [
    { name:'Centex Roofing',              metro:'Austin & Central Texas', badge:'Top rated',         tags:['Residential','Storm'], stars:'★★★★★', reviews:'143 reviews', phone:'(512) 555-0143', color:'#C8572A' },
    { name:'Dreamstyle Roofing',          metro:'Austin metro',           badge:'Licensed & insured',tags:['Premium','Metal'],     stars:'★★★★★', reviews:'97 reviews',  phone:'(512) 555-0097', color:'#3D4A5C' },
    { name:'Austin Roofing & Water Damage',metro:'Travis & Williamson Co.',badge:'24/7 service',     tags:['Emergency'],           stars:'★★★★☆', reviews:'61 reviews',  phone:'(512) 555-0061', color:'#854F0B' },
  ],
  'Fort Worth': [
    { name:'Fort Worth Roofing Pro', metro:'Fort Worth & Tarrant County', badge:'Top rated',         tags:['Residential','Hail'], stars:'★★★★★', reviews:'118 reviews', phone:'(817) 555-0118', color:'#C8572A' },
    { name:'Lone Star Roofing',      metro:'Tarrant County area',         badge:'Licensed & insured',tags:['Asphalt','Metal'],    stars:'★★★★☆', reviews:'74 reviews',  phone:'(817) 555-0074', color:'#3D4A5C' },
  ],
  'El Paso': [
    { name:'Sun City Roofing',  metro:'El Paso & West Texas', badge:'Top rated',         tags:['Residential','Flat','Tile'], stars:'★★★★★', reviews:'82 reviews', phone:'(915) 555-0082', color:'#C8572A' },
    { name:'Desert Roofing Co.',metro:'El Paso metro',        badge:'Licensed & insured',tags:['Asphalt','Metal'],           stars:'★★★★☆', reviews:'54 reviews', phone:'(915) 555-0054', color:'#3D4A5C' },
  ],
  'Corpus Christi': [
    { name:'Coastal Roofing TX', metro:'Corpus Christi & Coastal Bend', badge:'Top rated',         tags:['Hurricane prep','Residential'], stars:'★★★★★', reviews:'71 reviews', phone:'(361) 555-0071', color:'#C8572A' },
    { name:'Gulf Coast Roofing', metro:'Nueces County area',            badge:'Licensed & insured',tags:['Metal','Storm'],               stars:'★★★★☆', reviews:'48 reviews', phone:'(361) 555-0048', color:'#3D4A5C' },
  ],
  'Lubbock': [
    { name:'South Plains Roofing', metro:'Lubbock & West Texas', badge:'Top rated',   tags:['Residential','Hail'], stars:'★★★★★', reviews:'93 reviews', phone:'(806) 555-0093', color:'#C8572A' },
    { name:'Plains Roofing Pros',  metro:'Lubbock metro',        badge:'Family owned',tags:['Asphalt','Metal'],    stars:'★★★★☆', reviews:'41 reviews', phone:'(806) 555-0041', color:'#3D4A5C' },
  ],
}

export function getContractors(city) {
  return CONTRACTORS[city] || CONTRACTORS['Dallas']
}

export function calculateEstimate({ sqft, pitch, ageFactor, costLow, costHigh, laborMult, permitCost }) {
  const roofArea = sqft * 1.4 * pitch
  const matLow   = Math.round(roofArea * costLow  * ageFactor / 100) * 100
  const matHigh  = Math.round(roofArea * costHigh * ageFactor / 100) * 100
  const labLow   = Math.round(roofArea * 1.55 * laborMult * pitch / 100) * 100
  const labHigh  = Math.round(roofArea * 2.10 * laborMult * pitch / 100) * 100
  const disposal = Math.round((280 + roofArea * 0.14) / 50) * 50
  const permit   = Math.round(permitCost / 50) * 50
  const totalLow  = matLow  + labLow  + disposal + permit
  const totalHigh = matHigh + labHigh + disposal + permit
  const totalMid  = Math.round((totalLow  + totalHigh) / 200) * 100
  const matMid    = Math.round((matLow    + matHigh)   / 200) * 100
  const labMid    = Math.round((labLow    + labHigh)   / 200) * 100
  return { totalLow, totalMid, totalHigh, matMid, labMid, disposal, permit, roofArea: Math.round(roofArea) }
}

export const fmt = (n) => {
  const rounded = Math.round(n / 100) * 100
  return '$' + rounded.toLocaleString()
}
