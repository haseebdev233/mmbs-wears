# 📂 MMB's Wears - Complete File Reference Guide

```
d:\Desktop\Mmb's Wears\
│
├── 📄 Documentation Files (READ THESE!)
│   ├── README_NEW.md ...................... Main project overview (Start here!)
│   ├── QUICKSTART.md ..................... Get running in 5 minutes
│   ├── PROJECT_SETUP.md .................. Detailed architecture guide
│   ├── COMPONENT_INVENTORY.md ............ Complete component reference
│   ├── BUILD_SUMMARY.md .................. Build completion report
│   ├── STATUS_REPORT.txt ................. Project status overview
│   └── This File ......................... File reference guide
│
├── 🚀 Setup & Scripts
│   ├── cleanup.bat ....................... Windows cleanup script
│   ├── cleanup.sh ........................ Linux/Mac cleanup script
│   ├── SETUP_CHECKLIST.js ............... Developer verification
│   ├── package.json ..................... Dependencies & scripts
│   ├── package-lock.json ................ Lock file
│   └── vite.config.js ................... Vite configuration
│
├── 📁 src\ (Frontend Code)
│   │
│   ├── 🔐 Authentication
│   │   └── AuthContext.jsx .............. JWT auth provider with useAuth hook
│   │
│   ├── 🧩 Components (Ready to use!)
│   │   ├── Button.jsx ................... Multi-variant button component
│   │   ├── Button.css ................... Button styling (5 variants)
│   │   ├── Card.jsx ..................... Glassmorphic card component
│   │   ├── Card.css ..................... Card styling & effects
│   │   ├── Navbar.jsx ................... Navigation with mobile menu
│   │   ├── Navbar.css ................... Navigation styling
│   │   ├── Home.jsx ..................... Full homepage with sections
│   │   ├── Home.css ..................... Homepage styling
│   │   ├── Login.jsx .................... Auth pages (login/register)
│   │   └── Auth.css ..................... Auth pages styling
│   │
│   ├── 📱 Main App
│   │   ├── App.jsx ...................... Main app with routing
│   │   ├── App.css ...................... App-level styles
│   │   ├── main.jsx ..................... Entry point
│   │   └── index.css .................... Global styles (Most important!)
│   │
│   ├── ⚙️ Utilities
│   │   ├── animationUtils.js ............ GSAP & Framer Motion presets (40+)
│   │   └── constants.js ................. Configuration & constants
│   │
│   ├── 🎨 Assets
│   │   └── assets\ ...................... Images, icons, etc.
│   │
│   ├── ❌ Backup Files (Can be deleted)
│   │   ├── App-new.jsx .................. Backup
│   │   ├── AppClean.jsx ................. Clean app version (backup)
│   │   └── App.jsx.backup ............... Original backup
│   │
│   └── index.html (Root)
│
├── 📦 node_modules\ ..................... Dependencies (auto-installed)
├── 🏗️ dist\ ............................ Build output (generated)
└── .gitignore ........................... Git ignore rules
```

---

## 📝 File Purposes & Quick Links

### 📖 Start Here (Documentation)
| File | Purpose | Read Time |
|------|---------|-----------|
| README_NEW.md | Project overview & features | 10 min |
| QUICKSTART.md | Get running immediately | 5 min |
| PROJECT_SETUP.md | Complete technical guide | 20 min |
| COMPONENT_INVENTORY.md | Component reference | 15 min |
| STATUS_REPORT.txt | Build status & metrics | 5 min |

### 💻 Core Application Files
| File | Purpose | Type |
|------|---------|------|
| App.jsx | Main routing & layout | React component |
| main.jsx | App entry point | JavaScript |
| index.css | Global styles & theme | CSS |
| constants.js | Config & settings | JavaScript |
| animationUtils.js | Animation presets | JavaScript |

### 🧩 Component Files
| Component | Files | Purpose |
|-----------|-------|---------|
| Button | Button.jsx + Button.css | Reusable button (5 variants) |
| Card | Card.jsx + Card.css | Glassmorphic card |
| Navbar | Navbar.jsx + Navbar.css | Navigation bar |
| Home | Home.jsx + Home.css | Homepage with sections |
| Login | Login.jsx + Auth.css | Login/register page |
| AuthContext | AuthContext.jsx | Authentication provider |

### ⚙️ Configuration Files
| File | Purpose |
|------|---------|
| package.json | Dependencies list & scripts |
| vite.config.js | Vite build configuration |
| .gitignore | Git ignore rules |

### 🚀 Setup & Utilities
| File | Purpose | Platform |
|------|---------|----------|
| cleanup.bat | Cleanup script | Windows |
| cleanup.sh | Cleanup script | Linux/Mac |
| SETUP_CHECKLIST.js | Verification guide | All |

---

## 🎯 What Each Component Does

### Button.jsx
- **Variants:** primary, secondary, accent, outlined, ghost
- **Sizes:** sm, md, lg
- **Features:** loading state, icons, disabled, fullWidth
- **Animations:** neon glow on hover, smooth transitions
- **Usage:**
  ```jsx
  <Button variant="primary" size="lg" icon={FiArrowRight}>
    Click Me
  </Button>
  ```

### Card.jsx
- **Purpose:** Glassmorphic container for content
- **Features:** Hover animations, glow effect, variants
- **Usage:**
  ```jsx
  <Card glow hover>
    <h3>Card Title</h3>
    <p>Content goes here</p>
  </Card>
  ```

### Navbar.jsx
- **Features:** Sticky nav, mobile menu, auth info, icons
- **Responsive:** Hamburger menu on mobile
- **Auto-integrates:** Uses AuthContext for user info
- **No props needed:** Works standalone

### Home.jsx
- **Sections:** Hero, featured products, features, CTA
- **Animations:** Particle background, staggered animations
- **Responsive:** Mobile-first design
- **Ready to extend:** Add more sections

### Login.jsx
- **Features:** Email/password form, validation
- **Flows:** Login and register (same page)
- **Animations:** Smooth page transitions
- **Integrates:** Uses AuthContext to save user

### AuthContext.jsx
- **Purpose:** Manages JWT authentication
- **Features:** Token storage, user state, role-based access
- **Hook:** Use `useAuth()` anywhere
- **Methods:** login(), logout(), isAuthenticated, isAdmin

---

## 🎨 Styling System

### index.css (Global Styles)
The most important CSS file! Contains:
- Color variables (primary, secondary, accent, etc.)
- Glassmorphism utilities
- Neon glow effects
- Animation keyframes
- Responsive typography
- Custom scrollbars

**Edit this to change:**
- Brand colors
- Animation speeds
- Responsive breakpoints
- Typography scales

### Component CSS Files
Each component has its own CSS for:
- Component-specific styling
- Responsive design
- Hover/focus states
- Animation timing

**Pattern:**
- Component.jsx = React component
- Component.css = Styling for that component

---

## ⚡ Animation System

### animationUtils.js
**GSAP Animations:**
- animateGlow()
- animateNeon()
- animateFloat()
- animateRotate()
- animateParticles()
- scrollTriggerAnimation()
- typewriter()

**Framer Motion Variants:**
- fadeInVariants
- slideInVariants
- scaleUpVariants
- containerVariants
- itemVariants
- hoverScaleVariants
- glowHoverVariants

**Usage:**
```javascript
import { fadeInVariants } from './animationUtils';

<motion.div variants={fadeInVariants}>
  Content
</motion.div>
```

---

## 📊 File Statistics

| Category | Count | Purpose |
|----------|-------|---------|
| React Components | 6 | UI building blocks |
| CSS Files | 8 | Styling layers |
| Utility Files | 2 | Functions & config |
| Documentation | 7 | Guides & references |
| Config Files | 3 | Build & dependencies |
| Scripts | 3 | Development tools |
| **Total** | **29** | **Complete system** |

---

## 🔄 Development Workflow

### When you want to...

**Add a new button variant:**
- Edit → `src/Button.css`
- Add new `.btn-variantname` class

**Change brand colors:**
- Edit → `src/index.css`
- Modify `--primary`, `--secondary`, etc.

**Create a new page:**
- Create → `src/NewPage.jsx`
- Create → `src/NewPage.css`
- Edit → `src/App.jsx` (add route)
- Edit → `src/Navbar.jsx` (add nav link)

**Add animation to component:**
- Import → `import { fadeInVariants } from './animationUtils'`
- Use → `variants={fadeInVariants}`

**Update authentication:**
- Edit → `src/AuthContext.jsx`
- Methods: login(), logout()

---

## 🛠️ Common Tasks

### Build & Deploy
```bash
npm run build      # Creates optimized build in dist/
```

### Development
```bash
npm run dev        # Start dev server on localhost:5173
npm run lint       # Check code quality
```

### Troubleshooting
```bash
npm install        # Reinstall dependencies
cleanup.bat        # Fix corrupted files (Windows)
bash cleanup.sh    # Fix corrupted files (Linux/Mac)
```

---

## 📂 Backup & Temporary Files

**Can be deleted:**
- App-new.jsx
- App.jsx.backup
- AppClean.jsx (after cleanup runs)

**Keep these:**
- All files in src/
- package.json
- Documentation files

---

## ✅ Checklist for First-Time Setup

- [ ] Read QUICKSTART.md (5 min)
- [ ] Run cleanup.bat or cleanup.sh
- [ ] Run npm install
- [ ] Run npm run dev
- [ ] Visit http://localhost:5173
- [ ] Test responsive design
- [ ] Try animations
- [ ] Read PROJECT_SETUP.md (20 min)
- [ ] Explore component files
- [ ] Try modifying colors in index.css
- [ ] Create a test component

---

## 🎓 Learning Path

**Beginner:**
1. Read QUICKSTART.md
2. Run the project
3. Explore component files
4. Modify CSS colors

**Intermediate:**
1. Read PROJECT_SETUP.md
2. Create a new component
3. Use animationUtils
4. Add a new page

**Advanced:**
1. Study animation framework
2. Extend components
3. Integrate backend
4. Build new features

---

## 🔗 File Relationships

```
App.jsx (router)
  ├── imports Navbar.jsx
  ├── imports Home.jsx
  ├── imports Login.jsx
  └── imports AuthContext.jsx

Navbar.jsx
  ├── uses Button.jsx
  ├── uses AuthContext (useAuth hook)
  └── styles from Navbar.css

Home.jsx
  ├── uses Button.jsx
  ├── uses Card.jsx
  ├── uses animationUtils
  └── styles from Home.css

Button.jsx
  ├── uses Framer Motion
  ├── uses glowHoverVariants
  └── styles from Button.css

AuthContext.jsx
  ├── exports useAuth hook
  └── manages JWT tokens
```

---

## 💾 Where to Find Things

**Need to change button colors?**
→ Check `src/Button.css`

**Need to change theme?**
→ Check `src/index.css` (CSS variables)

**Need animation presets?**
→ Check `src/animationUtils.js`

**Need to understand structure?**
→ Check `src/App.jsx` (routing)

**Need configuration?**
→ Check `src/constants.js`

**Need to learn setup?**
→ Check `QUICKSTART.md`

**Need component details?**
→ Check `COMPONENT_INVENTORY.md`

---

## 🚀 Ready to Start?

1. **Setup:** Follow QUICKSTART.md
2. **Explore:** Open files in code editor
3. **Learn:** Read PROJECT_SETUP.md
4. **Build:** Create new components
5. **Connect:** Integrate backend (Phase 3)

---

**You have everything you need to build amazing features! 🎉**

Last Updated: 2026-05-14
