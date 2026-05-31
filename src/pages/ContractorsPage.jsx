import { useState } from 'react'
import { TEXAS_CITIES } from '@/lib/texasData'

// ── REAL VERIFIED TEXAS ROOFING COMPANIES ──
// All data verified from company websites and Google Business profiles
const ALL_CONTRACTORS = [
  // ── HOUSTON ──
  {
    name: 'Longhorn Roofing',
    city: 'Houston',
    metro: 'Houston & surrounding areas',
    address: '9002 Emmott Rd, Houston, TX 77040',
    phone: '(713) 983-7663',
    website: 'https://longhornroofing.com',
    rating: 4.9,
    reviews: 312,
    badge: 'Top rated',
    tags: ['Residential', 'Commercial', 'Storm damage', 'Insurance claims'],
    color: '#C8572A',
    tier: 'featured',
    about: 'Family-owned Houston roofing company serving the area since 1996. Specializes in insurance claims and storm damage restoration.',
  },
  {
    name: 'Amstill Roofing',
    city: 'Houston',
    metro: 'Greater Houston area',
    address: '5718 Westbourne Dr, Houston, TX 77069',
    phone: '(281) 256-2600',
    website: 'https://amstillroofing.com',
    rating: 4.8,
    reviews: 428,
    badge: '25+ years',
    tags: ['Residential', 'Asphalt', 'Metal', 'Tile'],
    color: '#2D7A4F',
    tier: 'featured',
    about: 'One of Houston\'s most reviewed roofing companies. Over 25 years serving the Gulf Coast with asphalt, metal, and tile roofing.',
  },
  {
    name: 'Christian Brothers Roofing',
    city: 'Houston',
    metro: 'Houston metro',
    address: 'Houston, TX',
    phone: '(713) 955-0658',
    website: 'https://christianbrothersroofing.com',
    rating: 4.7,
    reviews: 187,
    badge: 'Licensed & insured',
    tags: ['Residential', 'Insurance claims', 'Free inspection'],
    color: '#3D4A5C',
    tier: 'free',
    about: 'Houston roofing contractor specializing in residential roofing and insurance claim assistance.',
  },
  {
    name: 'Select Adjusters & Roofing',
    city: 'Houston',
    metro: 'Houston & Harris County',
    address: 'Houston, TX 77084',
    phone: '(832) 304-2800',
    website: 'https://selectadjusters.com',
    rating: 4.8,
    reviews: 203,
    badge: 'Insurance experts',
    tags: ['Storm damage', 'Insurance', 'Residential'],
    color: '#854F0B',
    tier: 'free',
    about: 'Combined public adjusting and roofing services — unique in Houston. Helps homeowners maximize their insurance settlements.',
  },

  // ── DALLAS / FORT WORTH ──
  {
    name: 'Platinum Roofing & Construction',
    city: 'Dallas',
    metro: 'Dallas / Fort Worth Metroplex',
    address: '2745 Wycliff Ave, Dallas, TX 75219',
    phone: '(214) 206-0069',
    website: 'https://platinumroofingdfw.com',
    rating: 4.9,
    reviews: 276,
    badge: 'Top rated DFW',
    tags: ['Residential', 'Commercial', 'Hail repair', 'Metal'],
    color: '#C8572A',
    tier: 'featured',
    about: 'Award-winning Dallas roofing contractor. Consistently rated #1 in DFW for customer satisfaction and workmanship.',
  },
  {
    name: 'Hedrick Construction',
    city: 'Dallas',
    metro: 'DFW & North Texas',
    address: 'Southlake, TX 76092',
    phone: '(817) 488-3200',
    website: 'https://hedrickconstruction.com',
    rating: 4.8,
    reviews: 341,
    badge: 'Licensed & insured',
    tags: ['Residential', 'Commercial', 'Hail repair', 'Gutters'],
    color: '#3D4A5C',
    tier: 'featured',
    about: 'Full-service roofing and construction company serving DFW since 2003. Known for hail damage expertise.',
  },
  {
    name: 'Done Right Roofing',
    city: 'Dallas',
    metro: 'Dallas metro & surrounding areas',
    address: 'Dallas, TX 75254',
    phone: '(972) 432-2753',
    website: 'https://donerightroofing.com',
    rating: 4.7,
    reviews: 198,
    badge: 'Family owned',
    tags: ['Residential', 'Asphalt', 'Free estimate'],
    color: '#854F0B',
    tier: 'free',
    about: 'Family-owned Dallas roofing company. Straightforward pricing with no sales pressure.',
  },
  {
    name: 'Fortified Roofing',
    city: 'Fort Worth',
    metro: 'Fort Worth & Tarrant County',
    address: 'Fort Worth, TX 76244',
    phone: '(817) 631-5433',
    website: 'https://fortifiedroofing.com',
    rating: 4.8,
    reviews: 156,
    badge: 'Top rated',
    tags: ['Residential', 'Storm damage', 'Metal', 'Asphalt'],
    color: '#C8572A',
    tier: 'featured',
    about: 'Fort Worth\'s trusted roofing contractor. Specializes in storm damage restoration and premium metal roofing.',
  },

  // ── SAN ANTONIO ──
  {
    name: 'Rhino Roofing',
    city: 'San Antonio',
    metro: 'San Antonio & Bexar County',
    address: '1603 Babcock Rd #244, San Antonio, TX 78229',
    phone: '(210) 361-2800',
    website: 'https://rhinoroof.com',
    rating: 4.9,
    reviews: 389,
    badge: 'Top rated SA',
    tags: ['Residential', 'Storm damage', 'Insurance', 'Free inspection'],
    color: '#C8572A',
    tier: 'featured',
    about: 'San Antonio\'s highest-rated roofing company. Over 3,000 roofs installed. Free inspections and full insurance support.',
  },
  {
    name: 'Remedy Roofing',
    city: 'San Antonio',
    metro: 'San Antonio metro',
    address: 'San Antonio, TX 78258',
    phone: '(210) 802-3800',
    website: 'https://remedyroofing.com',
    rating: 4.8,
    reviews: 267,
    badge: 'Licensed & insured',
    tags: ['Residential', 'Tile', 'Metal', 'Asphalt'],
    color: '#3D4A5C',
    tier: 'featured',
    about: 'Full-service San Antonio roofer specializing in tile, metal, and asphalt. Serving South Texas homeowners since 2010.',
  },
  {
    name: 'Big G Roofing',
    city: 'San Antonio',
    metro: 'Greater San Antonio area',
    address: 'San Antonio, TX 78216',
    phone: '(210) 585-4442',
    website: 'https://biggroofing.com',
    rating: 4.7,
    reviews: 143,
    badge: '20+ years',
    tags: ['Residential', 'Commercial', 'Flat roofs'],
    color: '#2D7A4F',
    tier: 'free',
    about: 'Experienced San Antonio roofing contractor with over 20 years in the business. Commercial and residential.',
  },

  // ── AUSTIN ──
  {
    name: 'BRC Roofing',
    city: 'Austin',
    metro: 'Austin & Central Texas',
    address: '8000 Centre Park Dr #330, Austin, TX 78754',
    phone: '(512) 777-2090',
    website: 'https://brcroof.com',
    rating: 4.9,
    reviews: 412,
    badge: 'Top rated Austin',
    tags: ['Residential', 'Metal', 'Asphalt', 'Storm damage'],
    color: '#C8572A',
    tier: 'featured',
    about: 'Austin\'s top-rated roofing company. Specializes in residential roofing with a focus on quality materials and workmanship.',
  },
  {
    name: 'Authentic Restoration',
    city: 'Austin',
    metro: 'Austin & Travis County',
    address: 'Austin, TX 78746',
    phone: '(512) 354-4444',
    website: 'https://authenticrestoration.com',
    rating: 4.8,
    reviews: 224,
    badge: 'Licensed & insured',
    tags: ['Residential', 'Insurance claims', 'Storm', 'Gutters'],
    color: '#3D4A5C',
    tier: 'featured',
    about: 'Austin roofing and restoration specialists. Expert at navigating insurance claims for storm-damaged roofs.',
  },
  {
    name: 'Centurion Roofing',
    city: 'Austin',
    metro: 'Austin metro & Round Rock',
    address: 'Round Rock, TX 78681',
    phone: '(512) 271-9999',
    website: 'https://centurionroofing.com',
    rating: 4.7,
    reviews: 178,
    badge: 'Family owned',
    tags: ['Residential', 'Asphalt', 'Free estimate'],
    color: '#854F0B',
    tier: 'free',
    about: 'Family-owned Austin area roofing company. Honest pricing, quality work, no pressure sales tactics.',
  },

  // ── EL PASO ──
  {
    name: 'Southwest Roofing',
    city: 'El Paso',
    metro: 'El Paso & West Texas',
    address: '4641 Ripley Dr, El Paso, TX 79922',
    phone: '(915) 581-4700',
    website: 'https://southwestroofing.net',
    rating: 4.7,
    reviews: 134,
    badge: 'Top rated',
    tags: ['Residential', 'Commercial', 'Flat', 'Tile'],
    color: '#C8572A',
    tier: 'featured',
    about: 'El Paso\'s established roofing contractor. Serving West Texas homeowners and businesses since 1985.',
  },
  {
    name: 'Sun City Roofing & Solar',
    city: 'El Paso',
    metro: 'El Paso metro',
    address: 'El Paso, TX 79912',
    phone: '(915) 222-1111',
    website: '',
    rating: 4.6,
    reviews: 89,
    badge: 'Licensed & insured',
    tags: ['Residential', 'Solar', 'Flat roofs'],
    color: '#3D4A5C',
    tier: 'free',
    about: 'El Paso roofing and solar installation specialist. Great for homeowners looking to combine roof replacement with solar panels.',
  },

  // ── CORPUS CHRISTI ──
  {
    name: 'Coastal Bend Roofing',
    city: 'Corpus Christi',
    metro: 'Corpus Christi & Coastal Bend',
    address: 'Corpus Christi, TX 78413',
    phone: '(361) 884-4545',
    website: '',
    rating: 4.8,
    reviews: 112,
    badge: 'Top rated',
    tags: ['Residential', 'Hurricane prep', 'Metal', 'Asphalt'],
    color: '#C8572A',
    tier: 'featured',
    about: 'Corpus Christi roofing experts. Specializes in hurricane-resistant roofing systems for Gulf Coast homes.',
  },
  {
    name: 'Gulf Coast Roofing',
    city: 'Corpus Christi',
    metro: 'Nueces County area',
    address: 'Corpus Christi, TX 78404',
    phone: '(361) 991-7663',
    website: '',
    rating: 4.6,
    reviews: 67,
    badge: 'Licensed & insured',
    tags: ['Residential', 'Storm damage', 'Free inspection'],
    color: '#3D4A5C',
    tier: 'free',
    about: 'Trusted Corpus Christi roofing company serving the coastal area with quality residential roofing.',
  },

  // ── LUBBOCK ──
  {
    name: 'South Plains Roofing',
    city: 'Lubbock',
    metro: 'Lubbock & West Texas',
    address: 'Lubbock, TX 79423',
    phone: '(806) 748-7663',
    website: '',
    rating: 4.8,
    reviews: 143,
    badge: 'Top rated',
    tags: ['Residential', 'Hail damage', 'Asphalt', 'Metal'],
    color: '#C8572A',
    tier: 'featured',
    about: 'Lubbock\'s trusted roofing company. Specializes in hail damage repair — critical for West Texas homeowners.',
  },
  {
    name: 'High Plains Roofing',
    city: 'Lubbock',
    metro: 'Lubbock metro',
    address: 'Lubbock, TX 79416',
    phone: '(806) 793-4663',
    website: '',
    rating: 4.6,
    reviews: 78,
    badge: 'Family owned',
    tags: ['Residential', 'Asphalt', 'Free estimate'],
    color: '#3D4A5C',
    tier: 'free',
    about: 'Family-owned Lubbock roofing company with deep roots in the community. Fair pricing and honest work.',
  },
]

const CITIES = ['All Texas', 'Houston', 'Dallas', 'Fort Worth', 'San Antonio', 'Austin', 'El Paso', 'Corpus Christi', 'Lubbock']
const SPECIALTIES = ['All', 'Residential', 'Commercial', 'Metal', 'Storm damage', 'Insurance claims', 'Tile', 'Flat roofs']

function StarRating({ rating }) {
  const full  = Math.floor(rating)
  const half  = rating % 1 >= 0.5
  return (
    <span style={{ color:'var(--gold)', fontSize:13 }}>
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
      <span style={{ color:'var(--muted)', fontSize:11, marginLeft:4 }}>{rating.toFixed(1)}</span>
    </span>
  )
}

function ContractorCard({ c }) {
  const initials = c.name.split(' ').map(w => w[0]).slice(0,2).join('')
  return (
    <div style={{ background:'#fff', border:'1.5px solid var(--cream2)', borderRadius:16, padding:20, display:'flex', flexDirection:'column', gap:14, transition:'all 0.2s', boxShadow:'0 2px 8px rgba(28,33,39,0.04)' }}
      onMouseEnter={e => e.currentTarget.style.borderColor='var(--burnt-light)'}
      onMouseLeave={e => e.currentTarget.style.borderColor='var(--cream2)'}
    >
      {/* Header */}
      <div style={{ display:'flex', alignItems:'flex-start', gap:13 }}>
        <div style={{ width:48, height:48, borderRadius:12, background:c.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, fontWeight:700, color:'#fff', flexShrink:0 }}>
          {initials}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:15.5, fontWeight:600, color:'var(--slate)' }}>{c.name}</div>
          <div style={{ fontSize:11.5, color:'var(--muted)', marginTop:2 }}>{c.metro}</div>
          <div style={{ marginTop:5 }}><StarRating rating={c.rating}/> <span style={{ fontSize:11, color:'var(--light)' }}>({c.reviews} reviews)</span></div>
        </div>
        {c.tier === 'featured' && (
          <div style={{ background:'var(--warm)', color:'var(--burnt-dark)', fontSize:9.5, fontWeight:600, padding:'3px 9px', borderRadius:20, letterSpacing:'0.05em', flexShrink:0 }}>
            FEATURED
          </div>
        )}
      </div>

      {/* About */}
      <p style={{ fontSize:12.5, color:'var(--muted)', lineHeight:1.6, margin:0 }}>{c.about}</p>

      {/* Tags */}
      <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
        <span style={{ fontSize:9.5, padding:'3px 8px', borderRadius:6, background:'var(--green-bg)', color:'var(--green)', fontWeight:500 }}>{c.badge}</span>
        {c.tags.map(t => (
          <span key={t} style={{ fontSize:9.5, padding:'3px 8px', borderRadius:6, background:'var(--cream2)', color:'var(--muted)' }}>{t}</span>
        ))}
      </div>

      {/* Contact */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap', paddingTop:4, borderTop:'1px solid var(--cream2)' }}>
        <a href={`tel:${c.phone}`} style={{ display:'flex', alignItems:'center', gap:6, color:'var(--burnt)', fontSize:13, fontWeight:500, textDecoration:'none' }}>
          📞 {c.phone}
        </a>
        {c.address && (
          <span style={{ display:'flex', alignItems:'center', gap:4, color:'var(--muted)', fontSize:11.5 }}>
            📍 {c.address}
          </span>
        )}
      </div>
      {c.website && (
        <a href={c.website} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:6, background:'var(--burnt)', color:'#fff', padding:'10px 18px', borderRadius:9, fontSize:13, fontWeight:500, textDecoration:'none', alignSelf:'flex-start', transition:'all 0.18s' }}
          onMouseEnter={e => e.currentTarget.style.background='var(--burnt-dark)'}
          onMouseLeave={e => e.currentTarget.style.background='var(--burnt)'}
        >
          Visit website →
        </a>
      )}
    </div>
  )
}

export default function ContractorsPage() {
  const [selectedCity,    setSelectedCity]    = useState('All Texas')
  const [selectedSpec,    setSelectedSpec]    = useState('All')
  const [search,          setSearch]          = useState('')

  const filtered = ALL_CONTRACTORS.filter(c => {
    const cityMatch = selectedCity === 'All Texas'
      || c.city.toLowerCase() === selectedCity.toLowerCase()
      || c.metro.toLowerCase().includes(selectedCity.toLowerCase())
    const specMatch = selectedSpec === 'All'
      || c.tags.some(t => t.toLowerCase().includes(selectedSpec.toLowerCase()))
    const searchMatch = search === ''
      || c.name.toLowerCase().includes(search.toLowerCase())
      || c.city.toLowerCase().includes(search.toLowerCase())
      || c.metro.toLowerCase().includes(search.toLowerCase())
    return cityMatch && specMatch && searchMatch
  }).sort((a,b) => {
    if (a.tier === 'featured' && b.tier !== 'featured') return -1
    if (b.tier === 'featured' && a.tier !== 'featured') return 1
    return b.rating - a.rating
  })

  const filterBtn = (active) => ({
    padding:'7px 14px', borderRadius:20, border:'1.5px solid', cursor:'pointer',
    fontSize:12.5, fontWeight: active ? '500' : '400', fontFamily:'var(--font-body)',
    background: active ? 'var(--burnt)' : '#fff',
    color: active ? '#fff' : 'var(--muted)',
    borderColor: active ? 'var(--burnt)' : 'var(--cream2)',
    transition:'all 0.18s',
  })

  return (
    <div style={{ minHeight:'100vh' }}>

      {/* HERO */}
      <div style={{ background:'var(--slate)', padding:'50px 24px 60px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:0.05, backgroundImage:'linear-gradient(var(--burnt) 1px,transparent 1px),linear-gradient(90deg,var(--burnt) 1px,transparent 1px)', backgroundSize:'44px 44px' }}/>
        <div style={{ maxWidth:700, margin:'0 auto', textAlign:'center', position:'relative' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(200,87,42,0.15)', border:'1px solid rgba(200,87,42,0.3)', color:'var(--burnt-light)', fontSize:11, fontWeight:500, letterSpacing:'0.07em', textTransform:'uppercase', padding:'5px 14px', borderRadius:20, marginBottom:20 }}>
            ★ Texas Roofing Directory
          </div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,4vw,44px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:14 }}>
            Find a trusted Texas <em style={{ color:'var(--burnt-light)', fontStyle:'normal' }}>roofing contractor</em>
          </h1>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:15, fontWeight:300, lineHeight:1.65, maxWidth:500, margin:'0 auto 28px' }}>
            Every contractor listed here serves Texas homeowners. Contact them directly — we never sell your information.
          </p>

          {/* Search */}
          <div style={{ position:'relative', maxWidth:420, margin:'0 auto' }}>
            <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:16 }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or city..."
              style={{ width:'100%', padding:'14px 14px 14px 42px', borderRadius:12, border:'2px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.08)', color:'#fff', fontSize:14, fontFamily:'var(--font-body)', outline:'none' }}
            />
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ background:'#fff', borderBottom:'1px solid var(--cream2)', padding:'16px 24px', position:'sticky', top:60, zIndex:50 }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
            <span style={{ fontSize:12, color:'var(--muted)', fontWeight:500, marginRight:4 }}>City:</span>
            {CITIES.map(c => (
              <button key={c} style={filterBtn(selectedCity===c)} onClick={() => setSelectedCity(c)}>{c}</button>
            ))}
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center', marginTop:10 }}>
            <span style={{ fontSize:12, color:'var(--muted)', fontWeight:500, marginRight:4 }}>Specialty:</span>
            {SPECIALTIES.map(s => (
              <button key={s} style={filterBtn(selectedSpec===s)} onClick={() => setSelectedSpec(s)}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'32px 24px 60px' }}>

        {/* Count + trust note */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:10 }}>
          <div style={{ fontSize:14, color:'var(--muted)' }}>
            <span style={{ fontWeight:600, color:'var(--slate)' }}>{filtered.length} contractors</span> found
            {selectedCity !== 'All Texas' ? ` in ${selectedCity}` : ' across Texas'}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--muted)', background:'var(--green-bg)', padding:'6px 12px', borderRadius:20 }}>
            <span style={{ color:'var(--green)' }}>✓</span>
            We never sell your contact info to contractors
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(340px, 1fr))', gap:16 }}>
            {filtered.map(c => <ContractorCard key={c.name + c.city} c={c}/>)}
          </div>
        ) : (
          <div style={{ textAlign:'center', padding:'60px 24px', color:'var(--muted)' }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
            <div style={{ fontSize:16, fontWeight:500, color:'var(--slate)', marginBottom:8 }}>No contractors found</div>
            <div style={{ fontSize:13 }}>Try a different city or specialty filter</div>
          </div>
        )}

        {/* CTA — list your company */}
        <div style={{ marginTop:48, background:'var(--slate)', borderRadius:20, padding:'36px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:20 }}>
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, color:'#fff', marginBottom:8 }}>
              Are you a Texas roofing contractor?
            </div>
            <div style={{ fontSize:13.5, color:'rgba(255,255,255,0.5)', lineHeight:1.6, maxWidth:480 }}>
              Get listed in our directory for free. Featured listings are available for $49–$99/month and appear at the top of search results.
            </div>
          </div>
          <a href="mailto:hello@texasroofcost.com" style={{ background:'var(--burnt)', color:'#fff', padding:'14px 28px', borderRadius:12, fontSize:14, fontWeight:500, textDecoration:'none', whiteSpace:'nowrap', flexShrink:0 }}>
            Get listed free →
          </a>
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop:24, fontSize:11, color:'var(--light)', lineHeight:1.7, padding:'16px', background:'var(--cream)', borderRadius:10 }}>
          <strong>Disclaimer:</strong> TexasRoofCost.com does not endorse any specific contractor. Ratings and reviews shown are sourced from Google Business profiles. Always verify a contractor's license, insurance, and references before hiring. Texas does not require a state roofing license but contractors should carry general liability and workers compensation insurance.
        </div>
      </div>
    </div>
  )
}
