import { MATERIALS } from '@/lib/texasData'
import styles from './Steps.module.css'

export default function StepMaterial({ value, onChange }) {
  return (
    <div>
      <h2 className={styles.stepTitle}>What's on your roof now?</h2>
      <p className={styles.stepDesc}>Not sure? Pick "Not sure" — we'll use the most common Texas material.</p>
      <div className={styles.matGrid}>
        {MATERIALS.map(m => (
          <button
            key={m.slug}
            className={`${styles.matBtn} ${value?.slug === m.slug ? styles.selected : ''}`}
            onClick={() => onChange(m)}
          >
            <div className={styles.matIcon}>{m.icon}</div>
            <div className={styles.matName}>{m.name}</div>
            <div className={styles.matLife}>{m.texasNote}</div>
            <div className={styles.matPop}>{m.pop}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
