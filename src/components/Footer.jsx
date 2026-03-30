import styles from './Footer.module.css'

const TICKER_TEXT = [
  '⚡ BEST SOLAR INSTALLER ACROSS SOUTH INDIA — South India\'s Most Trusted Solar Installer since 1995',
  '🌟 100,000+ Satisfied Customers Served Across 50+ Cities',
  '🏆 4.8 Stars · 7,079 Google Reviews — Best On-Grid Solar Installer',
  '🍃 Creating Eco-Friendly Solutions that Combine Innovation and Sustainability',
  '☀️ Save Big on Electricity Bills with Kondaas Solar Solutions',
]

export default function Footer() {
  const content = TICKER_TEXT.join(' • ')

  return (
    <footer className={styles.footer}>
      <div className={styles.track}>
        {content} • {content}
      </div>
    </footer>
  )
}
