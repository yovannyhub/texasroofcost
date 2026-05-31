import { ROOF_SHAPES, AGE_BRACKETS } from '@/lib/texasData'
import styles from './Steps.module.css'

const ShapeSVG = ({ shape }) => {
  if (shape === 'Gable') return (
    <svg width="90" height="50" viewBox="0 0 90 50" className={styles.shapeSvg}>
      <rect x="5" y="26" width="80" height="20" rx="2" fill="#EDE8E0" stroke="#C8572A" strokeWidth="1.5"/>
      <polygon points="5,26 45,5 85,26" fill="#F0E6D3" stroke="#C8572A" strokeWidth="1.5"/>
    </svg>
  )
  if (shape === 'Hip') return (
    <svg width="90" height="50" viewBox="0 0 90 50" className={styles.shapeSvg}>
      <rect x="5" y="26" width="80" height="20" rx="2" fill="#EDE8E0" stroke="#3D4A5C" strokeWidth="1.5"/>
      <polygon points="5,26 18,10 72,10 85,26" fill="#F0E6D3" stroke="#3D4A5C" strokeWidth="1.5"/>
      <line x1="18" y1="10" x2="45" y2="4" stroke="#3D4A5C" strokeWidth="1.5"/>
      <line x1="72" y1="10" x2="45" y2="4" stroke="#3D4A5C" strokeWidth="1.5"/>
    </svg>
  )
  if (shape === 'Flat') return (
    <svg width="90" height="50" viewBox="0 0 90 50" className={styles.shapeSvg}>
      <rect x="5" y="26" width="80" height="20" rx="2" fill="#EDE8E0" stroke="#888780" strokeWidth="1.5"/>
      <rect x="5" y="14" width="80" height="12" rx="2" fill="#F0E6D3" stroke="#888780" strokeWidth="1.5"/>
    </svg>
  )
  return (
    <svg width="90" height="50" viewBox="0 0 90 50" className={styles.shapeSvg}>
      <rect x="18" y="26" width="54" height="20" rx="2" fill="#EDE8E0" stroke="#D4A853" strokeWidth="1.5"/>
      <polygon points="18,26 45,2 72,26" fill="#F0E6D3" stroke="#D4A853" strokeWidth="1.5"/>
    </svg>
  )
}

export default function StepRoofShape({ shapeValue, ageValue, onShapeChange, onAgeChange }) {
  return (
    <div>
      <h2 className={styles.stepTitle}>What does your roof look like?</h2>
      <p className={styles.stepDesc}>Look at your home from the street and pick the closest match. Not sure? Gable is the most common in Texas.</p>

      <div className={styles.shapeGrid}>
        {ROOF_SHAPES.map(s => (
          <button
            key={s.shape}
            className={`${styles.shapeBtn} ${shapeValue?.shape === s.shape ? styles.selected : ''}`}
            onClick={() => onShapeChange(s)}
          >
            <ShapeSVG shape={s.shape} />
            <div className={styles.shapeLabel}>{s.label}</div>
            <div className={styles.shapeDesc}>{s.desc}</div>
          </button>
        ))}
      </div>

      <div className={styles.ageSection}>
        <div className={styles.ageTitle}>When was your roof last replaced?</div>
        <div className={styles.ageGrid}>
          {AGE_BRACKETS.map(a => (
            <button
              key={a.label}
              className={`${styles.ageBtn} ${ageValue?.label === a.label ? styles.selected : ''} ${a.label === "I don't know" ? styles.fullWidth : ''}`}
              onClick={() => onAgeChange(a)}
            >
              <div className={styles.ageYear}>{a.label}</div>
              <div className={styles.ageHint}>{a.hint}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
