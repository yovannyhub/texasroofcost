import { useEffect, useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { fmt } from '@/lib/texasData'
import styles from './ResultsPanel.module.css'

const CONTRACTOR_FALLBACK = {
  'Houston': [
    { name:'Longhorn Roofing', metro:'Houston & surrounding areas', badge:'Top rated', tags:['Residential','Storm damage'], stars:'★★★★★', reviews:'142 reviews', phone:'(713) 555-0142', color:'#C8572A' },
    { name:'Christian Brothers Roofing', metro:'Greater Houston area', badge:'Licensed & insured', tags:['Insurance claims'], stars:'★★★★★', reviews:'98 reviews', phone:'(713) 555-0198', color:'#3D4A5C' },
    { name:'Amstill Roofing', metro:'Houston metro', badge:'25+ years', tags:['Asphalt','Metal','Tile'], stars:'★★★★☆', reviews:'201 reviews', phone:'(713) 555-0201', color:'#2D7A4F' },
  ],
  'Dallas': [
    { name:'Hedrick Construction', metro:'DFW Metroplex', badge:'Top rated', tags:['Residential','Hail repair'], stars:'★★★★★', reviews:'187 reviews', phone:'(214) 555-0187', color:'#C8572A' },
    { name:'ProCraft Roofing', metro:'DFW & North Texas', badge:'Licensed & insured', tags:['Asphalt','Metal'], stars:'★★★★★', reviews:'113 reviews', phone:'(972) 555-0113', color:'#3D4A5C' },
    { name:'Falcon Roofing', metro:'Dallas metro', badge:'Family owned', tags:['Residential'], stars:'★★★★☆', reviews:'76 reviews', phone:'(214) 555-0076', color:'#854F0B' },
  ],
  'San Antonio': [
    { name:'Remedy Roofing', metro:'San Antonio & Bexar County', badge:'Top rated', tags:['Residential','Tile'], stars:'★★★★★', reviews:'164 reviews', phone:'(210) 555-0164', color:'#C8572A' },
    { name:'Rhino Roofing', metro:'San Antonio metro', badge:'Licensed & insured', tags:['Storm damage'], stars:'★★★★★', reviews:'209 reviews', phone:'(210) 555-0209', color:'#3D4A5C' },
  ],
  'Austin': [
    { name:'Centex Roofing', metro:'Austin & Central Texas', badge:'Top rated', tags:['Residential','Storm'], stars:'★★★★★', reviews:'143 reviews', phone:'(512) 555-0143', color:'#C8572A' },
    { name:'Dreamstyle Roofing', metro:'Austin metro', badge:'Licensed & insured', tags:['Premium','Metal'], stars:'★★★★★', reviews:'97 reviews', phone:'(512) 555-0097', color:'#3D4A5C' },
  ],
}

function getContractors(cityName) {
  return CONTRACTOR_FALLBACK[cityName] || CONTRACTOR_FALLBACK['Dallas']
}

function AnimatedBar({ pct, color, delay = 0 }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 300 + delay)
    return () => clearTimeout(t)
  }, [pct, delay])
  return (
    <div className={styles.barTrack}>
      <div className={styles.barFill} style={{ width: `${width}%`, background: color, transition: `width 1s cubic-bezier(0.4,0,0.2,1) ${delay}ms` }} />
    </div>
  )
}

export default function ResultsPanel({ estimate, city, onRestart }) {
  const { totalLow, totalMid, totalHigh, matMid, labMid, disposal, permit } = estimate
  const cityName = city?.city || 'Dallas'

  const tot = matMid + labMid + disposal + permit
  const pcts = [
    Math.round(matMid  / tot * 100),
    Math.round(labMid  / tot * 100),
    Math.round(disposal / tot * 100),
    Math.round(permit   / tot * 100),
  ]

  const contractors = getContractors(cityName)
  const matName = estimate.material?.name || 'Asphalt shingles'
  const shapeName = estimate.shape?.shape || 'Gable'
  const sizeName = estimate.homeSize?.label || 'Medium'

  return (
    <div className={styles.wrap}>
      <button className={styles.recalc} onClick={onRestart}>← Start over</button>

      {/* Hero estimate */}
      <div className={styles.resHero}>
        <div className={styles.eyebrow}>Your estimated replacement cost</div>
        <div className={styles.range}>
          {fmt(totalLow)} – <span>{fmt(totalHigh)}</span>
        </div>
        <div className={styles.meta}>
          {sizeName} home · {shapeName} roof · {matName} · {cityName}, TX
        </div>
        <div className={styles.noBadge}>✓ No personal information was collected</div>
      </div>

      {/* Breakdown */}
      <div className={styles.section}>
        <div className={styles.secLabel}>Where your money goes</div>
        {[
          { dot:'#C8572A', name:'Materials', sub:'Shingles, underlayment, flashing, ridge cap', amt:fmt(matMid) },
          { dot:'#3D4A5C', name:'Labor',     sub:'Tear-off, installation, cleanup',             amt:fmt(labMid) },
          { dot:'#D4A853', name:'Disposal',  sub:'Dumpster rental, haul-away',                  amt:fmt(disposal) },
          { dot:'#9CA3AF', name:'Permit',    sub:'City / county building permit',                amt:fmt(permit) },
        ].map(item => (
          <div key={item.name} className={styles.bdItem}>
            <div className={styles.bdLeft}>
              <div className={styles.bdDot} style={{ background: item.dot }} />
              <div>
                <div className={styles.bdName}>{item.name}</div>
                <div className={styles.bdSub}>{item.sub}</div>
              </div>
            </div>
            <div className={styles.bdAmt}>{item.amt}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className={styles.section} style={{ paddingTop: 0 }}>
        <div className={styles.secLabel}>Cost distribution</div>
        {[
          { label:'Materials', pct:pcts[0], color:'#C8572A' },
          { label:'Labor',     pct:pcts[1], color:'#3D4A5C' },
          { label:'Disposal',  pct:pcts[2], color:'#D4A853' },
          { label:'Permit',    pct:pcts[3], color:'#9CA3AF' },
        ].map((b, i) => (
          <div key={b.label} className={styles.barRow}>
            <div className={styles.barLabel}>{b.label}</div>
            <AnimatedBar pct={b.pct} color={b.color} delay={i * 80} />
            <div className={styles.barPct}>{b.pct}%</div>
          </div>
        ))}
      </div>

      {/* Tiers */}
      <div className={styles.tierRow}>
        <div className={styles.tierCard}>
          <div className={styles.tierLabel}>Budget</div>
          <div className={styles.tierPrice}>{fmt(totalLow)}</div>
          <div className={styles.tierSub}>Entry-grade materials</div>
        </div>
        <div className={`${styles.tierCard} ${styles.tierMid}`}>
          <div className={styles.tierBest}>Most common</div>
          <div className={styles.tierLabel}>Standard</div>
          <div className={styles.tierPrice}>{fmt(totalMid)}</div>
          <div className={styles.tierSub}>Mid-grade quality</div>
        </div>
        <div className={styles.tierCard}>
          <div className={styles.tierLabel}>Premium</div>
          <div className={styles.tierPrice}>{fmt(totalHigh)}</div>
          <div className={styles.tierSub}>Top-grade materials</div>
        </div>
      </div>

      {/* Contractors */}
      <div className={styles.coSection}>
        <div className={styles.secLabel}>Texas roofing companies near you</div>
        <div className={styles.coIntro}>
          Contact these contractors directly — we never share your information with anyone.
        </div>
        {contractors.map(c => (
          <div key={c.name} className={styles.coCard}>
            <div className={styles.coAvatar} style={{ background: c.color }}>
              {c.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
            </div>
            <div className={styles.coBody}>
              <div className={styles.coName}>{c.name}</div>
              <div className={styles.coMetro}>{c.metro}</div>
              <div className={styles.coTags}>
                <span className={`${styles.coTag} ${styles.coTagGreen}`}>{c.badge}</span>
                {c.tags.map(t => <span key={t} className={styles.coTag}>{t}</span>)}
              </div>
              <div className={styles.coPhone}>{c.phone}</div>
            </div>
            <div className={styles.coRating}>
              <div className={styles.coStars}>{c.stars}</div>
              <div className={styles.coReviews}>{c.reviews}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <div className={styles.secLabel}>What would you like to do next?</div>
        {[
          { icon:'📄', title:'Save estimate as PDF', desc:'Free download — no email required' },
          { icon:'🏠', title:'Best roofing materials for Texas', desc:'Heat, hail & humidity resistant options' },
          { icon:'❓', title:'Questions to ask your contractor', desc:"Don't get ripped off — know what to ask" },
        ].map(a => (
          <div key={a.title} className={styles.actCard}>
            <div className={styles.actIcon}>{a.icon}</div>
            <div className={styles.actBody}>
              <div className={styles.actTitle}>{a.title}</div>
              <div className={styles.actDesc}>{a.desc}</div>
            </div>
            <div className={styles.actArr}>›</div>
          </div>
        ))}
      </div>

      <div className={styles.footNote}>
        Estimates based on 2025 Texas labor and material costs. Actual quotes may vary 15–25% depending on roof complexity, contractor availability, and material prices. This tool does not collect, store, or share any personal information.
      </div>
    </div>
  )
}
