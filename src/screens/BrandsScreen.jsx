import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './BrandsScreen.module.css'
import '../shared.css'

export default function BrandsScreen({
  mode,
  onModeChange,
  brands,
  type, // 'inverter' | 'battery'
  onSelectBrand,
  onCompare,
}) {
  const isInverter = type === 'inverter'

  return (
    <div className={styles.screen}>
      <Header
        screenLabel={isInverter ? '— Our Inverter Brands —' : '— Our Battery Brands —'}
        mode={mode}
        onModeChange={onModeChange}
        showCompareBtn={false}
      />
      <main className={styles.content}>
        <div className={styles.titleRow}>
          <div>
            <div className={styles.pageTitle}>
              Our{' '}
              {isInverter ? (
                <><span>Inverter Brands</span></>
              ) : (
                <><span>Battery Brands</span></>
              )}
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {brands.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              type={type}
              onClick={() => onSelectBrand(brand)}
            />
          ))}
        </div>

        {/* New Compare Button Section */}
        <div className={styles.compareSection}>
          <button className={styles.largeCompareBtn} onClick={onCompare}>
            {isInverter ? '⚖ Compare All Inverters' : '⚖ Compare All Batteries'}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function BrandCard({ brand, type, onClick }) {
  const isInverter = type === 'inverter'

  return (
    <div className={styles.card} onClick={onClick}>
      {/* Badge */}
      <div className={`${styles.badge} badge-${brand.badgeColor}`}>
        {brand.badge}
      </div>


      <div className={styles.imageContainer}>
        <img 
          src={brand.image} 
          alt={brand.name} 
          className={styles.productImage} 
        />
        <div className={styles.logoOverlay}>
          <img src={brand.logo} alt={brand.name} className={styles.miniLogo} />
        </div>
      </div>

      {/* Brand positioning (removed name) */}
      <div className={styles.brandName}>{brand.position}</div>

      {/* Efficiency or Warranty box */}
      <div className={styles.metricBox}>
        <div className={styles.metricVal}>
          {type === 'battery' ? brand.warranty : brand.efficiency}
        </div>
        <div className={styles.metricKey}>
          {type === 'battery' ? 'Warranty' : 'Peak Efficiency'}
        </div>
      </div>

      {/* Features */}
      <div className={styles.features}>
        {brand.features.map((f) => (
          <div key={f} className={styles.feat}>
            <span className={styles.featDot}>✦</span>
            {f}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className={`${styles.cta} btn-${brand.btnColor}`}>Explore →</div>
    </div>
  )
}
