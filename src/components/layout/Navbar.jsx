import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()
  const lnk = (path) => ({
    color: pathname === path || (path !== '/' && pathname.startsWith(path)) ? '#fff' : 'rgba(255,255,255,0.5)',
    fontWeight: pathname === path ? '500' : '400',
    fontSize: 14, textDecoration: 'none', transition: 'color 0.18s',
  })
  return (
    <nav style={{ background:'var(--slate)', position:'sticky', top:0, zIndex:100, borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <Link to="/" style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:700, color:'#fff', textDecoration:'none', display:'flex', alignItems:'center', gap:7 }}>
          <span style={{ color:'var(--burnt-light)', fontSize:14 }}>★</span> TexasRoofCost
        </Link>
        <div style={{ display:'flex', gap:28 }}>
          <Link to="/"            style={lnk('/')}>Estimator</Link>
          <Link to="/contractors" style={lnk('/contractors')}>Contractors</Link>
          <Link to="/blog"        style={lnk('/blog')}>Guides</Link>
        </div>
      </div>
    </nav>
  )
}
