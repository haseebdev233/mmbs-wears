# 🚀 MMB's Wears - Quick Start Guide

## First Time Setup

### 1️⃣ Clean Up the Project
```bash
cd "d:\Desktop\Mmb's Wears"

# Run cleanup to fix corrupted App.jsx
cleanup.bat
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start Development Server
```bash
npm run dev
```

### 4️⃣ Open in Browser
Navigate to: **http://localhost:5173**

---

## 📋 What You'll See

### Homepage (`/`)
- ✨ Animated hero section with neon effects
- 🎁 Featured products showcase
- 🤖 Features section highlighting key features
- 📢 Call-to-action section

### Navigation
- **Logo:** MMB's Wears (with neon glow)
- **Menu Links:** Home, Shop, Virtual Try-On, Custom Sizing
- **Icons:** Wishlist, Cart, Login
- **Mobile:** Hamburger menu on smaller screens

### Buttons & Interactions
- Hover effects with glow
- Smooth animations
- Responsive design
- Multiple variants available

---

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm lint
```

---

## 📁 Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
├── contexts/           # React contexts (AuthContext)
├── hooks/              # Custom React hooks
├── services/           # API services
├── utils/              # Utility functions
├── styles/             # Global styles
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

---

## 🎨 Customization

### Change Colors
Edit `src/index.css` root variables:
```css
:root {
  --primary: #00D4FF;     /* Cyan neon */
  --secondary: #FF00FF;   /* Magenta neon */
  --accent: #00FF88;      /* Lime neon */
  /* ... more colors */
}
```

### Add New Pages
1. Create page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add nav link in `src/Navbar.jsx`

### Customize Animations
Edit `src/animationUtils.js` or use Framer Motion directly

---

## 🔐 Authentication

The authentication system is set up and ready:

```javascript
import { useAuth } from './AuthContext';

function MyComponent() {
  const { isAuthenticated, user, login, logout } = useAuth();
  
  // Use auth functions
}
```

### User object structure:
```javascript
{
  id: '1',
  name: 'User Name',
  email: 'user@example.com',
  role: 'user' // or 'admin'
}
```

---

## 📦 Current Limitations

- ❌ No backend API yet (Phase 3)
- ❌ No product database (Phase 4)
- ❌ 3D try-on not implemented (Phase 5)
- ❌ Admin dashboard not built (Phase 6)
- ❌ Payment gateway not configured (Phase 4)

---

## 🆘 Troubleshooting

### Port 5173 Already in Use
```bash
# Use different port
npm run dev -- --port 3000
```

### Styles Not Loading
- Check that `index.css` is imported in `src/main.jsx`
- Clear browser cache
- Restart dev server

### Components Not Found
- Ensure all imports use correct file paths
- Check that all files exist in `src/`

### Build Fails
- Run `npm install` to ensure all dependencies are installed
- Check for syntax errors in your changes
- View build output for specific errors

---

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [GSAP Docs](https://gsap.com)
- [Tailwind CSS](https://tailwindcss.com)

---

## 🤝 Contributing

When adding new features:
1. Follow the existing component structure
2. Use animation utilities for consistency
3. Test on multiple screen sizes
4. Keep components reusable
5. Document complex logic

---

## ✅ Next Steps After Setup

1. ✅ Explore the homepage
2. ✅ Test responsive design (resize browser)
3. ✅ Try clicking buttons and hovering elements
4. ✅ Check animations and transitions
5. ⬜ Read PROJECT_SETUP.md for full details
6. ⬜ Begin Phase 3: Backend Setup

---

**Ready to build the future of fashion! 🚀**
