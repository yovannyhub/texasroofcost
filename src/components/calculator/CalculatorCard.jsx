import { useState, useEffect } from 'react'
import { TEXAS_CITIES, HOME_SIZES, ROOF_SHAPES, AGE_BRACKETS, MATERIALS, calculateEstimate, getContractors, fmt } from '@/lib/texasData'

const STEPS = ['Location', 'Your home', 'Roof shape', 'Material']
const PROGRESS = ['20%', '42%', '65%', '85%', '100%']

// ── SHAPE SVGS ──
function ShapeSVG({ shape }) {
  if (shape === 'Gable') return (
    <svg width="88" height="48" viewBox="0 0 88 48" style={{ display:'block', margin:'0 auto 8px' }}>
      <rect x="4" y="26" width="80" height="18" rx="2" fill="#EDE8E0" stroke="#C8572A" strokeWidth="1.5"/>
      <polygon points="4,26 44,5 84,26" fill="#F0E6D3" stroke="#C8572A" strokeWidth="1.5"/>
    </svg>
  )
  if (shape === 'Hip') return (
    <svg width="88" height="48" viewBox="0 0 88 48" style={{ display:'block', margin:'0 auto 8px' }}>
      <rect x="4" y="26" width="80" height="18" rx="2" fill="#EDE8E0" stroke="#3D4A5C" strokeWidth="1.5"/>
      <polygon points="4,26 18,10 70,10 84,26" fill="#F0E6D3" stroke="#3D4A5C" strokeWidth="1.5"/>
      <line x1="18" y1="10" x2="44" y2="4" stroke="#3D4A5C" strokeWidth="1.5"/>
      <line x1="70" y1="10" x2="44" y2="4" stroke="#3D4A5C" strokeWidth="1.5"/>
    </svg>
  )
  if (shape === 'Flat') return (
    <svg width="88" height="48" viewBox="0 0 88 48" style={{ display:'block', margin:'0 auto 8px' }}>
      <rect x="4" y="26" width="80" height="18" rx="2" fill="#EDE8E0" stroke="#888780" strokeWidth="1.5"/>
      <rect x="4" y="14" width="80" height="12" rx="2" fill="#F0E6D3" stroke="#888780" strokeWidth="1.5"/>
    </svg>
  )
  return (
    <svg width="88" height="48" viewBox="0 0 88 48" style={{ display:'block', margin:'0 auto 8px' }}>
      <rect x="18" y="26" width="52" height="18" rx="2" fill="#EDE8E0" stroke="#D4A853" strokeWidth="1.5"/>
      <polygon points="18,26 44,2 70,26" fill="#F0E6D3" stroke="#D4A853" strokeWidth="1.5"/>
    </svg>
  )
}

// ── ANIMATED BAR — fixed: useEffect not useState ──
function Bar({ pct, color }) {
  const [w, setW] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setW(pct), 400)
    return () => clearTimeout(t)
  }, [pct])
  return (
    <div style={{ flex:1, height:18, background:'var(--cream2)', borderRadius:4, overflow:'hidden' }}>
      <div style={{ height:'100%', width:`${w}%`, background:color, borderRadius:4, transition:'width 1.1s cubic-bezier(0.4,0,0.2,1)' }}/>
    </div>
  )
}

// ── RESULTS PANEL — extracted as a proper component ──
function ResultsPanel({ estimate, onRestart }) {
  const { totalLow, totalMid, totalHigh, matMid, labMid, disposal, permit } = estimate
  const cityName   = estimate.city?.city     || 'Dallas'
  const sizeName   = estimate.homeSize?.label || 'Medium'
  const shapeName  = estimate.shape?.shape   || 'Gable'
  const matName    = estimate.material?.name || 'Asphalt shingles'

  const tot  = matMid + labMid + disposal + permit
  const pcts = [
    Math.round(matMid   / tot * 100),
    Math.round(labMid   / tot * 100),
    Math.round(disposal / tot * 100),
    Math.round(permit   / tot * 100),
  ]

  const breakdown = [
    { dot:'#C8572A', name:'Materials', sub:'Shingles, underlayment, flashing, ridge cap', amt: fmt(matMid)   },
    { dot:'#3D4A5C', name:'Labor',     sub:'Tear-off, installation, cleanup',             amt: fmt(labMid)   },
    { dot:'#D4A853', name:'Disposal',  sub:'Dumpster rental, haul-away',                  amt: fmt(disposal) },
    { dot:'#9CA3AF', name:'Permit',    sub:'City / county building permit',                amt: fmt(permit)   },
  ]

  const bars = [
    { label:'Materials', pct:pcts[0], color:'#C8572A' },
    { label:'Labor',     pct:pcts[1], color:'#3D4A5C' },
    { label:'Disposal',  pct:pcts[2], color:'#D4A853' },
    { label:'Permit',    pct:pcts[3], color:'#9CA3AF' },
  ]

  const tiers = [
    { lbl:'Budget',   price:fmt(totalLow),  sub:'Entry-grade materials', mid:false },
    { lbl:'Standard', price:fmt(totalMid),  sub:'Mid-grade quality',     mid:true  },
    { lbl:'Premium',  price:fmt(totalHigh), sub:'Top-grade materials',   mid:false },
  ]

  const contractors = getContractors(cityName)

  const actions = [
    { icon:'📄', title:'Save estimate as PDF',            desc:'Free download — no email required'       },
    { icon:'🏠', title:'Best roofing materials for Texas', desc:'Heat, hail & humidity resistant options' },
    { icon:'❓', title:'Questions to ask your contractor', desc:"Don't get ripped off — know what to ask" },
  ]

  return (
    <div>
      {/* Restart */}
      <button onClick={onRestart} style={{ display:'flex', alignItems:'center', gap:6, color:'var(--burnt)', fontSize:12, fontWeight:500, padding:'14px 26px 0', background:'none', border:'none', cursor:'pointer' }}>
        ← Start over
      </button>

      {/* Hero range */}
      <div style={{ background:'var(--slate)', padding:'22px 26px 20px' }}>
        <div style={{ fontSize:10.5, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(255,255,255,0.4)', marginBottom:5 }}>
          Your estimated replacement cost
        </div>
        <div style={{ fontFamily:'var(--font-display)', fontSize:38, fontWeight:900, color:'#fff', lineHeight:1 }}>
          {fmt(totalLow)} – <span style={{ color:'var(--burnt-light)' }}>{fmt(totalHigh)}</span>
        </div>
        <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.38)', marginTop:7, lineHeight:1.6 }}>
          {sizeName} home · {shapeName} roof · {matName} · {cityName}, TX
        </div>
        <div style={{ display:'inline-flex', alignItems:'center', gap:5, background:'rgba(45,122,79,0.2)', borderRadius:20, padding:'4px 10px', fontSize:10.5, color:'#6FCF97', marginTop:10 }}>
          ✓ No personal information was collected
        </div>
      </div>

      {/* Breakdown */}
      <div style={{ padding:'20px 26px' }}>
        <div style={{ fontSize:10.5, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--muted)', fontWeight:500, marginBottom:14 }}>
          Where your money goes
        </div>
        {breakdown.map(item => (
          <div key={item.name} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'11px 0', borderBottom:'1px solid var(--cream2)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:9, height:9, borderRadius:'50%', background:item.dot, flexShrink:0 }}/>
              <div>
                <div style={{ fontSize:13.5, color:'var(--slate)' }}>{item.name}</div>
                <div style={{ fontSize:10.5, color:'var(--light)', marginTop:1 }}>{item.sub}</div>
              </div>
            </div>
            <div style={{ fontSize:14.5, fontWeight:500, color:'var(--slate)' }}>{item.amt}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ padding:'0 26px 20px' }}>
        <div style={{ fontSize:10.5, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--muted)', fontWeight:500, marginBottom:14 }}>
          Cost distribution
        </div>
        {bars.map(b => (
          <div key={b.label} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:9 }}>
            <div style={{ fontSize:11, color:'var(--muted)', width:66, textAlign:'right', flexShrink:0 }}>{b.label}</div>
            <Bar pct={b.pct} color={b.color}/>
            <div style={{ fontSize:11, fontWeight:500, color:'var(--slate)', minWidth:30 }}>{b.pct}%</div>
          </div>
        ))}
      </div>

      {/* Tiers */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, padding:'0 26px 18px' }}>
        {tiers.map(t => (
          <div key={t.lbl} style={{ borderRadius:12, padding:'13px 10px', textAlign:'center', border:`1.5px solid ${t.mid ? 'var(--burnt)' : 'var(--cream2)'}`, position:'relative' }}>
            {t.mid && (
              <div style={{ position:'absolute', top:-8, left:'50%', transform:'translateX(-50%)', background:'var(--burnt)', color:'#fff', fontSize:9, letterSpacing:'0.05em', padding:'2px 8px', borderRadius:10, whiteSpace:'nowrap' }}>
                Most common
              </div>
            )}
            <div style={{ fontSize:9.5, textTransform:'uppercase', letterSpacing:'0.07em', color:'var(--muted)', marginBottom:5 }}>{t.lbl}</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:19, fontWeight:700, color:'var(--slate)' }}>{t.price}</div>
            <div style={{ fontSize:9.5, color:'var(--light)', marginTop:3 }}>{t.sub}</div>
          </div>
        ))}
      </div>

      {/* Contractors */}
      <div style={{ padding:'0 26px 18px' }}>
        <div style={{ fontSize:10.5, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--muted)', fontWeight:500, marginBottom:10 }}>
          Texas roofing companies near you
        </div>
        <div style={{ fontSize:12, color:'var(--muted)', marginBottom:14, lineHeight:1.55, padding:'10px 12px', background:'var(--cream)', borderRadius:8, borderLeft:'3px solid var(--burnt)' }}>
          Contact these contractors directly — we never share your information with anyone.
        </div>
        {contractors.map(c => (
          <div key={c.name} style={{ border:'1.5px solid var(--cream2)', borderRadius:12, padding:14, marginBottom:9, display:'flex', alignItems:'center', gap:13, background:'#fff' }}>
            <div style={{ width:42, height:42, borderRadius:10, background:c.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:'#fff', flexShrink:0 }}>
              {c.name.split(' ').map(w => w[0]).slice(0,2).join('')}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:14, fontWeight:500, color:'var(--slate)' }}>{c.name}</div>
              <div style={{ fontSize:11, color:'var(--muted)', marginTop:2 }}>{c.metro}</div>
              <div style={{ display:'flex', gap:5, marginTop:6, flexWrap:'wrap' }}>
                <span style={{ fontSize:9.5, padding:'2px 7px', borderRadius:6, background:'var(--green-bg)', color:'var(--green)' }}>{c.badge}</span>
                {c.tags.map(t => (
                  <span key={t} style={{ fontSize:9.5, padding:'2px 7px', borderRadius:6, background:'var(--cream2)', color:'var(--muted)' }}>{t}</span>
                ))}
              </div>
              <div style={{ fontSize:11, color:'var(--burnt)', marginTop:5, fontWeight:500 }}>{c.phone}</div>
            </div>
            <div style={{ textAlign:'right', flexShrink:0 }}>
              <div style={{ fontSize:11, color:'var(--gold)' }}>{c.stars}</div>
              <div style={{ fontSize:10, color:'var(--light)', marginTop:2 }}>{c.reviews}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ padding:'0 26px 22px', display:'flex', flexDirection:'column', gap:9 }}>
        <div style={{ fontSize:10.5, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--muted)', fontWeight:500 }}>
          What would you like to do next?
        </div>
        {actions.map(a => (
          <div key={a.title} style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 14px', borderRadius:12, border:'1.5px solid var(--cream2)', cursor:'pointer', background:'#fff' }}>
            <div style={{ width:36, height:36, borderRadius:9, background:'var(--cream)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>{a.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13.5, fontWeight:500, color:'var(--slate)' }}>{a.title}</div>
              <div style={{ fontSize:10.5, color:'var(--muted)', marginTop:1 }}>{a.desc}</div>
            </div>
            <div style={{ color:'var(--light)', fontSize:16 }}>›</div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{ padding:'14px 26px 22px', fontSize:10.5, color:'var(--light)', lineHeight:1.65, borderTop:'1px solid var(--cream2)' }}>
        Estimates based on 2025 Texas labor and material costs. Actual quotes may vary 15–25% depending on roof complexity, contractor availability, and material prices. This tool does not collect, store, or share any personal information.
      </div>
    </div>
  )
}

// ── MAIN CALCULATOR ──
export default function CalculatorCard() {
  const [step,     setStep]     = useState(1)
  const [city,     setCity]     = useState(null)
  const [homeSize, setHomeSize] = useState(null)
  const [shape,    setShape]    = useState(null)
  const [age,      setAge]      = useState(null)
  const [material, setMaterial] = useState(null)
  const [estimate, setEstimate] = useState(null)

  const pickCity     = (c) => { setCity(c);     setTimeout(() => setStep(2), 200) }
  const pickHomeSize = (h) => { setHomeSize(h); setTimeout(() => setStep(3), 200) }

  const canNext = () => {
    if (step === 3) return !!(shape && age)
    if (step === 4) return !!material
    return true
  }

  const calculate = () => {
    const c = city     || TEXAS_CITIES[0]
    const h = homeSize || HOME_SIZES[1]
    const s = shape    || ROOF_SHAPES[0]
    const a = age      || AGE_BRACKETS[4]
    const m = material || MATERIALS[0]
    const result = calculateEstimate({
      sqft:       h.sqft,
      pitch:      s.pitch,
      ageFactor:  a.adj,
      costLow:    m.costLow,
      costHigh:   m.costHigh,
      laborMult:  c.mult,
      permitCost: c.permit,
    })
    setEstimate({ ...result, city:c, homeSize:h, shape:s, age:a, material:m })
    setStep(5)
  }

  const restart = () => {
    setStep(1); setCity(null); setHomeSize(null)
    setShape(null); setAge(null); setMaterial(null); setEstimate(null)
  }

  const sel = (active) => ({
    border: `2px solid ${active ? 'var(--burnt)' : 'var(--cream2)'}`,
    background: active ? 'rgba(200,87,42,0.04)' : '#fff',
    borderRadius: 12, cursor:'pointer', fontFamily:'var(--font-body)', transition:'all 0.18s',
  })

  return (
    <>
    {/* ── HERO ── */}
    <div style={{ position:'relative', background:'var(--slate)', padding:'50px 24px 80px', display:'flex', flexDirection:'column', alignItems:'center', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, opacity:0.05, backgroundImage:'linear-gradient(var(--burnt) 1px,transparent 1px),linear-gradient(90deg,var(--burnt) 1px,transparent 1px)', backgroundSize:'44px 44px' }}/>
      <div style={{ position:'absolute', top:-60, left:'50%', transform:'translateX(-50%)', width:500, height:360, background:'radial-gradient(ellipse,rgba(200,87,42,0.22) 0%,transparent 70%)', pointerEvents:'none' }}/>
      <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(200,87,42,0.15)', border:'1px solid rgba(200,87,42,0.3)', color:'var(--burnt-light)', fontSize:11, fontWeight:500, letterSpacing:'0.07em', textTransform:'uppercase', padding:'5px 14px', borderRadius:20, marginBottom:20 }}>
        <span style={{ width:6, height:6, background:'var(--burnt-light)', borderRadius:'50%', display:'inline-block' }}/>
        ★ Texas Roofing Cost Estimator
      </div>
      <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(30px,5vw,50px)', fontWeight:900, color:'#fff', textAlign:'center', lineHeight:1.1, maxWidth:580 }}>
        What will your <em style={{ color:'var(--burnt-light)', fontStyle:'normal' }}>roof replacement</em> cost?
      </h1>
      <p style={{ color:'rgba(255,255,255,0.5)', fontSize:15, fontWeight:300, textAlign:'center', marginTop:12, maxWidth:420, lineHeight:1.65 }}>
        Answer 4 simple questions. Get a real estimate in 60 seconds. No personal info. No spam. No pressure.
      </p>
      <div style={{ display:'flex', gap:18, marginTop:24, flexWrap:'wrap', justifyContent:'center' }}>
        {[['🔒','Zero data collected'],['⏱️','60-second estimate'],['📍','Texas pricing data']].map(([ic,lb]) => (
          <div key={lb} style={{ display:'flex', alignItems:'center', gap:6, color:'rgba(255,255,255,0.4)', fontSize:11.5 }}>
            <span>{ic}</span>{lb}
          </div>
        ))}
      </div>
    </div>

    {/* ── CARD ── */}
    <div style={{ maxWidth:660, margin:'-58px auto 0', padding:'0 18px 60px', position:'relative', zIndex:10 }}>
    <div style={{ background:'#fff', borderRadius:22, boxShadow:'var(--shadow-card)', overflow:'hidden' }}>

      {/* Progress bar */}
      <div style={{ height:3, background:'var(--cream2)' }}>
        <div style={{ height:'100%', background:'linear-gradient(90deg,var(--burnt),var(--burnt-light))', width: PROGRESS[step-1] || '100%', transition:'width 0.55s cubic-bezier(0.4,0,0.2,1)' }}/>
      </div>

      {/* Step dots */}
      {step < 5 && (
        <div style={{ display:'flex', alignItems:'center', padding:'18px 26px 0' }}>
          {STEPS.map((label, i) => (
            <div key={label} style={{ display:'flex', alignItems:'center', flex: i < STEPS.length-1 ? 1 : 'none' }}>
              <div style={{ display:'flex', alignItems:'center', gap:7, fontSize:11.5, fontWeight:500, color: i+1===step ? 'var(--burnt)' : i+1<step ? 'var(--slate3)' : 'var(--light)', whiteSpace:'nowrap' }}>
                <div style={{ width:22, height:22, borderRadius:'50%', border:'1.5px solid currentColor', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:600, background: i+1<step ? 'var(--slate)' : i+1===step ? 'var(--burnt)' : 'transparent', borderColor: i+1<=step ? (i+1<step ? 'var(--slate)' : 'var(--burnt)') : undefined, color: i+1<=step ? '#fff' : 'currentColor' }}>
                  {i+1 < step ? '✓' : i+1}
                </div>
                <span style={{ fontSize:11 }}>{label}</span>
              </div>
              {i < STEPS.length-1 && <div style={{ flex:1, height:1, background:'var(--cream2)', margin:'0 6px' }}/>}
            </div>
          ))}
        </div>
      )}

      {/* ── STEP 1: CITY ── */}
      {step === 1 && (
        <div style={{ padding:'26px 26px 6px' }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:21, fontWeight:700, color:'var(--slate)', marginBottom:4 }}>Where are you located?</h2>
          <p style={{ fontSize:12.5, color:'var(--muted)', marginBottom:20, fontWeight:300, lineHeight:1.55 }}>We use your city to pull local labor rates for an accurate estimate.</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9 }}>
            {TEXAS_CITIES.map(c => (
              <button key={c.city} onClick={() => pickCity(c)} style={{ ...sel(city?.city===c.city), padding:'13px 14px', textAlign:'left', display:'flex', alignItems:'center', gap:10, gridColumn: c.city==='Other Texas' ? '1/-1' : undefined, justifyContent: c.city==='Other Texas' ? 'center' : undefined, borderStyle: c.city==='Other Texas' ? 'dashed' : 'solid' }}>
                <span style={{ fontSize:18 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize:13.5, fontWeight:500, color:'var(--slate)' }}>{c.city}</div>
                  <div style={{ fontSize:10.5, color:'var(--muted)', marginTop:1 }}>{c.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 2: HOME SIZE ── */}
      {step === 2 && (
        <div style={{ padding:'26px 26px 6px' }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:21, fontWeight:700, color:'var(--slate)', marginBottom:4 }}>How big is your home?</h2>
          <p style={{ fontSize:12.5, color:'var(--muted)', marginBottom:20, fontWeight:300, lineHeight:1.55 }}>No tape measure needed — just a rough idea. We'll calculate your roof size from this.</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9 }}>
            {HOME_SIZES.map(h => (
              <button key={h.label} onClick={() => pickHomeSize(h)} style={{ ...sel(homeSize?.label===h.label), padding:'14px 10px', textAlign:'center', gridColumn: h.label==='Not sure' ? '1/-1' : undefined }}>
                <div style={{ fontSize:20, marginBottom:5 }}>{h.icon}</div>
                <div style={{ fontSize:13, fontWeight:500, color:'var(--slate)' }}>{h.label}</div>
                <div style={{ fontSize:10.5, color:'var(--muted)', marginTop:2 }}>{h.desc}</div>
                <div style={{ fontSize:10.5, color:'var(--muted)', marginTop:1 }}>{h.sub}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 3: ROOF SHAPE + AGE ── */}
      {step === 3 && (
        <div style={{ padding:'26px 26px 6px' }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:21, fontWeight:700, color:'var(--slate)', marginBottom:4 }}>What does your roof look like?</h2>
          <p style={{ fontSize:12.5, color:'var(--muted)', marginBottom:20, fontWeight:300, lineHeight:1.55 }}>Look at your home from the street and pick the closest match.</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9 }}>
            {ROOF_SHAPES.map(s => (
              <button key={s.shape} onClick={() => setShape(s)} style={{ ...sel(shape?.shape===s.shape), padding:'14px 12px', textAlign:'center', position:'relative', overflow:'hidden' }}>
                {shape?.shape===s.shape && <span style={{ position:'absolute', top:6, right:8, fontSize:11, color:'var(--burnt)', fontWeight:600 }}>✓</span>}
                <ShapeSVG shape={s.shape}/>
                <div style={{ fontSize:13, fontWeight:500, color:'var(--slate)' }}>{s.label}</div>
                <div style={{ fontSize:10.5, color:'var(--muted)', marginTop:2 }}>{s.desc}</div>
              </button>
            ))}
          </div>
          <div style={{ marginTop:18 }}>
            <div style={{ fontSize:13, fontWeight:500, color:'var(--slate)', marginBottom:10 }}>When was your roof last replaced?</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9 }}>
              {AGE_BRACKETS.map(a => (
                <button key={a.label} onClick={() => setAge(a)} style={{ ...sel(age?.label===a.label), padding:'13px 12px', textAlign:'left', gridColumn: a.label==="I don't know" ? '1/-1' : undefined }}>
                  <div style={{ fontSize:13.5, fontWeight:500, color:'var(--slate)' }}>{a.label}</div>
                  <div style={{ fontSize:10.5, color:'var(--muted)', marginTop:2 }}>{a.hint}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 4: MATERIAL ── */}
      {step === 4 && (
        <div style={{ padding:'26px 26px 6px' }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:21, fontWeight:700, color:'var(--slate)', marginBottom:4 }}>What's on your roof now?</h2>
          <p style={{ fontSize:12.5, color:'var(--muted)', marginBottom:20, fontWeight:300, lineHeight:1.55 }}>Not sure? Pick "Not sure" — we'll use the most common Texas material.</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9 }}>
            {MATERIALS.map(m => (
              <button key={m.slug} onClick={() => setMaterial(m)} style={{ ...sel(material?.slug===m.slug), padding:'14px 12px', textAlign:'left', position:'relative', overflow:'hidden' }}>
                {material?.slug===m.slug && <span style={{ position:'absolute', top:6, right:8, fontSize:11, color:'var(--burnt)', fontWeight:600 }}>✓</span>}
                <div style={{ fontSize:20, marginBottom:6 }}>{m.icon}</div>
                <div style={{ fontSize:13, fontWeight:500, color:'var(--slate)' }}>{m.name}</div>
                <div style={{ fontSize:10.5, color:'var(--muted)', marginTop:2 }}>{m.texasNote}</div>
                <div style={{ fontSize:9.5, background:'var(--warm)', color:'var(--burnt-dark)', padding:'2px 7px', borderRadius:8, display:'inline-block', marginTop:5 }}>{m.pop}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 5: RESULTS ── */}
      {step === 5 && estimate && (
        <ResultsPanel estimate={estimate} onRestart={restart} />
      )}

      {/* ── NAVIGATION BUTTONS (steps 3 & 4 only) ── */}
      {(step === 3 || step === 4) && (
        <div style={{ padding:'18px 26px 26px' }}>
          <button
            onClick={step === 4 ? calculate : () => setStep(s => s + 1)}
            disabled={!canNext()}
            style={{ width:'100%', background: canNext() ? 'var(--burnt)' : 'var(--light)', color:'#fff', border:'none', borderRadius:12, padding:'17px 24px', fontSize:15.5, fontWeight:500, display:'flex', alignItems:'center', justifyContent:'center', gap:10, transition:'all 0.2s', cursor: canNext() ? 'pointer' : 'not-allowed' }}
          >
            {step === 4 ? 'Calculate my estimate →' : 'Continue →'}
          </button>
          <button onClick={() => setStep(s => s - 1)} style={{ width:'100%', background:'transparent', border:'1.5px solid var(--cream2)', color:'var(--slate)', borderRadius:12, padding:13, fontSize:14, marginTop:9, cursor:'pointer' }}>
            ← Go back
          </button>
        </div>
      )}

    </div>
    </div>
    </>
  )
}
