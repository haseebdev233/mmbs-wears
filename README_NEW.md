# 🌟 MMB's Wears - Advanced AI-Powered Fashion eCommerce Platform

A next-generation animated luxury fashion eCommerce website featuring AI bargaining, 3D virtual try-on, and premium futuristic UI/UX.

## ✨ Features Built So Far

### Phase 1-2: Foundation & Animations ✅

#### 🎨 Beautiful UI Components
- **Navbar** - Sticky navigation with mobile menu
- **Button** - 5 variants with neon glow effects
- **Card** - Glassmorphic cards with hover animations
- **Home Page** - Hero section, featured products, features section, CTA
- **Auth Pages** - Login/Register with validation

#### 🎬 Animation System
- GSAP-powered animations (glow, float, rotate, particles)
- Framer Motion presets (fade, slide, scale, stagger)
- Scroll-triggered animations
- Smooth page transitions

#### 🎨 Design System
- Neon color palette (Cyan, Magenta, Lime)
- Glassmorphism effects with backdrop blur
- Responsive design (mobile to desktop)
- Custom scrollbars and typography

#### 🔐 Authentication
- JWT-based auth with localStorage
- User state management with AuthContext
- Role-based access control (user/admin)
- Secure token handling

---

## 🚀 Quick Start

### 1. Setup
```bash
cd "d:\Desktop\Mmb's Wears"
cleanup.bat
npm install
```

### 2. Run
```bash
npm run dev
```

### 3. Visit
```
http://localhost:5173
```

---

## 📁 Project Structure

```
src/
├── AuthContext.jsx         # Authentication provider
├── App.jsx / App.css       # Main app with routing
├── Button.jsx / .css       # Button component
├── Card.jsx / .css         # Card component
├── Navbar.jsx / .css       # Navigation component
├── Home.jsx / .css         # Homepage with sections
├── Login.jsx / Auth.css    # Auth pages
├── animationUtils.js       # GSAP & Framer Motion utils
├── constants.js            # Configuration
├── index.css               # Global styles
└── main.jsx                # Entry point
```

---

## 🎯 Pages Available

| Route | Description | Status |
|-------|-------------|--------|
| `/` | Homepage with hero & features | ✅ Ready |
| `/login` | Login/Register page | ✅ Ready |
| `/register` | Same as login | ✅ Ready |
| `/shop` | Product catalog | ⏳ Coming Soon |
| `/try-on` | 3D Virtual Try-On | ⏳ Coming Soon |
| `/custom-sizing` | Custom Sizing System | ⏳ Coming Soon |

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 19 + Vite 8 |
| **Routing** | React Router DOM 7 |
| **Animations** | Framer Motion 12 + GSAP 3 |
| **Styling** | Tailwind 4 + Bootstrap 5 + Custom CSS |
| **3D (Ready)** | React Three Fiber + Three.js |
| **Icons** | React Icons 5 |
| **HTTP** | Axios 1 |
| **State Management** | React Context |

---

## 🎨 Design Highlights

### Color Palette
- **Primary:** Cyan `#00D4FF` (neon glow)
- **Secondary:** Magenta `#FF00FF` (neon glow)
- **Accent:** Lime `#00FF88` (neon glow)
- **Dark:** `#0a0e27` (deep space)

### Effects
- Neon text glow with shadows
- Glassmorphic cards with blur
- Floating animations
- Smooth hover transitions
- Interactive cursor effects

### Responsive Breakpoints
- 📱 Mobile: 480px
- 📱 Tablet: 768px
- 🖥️ Desktop: 1024px
- 🖥️ Large: 1400px

---

## 📝 Roadmap

### ✅ Phase 1-2: Foundation (Completed)
- Project structure
- Animation framework
- Component library
- Global styles
- Authentication skeleton

### ⏳ Phase 3: Backend (Next)
- Express.js server setup
- MongoDB Atlas connection
- JWT authentication API
- Database models and schemas

### ⏳ Phase 4: Shopping Features
- Product catalog with filtering
- Product detail pages
- Shopping cart (localStorage)
- Checkout flow
- WhatsApp integration

### ⏳ Phase 5: Advanced Features
- 3D virtual try-on (React Three Fiber)
- Custom sizing system
- AI bargaining system
- Body measurements upload

### ⏳ Phase 6: Admin Dashboard
- Admin layout
- Product management
- 3D model uploads
- Bargaining control
- Analytics dashboard

### ⏳ Phase 7: Optimization
- Performance optimization
- Image lazy loading
- Security hardening
- Responsive refinements

---

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Component Usage
```javascript
import Button from './Button';
import Card from './Card';
import { useAuth } from './AuthContext';
import { fadeInVariants } from './animationUtils';

function MyComponent() {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <Card glow hover>
      <Button variant="primary">
        Click me
      </Button>
    </Card>
  );
}
```

---

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Quick setup guide
- **[PROJECT_SETUP.md](./PROJECT_SETUP.md)** - Detailed project documentation
- **[cleanup.bat](./cleanup.bat)** - Windows cleanup script
- **[cleanup.sh](./cleanup.sh)** - Linux/Mac cleanup script

---

## 🤝 Code Quality

- ✅ Clean, readable code
- ✅ Reusable components
- ✅ Comprehensive comments
- ✅ Responsive design
- ✅ Accessibility-ready
- ✅ Performance optimized

---

## 🆘 Common Issues

**Q: Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**Q: Styles not loading?**
- Clear browser cache
- Restart dev server
- Check `main.jsx` has `import './index.css'`

**Q: Build fails?**
- Run `npm install`
- Check for syntax errors
- View build output for details

---

## 📞 Next Steps

1. ✅ Run the project
2. ✅ Explore the homepage
3. ✅ Test animations and hover effects
4. ✅ Check responsive design
5. ⏳ Read full documentation
6. ⏳ Begin Phase 3: Backend Setup

---

## 💡 Tips for Development

1. **Animations:** Use presets from `animationUtils.js`
2. **Styling:** Use CSS variables and utilities
3. **Components:** Reuse existing components
4. **State:** Use AuthContext for user data
5. **API:** Use Axios with centralized config

---

## 📜 License

MMB's Wears © 2026 - All Rights Reserved

---

**Let's build the future of fashion! 🚀✨**

For detailed information, see [PROJECT_SETUP.md](./PROJECT_SETUP.md)
