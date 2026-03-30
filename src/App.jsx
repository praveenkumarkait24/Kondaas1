import { useState, useEffect, useCallback } from 'react'
import HomeScreen    from './screens/HomeScreen'
import BrandsScreen  from './screens/BrandsScreen'
import DetailScreen  from './screens/DetailScreen'
import CompareScreen from './screens/CompareScreen'
import {
  inverterBrands,
  batteryBrands,
  inverterCompare,
  batteryCompare,
} from './data/kioskData'
import Footer from './components/Footer'

// ─── Navigation states ───────────────────────────────────
// 'home'             → HomeScreen
// 'inverter-brands'  → BrandsScreen (inverter)
// 'battery-brands'   → BrandsScreen (battery)
// 'inverter-detail'  → DetailScreen (inverter)
// 'battery-detail'   → DetailScreen (battery)
// 'inverter-compare' → CompareScreen (inverter)
// 'battery-compare'  → CompareScreen (battery)

export default function App() {
  const [screen, setScreen]             = useState('home')
  const [mode, setMode]                 = useState('home') // current dropdown selection
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [fadeKey, setFadeKey]           = useState(0)  // forces re-mount animation on nav

  // ── Navigate helper (triggers fade animation) ──
  const navigate = useCallback((target) => {
    setScreen(target)
    setFadeKey((k) => k + 1)
  }, [])

  // ── Mode dropdown → navigate to correct brand screen ──
  const handleModeChange = useCallback((newMode) => {
    setMode(newMode)
    if (newMode === 'home') {
      navigate('home')
    } else {
      const routeMap = {
        inverter: 'inverter-brands',
        battery: 'battery-brands',
      }
      navigate(routeMap[newMode] || 'home')
    }
  }, [navigate])

  // ── Kiosk Mode Lockdown ───────────────────────────────────
  useEffect(() => {
    const keyHandler = (e) => {
      // Allowed keys: 'f', 'F', 'Escape'
      const allowed = ['f', 'F', 'Escape']
      if (!allowed.includes(e.key)) {
        e.preventDefault()
        return
      }

      if (e.key === 'f' || e.key === 'F') {
        // Toggle Fullscreen on 'f'
        if (!document.fullscreenElement) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(() => {})
          }
        } else {
          // If already fullscreen, maybe 'f' does something else
          // For now, let's keep it for fullscreen toggle or custom action
        }
      } else if (e.key === 'Escape') {
        // ESC acts as BACK
        if (screen === 'home') return
        
        // Logical "Back" navigation
        if (screen.includes('detail')) {
          navigate(screen.split('-')[0] + '-brands')
        } else if (screen.includes('compare')) {
          navigate(screen.split('-')[0] + '-brands')
        } else {
          navigate('home')
        }
        e.preventDefault()
      }
    }

    const mouseHandler = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }

    // Capture phase listeners to block everything
    window.addEventListener('keydown', keyHandler, true)
    window.addEventListener('contextmenu', mouseHandler, true)

    return () => {
      window.removeEventListener('keydown', keyHandler, true)
      window.removeEventListener('contextmenu', mouseHandler, true)
    }
  }, [navigate, screen])

  // ── Render ──
  const sharedProps = {
    mode,
    onModeChange: handleModeChange,
  }

  const renderScreen = () => {
    switch (screen) {

      case 'home':
        return (
          <HomeScreen
            {...sharedProps}
            onModeChange={(m) => {
              // From home, mode change always goes to brand screen
              handleModeChange(m)
            }}
          />
        )

      case 'inverter-brands':
        return (
          <BrandsScreen
            {...sharedProps}
            brands={inverterBrands}
            type="inverter"
            onSelectBrand={(brand) => {
              setSelectedBrand(brand)
              navigate('inverter-detail')
            }}
            onCompare={() => navigate('inverter-compare')}
          />
        )

      case 'battery-brands':
        return (
          <BrandsScreen
            {...sharedProps}
            brands={batteryBrands}
            type="battery"
            onSelectBrand={(brand) => {
              setSelectedBrand(brand)
              navigate('battery-detail')
            }}
            onCompare={() => navigate('battery-compare')}
          />
        )


      case 'inverter-detail':
        return selectedBrand ? (
          <DetailScreen
            {...sharedProps}
            brand={selectedBrand}
            type="inverter"
            onBack={() => navigate('inverter-brands')}
            onCompare={() => navigate('inverter-compare')}
          />
        ) : null

      case 'battery-detail':
        return selectedBrand ? (
          <DetailScreen
            {...sharedProps}
            brand={selectedBrand}
            type="battery"
            onBack={() => navigate('battery-brands')}
            onCompare={() => navigate('battery-compare')}
          />
        ) : null


      case 'inverter-compare':
        return (
          <CompareScreen
            {...sharedProps}
            compareData={inverterCompare}
            type="inverter"
            onBack={() => navigate('inverter-brands')}
          />
        )

      case 'battery-compare':
        return (
          <CompareScreen
            {...sharedProps}
            compareData={batteryCompare}
            type="battery"
            onBack={() => navigate('battery-brands')}
          />
        )


      default:
        return <HomeScreen {...sharedProps} />
    }
  }

  return (
    <div className="app-layout">
      <main key={fadeKey} className="fade-slide-up main-content">
        {renderScreen()}
      </main>
      <Footer />
    </div>
  )
}
