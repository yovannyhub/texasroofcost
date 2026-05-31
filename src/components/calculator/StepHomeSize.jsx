import { HOME_SIZES } from '@/lib/texasData'
import styles from './Steps.module.css'

export default function StepHomeSize({ value, onChange }) {
  return (
    <div>
      <h2 className={styles.stepTitle}>How big is your home?</h2>
      <p className={styles.stepDesc}>No tape measure needed — just a rough idea. We'll calculate your roof size from this.</p>
      <div className={styles.sizeGrid}>
        {HOME_SIZES.map(s => (
          <button
            key={s.label}
            className={`${styles.sizeBtn} ${value?.label === s.label ? styles.selected : ''} ${s.label === 'Not sure' ? styles.fullWidth : ''}`}
            onClick={() => onChange(s)}
          >
            <div className={styles.sizeIcon}>{s.icon}</div>
            <div className={styles.sizeLabel}>{s.label}</div>
            <div className={styles.sizeSqft}>{s.desc}</div>
            <div className={styles.sizeSqft}>{s.sub}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
