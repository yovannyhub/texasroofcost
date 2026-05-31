import { Link } from 'react-router-dom'
export default function NotFoundPage() {
  return <div style={{ maxWidth:500, margin:'80px auto', padding:'0 24px', textAlign:'center' }}><h1 style={{ fontFamily:'var(--font-display)', fontSize:56, color:'var(--burnt)' }}>404</h1><p style={{ color:'var(--muted)', margin:'16px 0 28px' }}>Page not found.</p><Link to="/" style={{ background:'var(--burnt)', color:'#fff', padding:'13px 28px', borderRadius:10, fontSize:14, fontWeight:500 }}>Back to estimator</Link></div>
}
