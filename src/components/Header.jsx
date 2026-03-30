import { useState, useEffect, useRef } from 'react'
import styles from './Header.module.css'

const LOGO_URL = 'https://kondaas.com/wp-content/uploads/2025/06/image-5.svg'

const LABEL_MAP = {
  home: 'Home',
  inverter: 'Inverter',
  battery: 'Battery'
}

export default function Header({
  screenLabel,
  mode,
  onModeChange,
  showCompareBtn = false,
  onCompare,
  compareBtnLabel = '⚖ Compare All Brands',
  onBack,
}) {
  const [ddOpen, setDdOpen] = useState(false)
  const ddRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className={styles.header}>
      {/* Left — Logo & Back */}
      <div className={styles.left}>
        {onBack && (
          <button className={styles.backBtn} onClick={onBack}>
            ← BACK
          </button>
        )}
        <img
          src={LOGO_URL}
          alt="Kondaas"
          className={styles.logoImg}
          onError={(e) => (e.target.style.display = 'none')}
        />
      </div>



      {/* Right — Compare, Dropdown, second Back */}
      <div className={styles.right}>
        {showCompareBtn && (
          <button className={styles.compareBtn} onClick={onCompare}>
            {compareBtnLabel}
          </button>
        )}

        {/* Mode Dropdown */}
        <div className={styles.dropdown} ref={ddRef}>
          <button className={styles.ddBtn} onClick={() => setDdOpen((o) => !o)}>
            <span className={styles.ddLabel}>
              {LABEL_MAP[mode] || mode}
            </span>
            <span className={styles.ddArrow}>{ddOpen ? '▴' : '▾'}</span>
          </button>
          {ddOpen && (
            <div className={styles.ddMenu}>
              {['home', 'inverter', 'battery'].map((m) => (
                <button
                  key={m}
                  className={`${styles.ddItem} ${mode === m ? styles.ddItemActive : ''}`}
                  onClick={() => { onModeChange(m); setDdOpen(false) }}
                >
                  <span className={styles.ddDot} />
                  {LABEL_MAP[m]}
                </button>
              ))}
            </div>
          )}
        </div>

        {onBack && (
          <button className={`${styles.backBtn} ${styles.backBtnRight}`} onClick={onBack}>
            BACK →
          </button>
        )}
      </div>
    </header>
  )
}
