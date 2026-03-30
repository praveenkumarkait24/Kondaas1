# Kondaas Solar Systems — TV Showroom Kiosk

A production-ready React kiosk interface for the Kondaas Solar Systems showroom, optimised for 1920×1080 TV display.

---

## Tech Stack

| Tool | Version |
|------|---------|
| React | 18.3 |
| Vite  | 5.4  |
| CSS Modules | — |
| Google Fonts (Barlow Condensed + Barlow) | CDN |

---

## Project Structure

```
kondaas-kiosk/
├── index.html                   # Vite HTML entry
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                 # ReactDOM entry
    ├── App.jsx                  # Root – navigation state machine
    ├── index.css                # Global reset + CSS variables + animations
    ├── shared.css               # Brand circle & badge colour classes
    ├── data/
    │   └── kioskData.js         # All brand data, feature lists, compare rows
    ├── components/
    │   ├── Header.jsx/.module.css    # Red header with clock, dropdown, back btn
    │   ├── Footer.jsx/.module.css    # Red footer with ticker animation
    │   └── BrandCircle.jsx/.module.css  # Reusable coloured brand circle
    └── screens/
        ├── HomeScreen.jsx/.module.css       # Landing screen — about + offerings
        ├── BrandsScreen.jsx/.module.css     # 4-brand grid (inverter or battery)
        ├── DetailScreen.jsx/.module.css     # Single brand deep-dive
        └── CompareScreen.jsx/.module.css    # Side-by-side comparison table
```

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# → Open http://localhost:5173 in Chrome at 1920×1080

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## Running as a Kiosk on a Showroom TV

### Option A — Vite Dev Server
```bash
npm run dev
# Open Chrome → navigate to http://localhost:5173
# Press F on keyboard to enter fullscreen
```

### Option B — Chrome Kiosk Mode (recommended for showroom)
```bash
# Build first
npm run build

# Then launch Chrome in kiosk mode
google-chrome --kiosk --app=http://localhost:4173
# (run: npx vite preview in another terminal to serve the build)
```

### Option C — Serve static build
```bash
npm run build
npx serve dist
# Open http://localhost:3000 in Chrome at 1920×1080
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `F` | Enter fullscreen |
| `ESC` | Exit fullscreen / return home |

---

## Navigation Flow

```
HomeScreen
    │
    └─ Mode Dropdown (Inverter / Battery)
            │
            ├─ BrandsScreen (Inverter)
            │       ├─ DetailScreen (Growatt / Havells / Deye / Eastman)
            │       └─ CompareScreen (Inverter comparison table)
            │
            └─ BrandsScreen (Battery)
                    ├─ DetailScreen (Exide / Amaron / Luminous / Livguard)
                    └─ CompareScreen (Battery comparison table)
```

---

## Customisation

### Adding a new brand
Edit `src/data/kioskData.js` and add an entry to `inverterBrands` or `batteryBrands`.

### Changing brand circle colours
Edit `src/shared.css` — update the `.bc-*` gradient classes.

### Changing brand colours / button colours
Each brand object in `kioskData.js` has `badgeColor` and `btnColor` fields that map to CSS classes in `shared.css`.

### Adding a new screen
1. Create `src/screens/NewScreen.jsx` + `NewScreen.module.css`
2. Add a case in `App.jsx` `renderScreen()` switch
3. Add navigation triggers where needed

---

## Design Decisions

- **No hover effects** — this is a touchscreen kiosk, all interactions are tap/active only
- **Fixed 1920×1080** — no responsive layout needed for TV display
- **CSS Modules** — fully scoped styles, zero global conflicts
- **Fade-slide animation** on every screen transition (re-keyed `<div>` in App)
- **Brand data centralised** in `kioskData.js` — single source of truth
- **Shared components** (Header, Footer, BrandCircle) render on every screen for consistency

---

## Contact

**Kondaas Solar Systems**  
kondaas.com | +91 92444 14441 | infokondaas@gmail.com
