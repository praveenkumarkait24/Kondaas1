import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header' // Kept for logic although we'll custom render part of it
import Footer from '../components/Footer'
import styles from './DetailScreen.module.css'
import '../shared.css'

const LOGO_URL = 'https://kondaas.com/wp-content/uploads/2025/06/image-5.svg'

export default function DetailScreen({
  mode,
  onModeChange,
  brand,
  type, // 'inverter' | 'battery'
  onBack,
  onCompare,
}) {
  const isInverter = type === 'inverter'

  return (
    <div className={styles.screen}>
      <Header
        screenLabel="— Product Details —"
        mode={mode}
        onModeChange={onModeChange}
        showCompareBtn={false}
        onBack={onBack}
      />

      <main className={styles.content}>
        <div className={styles.posterCard}>

          <div className={styles.posterLeft}>
            <div className={styles.glassPanel}>
              <div className={styles.brandBox}>
                <div className={styles.brandLogoWrap}>
                  <img src={brand.logo} alt={brand.name} className={styles.brandLogo} />
                </div>
                <div className={styles.brandPosition}>{brand.position}</div>
              </div>

              <h1 className={styles.mainTitle}>
                SOLAR <br />
                {isInverter ? 'INVERTER' : 'BATTERY'}
              </h1>

              <div className={styles.featureList}>
                {brand.allFeatures.slice(0, 4).map((f) => (
                  <div key={f} className={styles.featItem}>
                    <span className={styles.featCheck}>✔</span>
                    {f}
                  </div>
                ))}
              </div>

              <div className={styles.advSection}>
                <h3 className={styles.advHeading}>WHY CHOOSE {brand.name.toUpperCase()}?</h3>
                <ul className={styles.advList}>
                  {brand.advantages.slice(0, 2).map(adv => (
                    <li key={adv}>{adv}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.badgeSlanted}>
                {brand.badge || 'Best Hybrid'}
              </div>
            </div>
          </div>

          {/* RIGHT: Product & Gauge */}
          <div className={styles.posterRight}>
            <div className={styles.productStage}>
              <img src={brand.image} alt={brand.name} className={styles.productImg} />
              <div className={styles.reflection} />
            </div>

            <div className={styles.gaugeContainer}>
              {/* Efficiency / Capacity Gauge */}
              <div className={styles.gaugeRing}>
                <div className={styles.gaugeContent}>
                  <span className={styles.gaugeValue}>
                    {isInverter ? brand.efficiency : brand.capacity?.split('–')[1] || brand.capacity}
                  </span>
                  <span className={styles.gaugeLabel}>
                    {isInverter ? 'PEAK EFFICIENCY' : 'MAX CAPACITY'}
                  </span>
                </div>
              </div>

              {/* Warranty Gauge */}
              <div className={`${styles.gaugeRing} ${styles.warrantyGauge}`}>
                <div className={styles.gaugeContent}>
                  <span className={isInverter ? styles.gaugeValue : styles.gaugeValueSm}>
                    {isInverter
                      ? (brand.warranty?.split(' ')[0] || '5')
                      : (brand.warranty || '36–60 Mo')}
                  </span>
                  <span className={styles.gaugeLabel}>
                    {isInverter ? <>YEARS <br /> WARRANTY</> : 'WARRANTY'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM: Action & Info */}
          <div className={styles.posterFooter}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <div className={`${styles.miniRing} ${styles.blueRing}`}>
                   <span className={styles.miniIcon}>🛜</span>
                </div>
                <div className={styles.infoText}>
                  <strong>WIFI MONITORING</strong>
                  <span>REMOTE ACCESS</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={`${styles.miniRing} ${styles.orangeRing}`}>
                   <span className={styles.miniIcon}>⚡</span>
                </div>
                <div className={styles.infoText}>
                  <strong>SERVICE</strong>
                  <span>PAN INDIA SUPPORT</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={`${styles.miniRing} ${styles.redRing}`}>
                   <span className={styles.miniIcon}>🛡️</span>
                </div>
                <div className={styles.infoText}>
                  <strong>TECHNOLOGY</strong>
                  <span>ADVANCED MPPT</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={`${styles.miniRing} ${styles.blueRing}`}>
                   <span className={styles.miniIcon}>🇮🇳</span>
                </div>
                <div className={styles.infoText}>
                  <strong>INDIA MARKETS</strong>
                  <span>NATIONWIDE SERVICE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  )
}
