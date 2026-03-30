import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './HomeScreen.module.css'

const LOGO_URL = 'https://kondaas.com/wp-content/uploads/2025/06/image-5.svg'

const offerings = [
  {
    icon: '🏠',
    name: 'Home Solar',
    desc: 'Cut your electricity bills and power your home with clean energy. Rooftop systems designed for maximum efficiency and quick ROI.',
    tags: ['Cost Saving', 'Easy Install', 'Low Maintenance'],
    bg: '/img/cartoon/home.png',
    color: '#40a9ff', // Bright Solar Blue
  },
  {
    icon: '🏭',
    name: 'Commercial Solar',
    desc: 'Boost your business savings with scalable solar solutions. From offices to factories — reliable systems that reduce costs.',
    tags: ['High Efficiency', 'Scalable', 'Business Growth'],
    bg: '/img/cartoon/commercial.png',
    color: '#ffa940', // Business Amber
  },
  {
    icon: '⚡',
    name: 'Solar Parks',
    desc: 'Large-scale renewable energy solutions for industries and communities. Built with advanced technology for maximum long-term output.',
    tags: ['Utility-Scale', 'Govt. Approved', 'Sustainable'],
    bg: '/img/cartoon/parks.png',
    color: '#73d13d', // Eco Green
  },
  {
    icon: '📱',
    name: 'Smart Monitoring',
    desc: 'Automatic problem detection and resolution — no manual checks needed. All-in-one monitoring app coming soon.',
    tags: ['Auto Detection', 'App Control', 'Real-Time'],
    bg: '/img/cartoon/smart.png',
    color: '#36cfc9', // Tech Teal
  },
]

export default function HomeScreen({ mode, onModeChange }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 4)
    }, 10000) // 10 second gap
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.screen}>
      <Header
        screenLabel="— Welcome to Kondaas —"
        mode={mode}
        onModeChange={onModeChange}
      />

      <main className={styles.content}>
        {/* ── LEFT COLUMN ── */}
        <div className={styles.left}>
          {/* Logo Box */}
          <div className={styles.logoBox}>
            <img
              src={LOGO_URL}
              alt="Kondaas"
              className={styles.logoImg}
              onError={(e) => (e.target.style.display = 'none')}
            />
            <div className={styles.logoName}>Best Solar Installer Across South India</div>
            <div className={styles.logoRating}>⭐ 4.8 · 7,079 Google Reviews</div>
          </div>

          {/* Stats */}
          <div className={styles.statsRow}>
            {[
              { val: '100k+', lbl: 'Customers Served' },
              { val: '25+',   lbl: 'Years of Expertise' },
              { val: '50+',   lbl: 'Cities Powered' },
            ].map((s) => (
              <div key={s.lbl} className={styles.stat}>
                <div className={styles.statVal}>{s.val}</div>
                <div className={styles.statLbl}>{s.lbl}</div>
              </div>
            ))}
          </div>

          {/* About */}
          <div className={styles.about}>
            <div className={styles.aboutTitle}>
              About <span>Kondaas</span>
            </div>
            <p className={styles.aboutBody}>
              Kondaas isn't just a solar installer — we're one of South India's most trusted clean
              energy partners. With <strong>25+ years of experience</strong>, government recognition,
              and top-tier technology, we've helped over <strong>100,000+ customers</strong> power up
              with confidence.
            </p>
            <p className={styles.aboutBody}>
              We create eco-friendly solutions that combine innovation and sustainability. Since 1995,
              Kondaas has been the benchmark for solar excellence across Tamil Nadu and South India.
            </p>
            <div className={styles.promise}>
              <span className={styles.promiseIcon}>🌟</span>
              <div>
                <div className={styles.promiseTitle}>The Kondaas Promise</div>
                <div className={styles.promiseText}>
                  Unbeatable solar quality, zero upfront investment, guaranteed savings — else we'll
                  pay you back.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className={styles.right}>
          <div className={styles.offeringsTitle}>
            What We <span>Offer</span>
          </div>

          <div className={styles.carouselContainer}>
            <div 
              className={styles.offeringsGrid}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {[0, 1, 2, 3].map((page) => (
                <div key={page} className={styles.carouselPage}>
                  <div 
                    className={styles.offeringCard}
                    style={{ 
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${offerings[page].bg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div 
                      className={styles.offeringIcon}
                      style={{ color: offerings[page].color }}
                    >
                      {offerings[page].icon}
                    </div>
                    <div className={styles.offeringName}>{offerings[page].name}</div>
                    <div className={styles.offeringDesc}>{offerings[page].desc}</div>
                    <div className={styles.offeringTags}>
                      {offerings[page].tags.map((t) => (
                        <span 
                          key={t} 
                          className={styles.offeringTag}
                          style={{ borderColor: offerings[page].color, color: offerings[page].color }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Indicators */}
            <div className={styles.indicators}>
              {[0, 1, 2, 3].map((i) => (
                <button 
                  key={i} 
                  className={`${styles.indicator} ${currentIndex === i ? styles.active : ''}`}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>


      {/* <Footer /> */}
    </div>
  )
}
