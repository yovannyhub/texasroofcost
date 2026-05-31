import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background:'var(--slate)', color:'rgba(255,255,255,0.4)', padding:'40px 24px' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:24 }}>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, color:'#fff', marginBottom:8 }}>
            <span style={{ color:'var(--burnt-light)' }}>★</span> TexasRoofCost.com
          </div>
          <p style={{ fontSize:12, lineHeight:1.7, maxWidth:280 }}>
            Free roofing cost estimates for Texas homeowners. No personal info required. Ever.
          </p>
        </div>
        <div style={{ display:'flex', gap:40, flexWrap:'wrap' }}>
          <div>
            <div style={{ color:'#fff', fontSize:12, fontWeight:500, marginBottom:10 }}>Tools</div>
            <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:12 }}>
              <Link to="/"            style={{ color:'rgba(255,255,255,0.4)' }}>Roof Cost Estimator</Link>
              <Link to="/contractors" style={{ color:'rgba(255,255,255,0.4)' }}>Find Contractors</Link>
            </div>
          </div>
          <div>
            <div style={{ color:'#fff', fontSize:12, fontWeight:500, marginBottom:10 }}>Cities</div>
            <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:12 }}>
              {['Houston','Dallas','San Antonio','Austin'].map(c => (
                <Link key={c} to="/" style={{ color:'rgba(255,255,255,0.4)' }}>{c}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth:1100, margin:'28px auto 0', paddingTop:20, borderTop:'1px solid rgba(255,255,255,0.08)', fontSize:11, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:8 }}>
        <span>© {new Date().getFullYear()} TexasRoofCost.com — All estimates are approximate.</span>
        <span>No personal information is collected or stored.</span>
      </div>
    </footer>
  )
}
