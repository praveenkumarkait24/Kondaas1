import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './CompareScreen.module.css'
import '../shared.css'

export default function CompareScreen({
  mode,
  onModeChange,
  compareData,
  type, // 'inverter' | 'battery'
  onBack,
}) {
  const isInverter = type === 'inverter'
  const { columns, rows } = compareData

  return (
    <div className={styles.screen}>
      <Header
        screenLabel={isInverter ? '— Inverter Comparison —' : '— Battery Comparison —'}
        mode={mode}
        onModeChange={onModeChange}
        onBack={onBack}
      />

      <main className={styles.content}>
        <div className={styles.titleRow}>
          <div>
            <div className={styles.pageTitle}>
              {isInverter ? 'Inverter' : 'Battery'} <span>Brand Comparison</span>
            </div>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {/* Spec column header */}
                <th className={styles.specHeader}>Specification</th>

                {/* Brand column headers */}
                {columns.map((col) => (
                  <th key={col.label} className={styles.brandHeader}>
                    <div className={styles.brandHeaderInner}>
                      {col.logo && (
                        <div className={styles.logoWrapper}>
                          <img 
                            src={col.logo} 
                            alt={col.label} 
                            className={`${styles.brandLogo} ${col.label === 'Livguard' ? styles.livguardLogo : ''}`} 
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={row.label} className={ri % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <td className={styles.specCell}>{row.label}</td>
                  {row.vals.map((val, ci) => {
                    const isWinner = row.winners?.includes(ci)
                    const isRec = row.isRec
                    const isCheck = val === '✔'
                    const isCross = val === '✘'
                    return (
                      <td
                        key={ci}
                        className={`${styles.dataCell}
                          ${isWinner ? styles.winner : ''}
                          ${isRec ? styles.recCell : ''}
                          ${isCheck ? styles.checkCell : ''}
                          ${isCross ? styles.crossCell : ''}
                        `}
                      >
                        {val}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  )
}
