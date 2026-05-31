import { TEXAS_CITIES } from '@/lib/texasData'
import styles from './Steps.module.css'

export default function StepCity({ value, onChange }) {
  return (
    <div>
      <h2 className={styles.stepTitle}>Where are you located?</h2>
      <p className={styles.stepDesc}>We use your city to pull local labor rates for an accurate estimate.</p>
      <div className={styles.cityGrid}>
        {TEXAS_CITIES.map(c => (
          <button
            key={c.city}
            className={`${styles.cityBtn} ${value?.city === c.city ? styles.selected : ''} ${c.city === 'Other Texas' ? styles.fullWidth : ''}`}
            onClick={() => onChange(c)}
          >
            <span className={styles.cityIcon}>{c.icon}</span>
            <div>
              <div className={styles.cityName}>{c.city}</div>
              <div className={styles.citySub}>{c.sub}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
