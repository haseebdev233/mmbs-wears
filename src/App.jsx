import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import axios from 'axios'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Float, OrbitControls } from '@react-three/drei'
import {
  FiArrowRight,
  FiCamera,
  FiHeart,
  FiMessageCircle,
  FiPlay,
  FiRefreshCw,
  FiShoppingBag,
  FiStar,
  FiTrendingUp,
  FiUploadCloud,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HeaderCarousel from './HeaderCarousel'
import AdminPanel from './AdminPanel'
import AboutPage from './pages/AboutPage'
import AISuggestionPage from './pages/AISuggestionPage'
import CartPage from './pages/CartPage'
import Design3DModelsPage from './pages/Design3DModelsPage'
import DesignCustomModelsPage from './pages/DesignCustomModelsPage'
import LoginPage from './pages/Login'
import NewArrivalsPage from './pages/NewArrivalsPage'
import SignupPage from './pages/Signup'
import './lightTheme.css'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const productsSeed = [
  {
    id: 'aurora-alpha-jacket',
    name: 'Aurora Alpha Jacket',
    category: 'Outerwear',
    price: 249,
    minAcceptablePrice: 189,
    autoAcceptAt: 219,
    bargainingEnabled: true,
    rating: 4.9,
    reviews: 128,
    badge: 'Limited Drop',
    aiTag: 'AI recommended',
    summary: 'A sharp futuristic jacket with reflective trims and premium comfort.',
    gradient: 'linear-gradient(135deg, rgba(14,165,233,.95), rgba(168,85,247,.75))',
    palette: ['#0f172a', '#38bdf8', '#a855f7'],
  },
  {
    id: 'stellar-core-hoodie',
    name: 'Stellar Core Hoodie',
    category: 'Streetwear',
    price: 149,
    minAcceptablePrice: 109,
    autoAcceptAt: 129,
    bargainingEnabled: true,
    rating: 4.8,
    reviews: 211,
    badge: 'Flash Sale',
    aiTag: 'Best seller',
    summary: 'Luxury fleece hoodie designed for modern athletic silhouettes.',
    gradient: 'linear-gradient(135deg, rgba(34,197,94,.9), rgba(15,23,42,.95))',
    palette: ['#0f172a', '#22c55e', '#e2e8f0'],
  },
  {
    id: 'nova-edge-joggers',
    name: 'Nova Edge Joggers',
    category: 'Bottoms',
    price: 119,
    minAcceptablePrice: 89,
    autoAcceptAt: 99,
    bargainingEnabled: true,
    rating: 4.7,
    reviews: 96,
    badge: 'New Arrival',
    aiTag: 'Size matched',
    summary: 'Tailored tech joggers with a slim futuristic cut.',
    gradient: 'linear-gradient(135deg, rgba(251,191,36,.95), rgba(15,23,42,.95))',
    palette: ['#0f172a', '#f59e0b', '#fde68a'],
  },
  {
    id: 'celeste-runner-set',
    name: 'Celeste Runner Set',
    category: 'Set',
    price: 179,
    minAcceptablePrice: 139,
    autoAcceptAt: 159,
    bargainingEnabled: false,
    rating: 5,
    reviews: 74,
    badge: 'Exclusive',
    aiTag: 'Disabled bargain',
    summary: 'A premium coordinated set for luxury athleisure looks.',
    gradient: 'linear-gradient(135deg, rgba(236,72,153,.9), rgba(15,23,42,.96))',
    palette: ['#0f172a', '#ec4899', '#f8fafc'],
  },
  {
    id: 'velvet-nebula-tee',
    name: 'Velvet Nebula Tee',
    category: 'Tops',
    price: 79,
    minAcceptablePrice: 59,
    autoAcceptAt: 69,
    bargainingEnabled: true,
    rating: 4.6,
    reviews: 168,
    badge: 'Trending',
    aiTag: 'AI fit',
    summary: 'Soft drape tee with smart fit suggestions for custom sizing.',
    gradient: 'linear-gradient(135deg, rgba(59,130,246,.9), rgba(2,6,23,.95))',
    palette: ['#0f172a', '#3b82f6', '#dbeafe'],
  },
  {
    id: 'orbit-luxe-cap',
    name: 'Orbit Luxe Cap',
    category: 'Accessories',
    price: 49,
    minAcceptablePrice: 35,
    autoAcceptAt: 39,
    bargainingEnabled: true,
    rating: 4.5,
    reviews: 51,
    badge: 'Add-on',
    aiTag: 'Cross sell',
    summary: 'Minimal cap with reflective stitching and street-luxury styling.',
    gradient: 'linear-gradient(135deg, rgba(148,163,184,.9), rgba(15,23,42,.96))',
    palette: ['#0f172a', '#94a3b8', '#f8fafc'],
  },
]

const reviews = [
  { name: 'Amina', text: 'The futuristic vibe makes it feel like a luxury runway store.', stars: 5 },
  { name: 'Jordan', text: 'The bargaining animation feels surprisingly alive and premium.', stars: 5 },
  { name: 'Riya', text: 'The 3D try-on preview and size recommendations are exactly what I wanted.', stars: 4 },
  { name: 'Khalid', text: 'Fast, sleek, and modern — the design already feels like a premium brand.', stars: 5 },
]

const bodyTypes = ['Slim', 'Athletic', 'Oversized', 'Custom']

function useLocalStorageState(key, fallback) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return fallback
    const saved = window.localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

function App() {
  const [catalog] = useLocalStorageState('mmbs-catalog', productsSeed)
  const [cart, setCart] = useLocalStorageState('mmbs-cart', [])
  const [wishlist, setWishlist] = useLocalStorageState('mmbs-wishlist', [])
  const [bargains, setBargains] = useLocalStorageState('mmbs-bargains', [])
  const [token, setToken] = useLocalStorageState('mmbs-token', '')
  const [activeBargain, setActiveBargain] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const move = (event) => setCursor({ x: event.clientX, y: event.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const productById = useMemo(() => Object.fromEntries(catalog.map((item) => [item.id, item])), [catalog])

  const addToCart = (product) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id)
      if (existing) {
        return items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...items, { id: product.id, name: product.name, price: product.price, quantity: 1 }]
    })
  }

  const increaseCartQuantity = (productId) => {
    const product = productById[productId]
    if (product) {
      addToCart(product)
      return
    }
    setCart((items) => items.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)))
  }

  const decreaseCartQuantity = (productId) => {
    setCart((items) =>
      items.flatMap((item) => {
        if (item.id !== productId) return [item]
        if (item.quantity <= 1) return []
        return [{ ...item, quantity: item.quantity - 1 }]
      }),
    )
  }

  const removeFromCart = (productId) => {
    setCart((items) => items.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const toggleWishlist = (product) => {
    setWishlist((items) =>
      items.some((item) => item.id === product.id)
        ? items.filter((item) => item.id !== product.id)
        : [...items, { id: product.id, name: product.name, price: product.price }],
    )
  }



  const submitBargain = async ({ productId, offer, message }) => {
    const product = productById[productId]
    const offerPrice = Number(offer)
    let result = { status: 'Rejected', counterOffer: null, message: 'Offer declined. The brand wants a stronger number.' }

    if (product?.bargainingEnabled) {
      if (offerPrice >= product.autoAcceptAt) {
        result = { status: 'Accepted', counterOffer: offerPrice, message: 'Offer accepted. Welcome to luxury mode.' }
      } else if (offerPrice >= product.minAcceptablePrice) {
        result = {
          status: 'Counter Offer',
          counterOffer: Math.max(product.minAcceptablePrice, Math.round((offerPrice + product.price * 0.9) / 2)),
          message: 'We can meet you halfway with a premium counter offer.',
        }
      }
    }

    const entry = {
      id: crypto.randomUUID(),
      productId,
      offer: offerPrice,
      userMessage: message,
      ...result,
      timestamp: new Date().toISOString(),
    }

    try {
      await axios.post(`${API_BASE_URL}/api/bargains`, entry)
    } catch {
      // backend is optional during UI work
    }

    setBargains((items) => [entry, ...items])
    return entry
  }

  return (
    <div className="app-shell text-white">
      <CursorGlow cursor={cursor} />
      <LoadingSplash visible={loading} />

      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        bargainCount={bargains.length}
        token={token}
        onLogout={() => setToken('')}
      />

      <Routes>
        <Route path="/" element={<HomePage catalog={catalog} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage catalog={catalog} wishlist={wishlist} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} />} />
        <Route path="/design" element={<Navigate to="/design/3d-models" replace />} />
        <Route path="/ai-suggestion" element={<AISuggestionPage catalog={catalog} onAddToCart={addToCart} />} />
        <Route path="/design/3d-models" element={<Design3DModelsPage catalog={catalog} onAddToCart={addToCart} />} />
        <Route path="/design/custom-models" element={<DesignCustomModelsPage />} />
        <Route path="/shop" element={<ShopPage catalog={catalog} wishlist={wishlist} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} onOpenBargain={setActiveBargain} />} />
        <Route path="/product/:slug" element={<ProductPage catalog={catalog} wishlist={wishlist} bargains={bargains} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} onOpenBargain={setActiveBargain} onSubmitBargain={submitBargain} />} />
        <Route path="/try-on" element={<TryOnPage catalog={catalog} onAddToCart={addToCart} />} />
        <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} onAddToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              catalog={catalog}
              onIncrease={increaseCartQuantity}
              onDecrease={decreaseCartQuantity}
              onRemove={removeFromCart}
              onClear={clearCart}
            />
          }
        />
        <Route path="/checkout" element={<CheckoutPage cart={cart} catalog={catalog} />} />
        <Route path="/signin" element={<LoginPage apiBaseUrl={API_BASE_URL} onAuthenticated={setToken} />} />
        <Route path="/signup" element={<SignupPage apiBaseUrl={API_BASE_URL} onAuthenticated={setToken} />} />
        <Route path="/auth" element={<Navigate to="/signin" replace />} />
        <Route path="/admin" element={<ProtectedRoute token={token}><AdminPanel /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <AnimatePresence>{activeBargain ? <BargainModal product={activeBargain} onClose={() => setActiveBargain(null)} onSubmit={submitBargain} /> : null}</AnimatePresence>
      <WhatsAppButton />
      <Footer />
    </div>
  )
}

function HomePage({ catalog, onAddToCart, onToggleWishlist }) {
  const heroRef = useRef(null)

  useLayoutEffect(() => {
    if (!heroRef.current) return undefined
    const ctx = gsap.context(() => {
      gsap.from('.hero-kicker', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' })
      gsap.from('.hero-title', { y: 40, opacity: 0, duration: 1, delay: 0.1, ease: 'power4.out' })
      gsap.from('.hero-copy', { y: 20, opacity: 0, duration: 0.9, delay: 0.2, ease: 'power3.out' })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <main className="container py-4 py-lg-5">
      <HeaderCarousel />
      
      <section className="hero-zone position-relative overflow-hidden rounded-5 p-4 p-lg-5 mb-4 mb-lg-5">
        <AuroraOrbs />
        <div className="row align-items-center g-4 position-relative" ref={heroRef}>
          <div className="col-lg-7">
            <motion.div className="hero-kicker d-inline-flex align-items-center gap-2 pill-glow mb-3" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <FiStar /> AI-powered fashion commerce
            </motion.div>
            <h1 className="hero-title display-3 fw-bold lh-1 mb-3">Futuristic luxury shopping for <span className="text-info">MMB&apos;s Wears</span>.</h1>
            <p className="hero-copy lead text-white-75 mb-4 pe-lg-4">A premium React storefront with animated bargaining, custom sizing, 3D try-on previews, secure admin tooling, and a cinematic brand presence.</p>
            <div className="d-flex flex-wrap gap-3">
              <Link className="btn btn-warning btn-lg fw-semibold px-4" to="/shop">Shop the drop <FiArrowRight className="ms-2" /></Link>
              <Link className="btn btn-outline-light btn-lg px-4" to="/try-on">Open 3D studio</Link>
            </div>
            <div className="d-flex flex-wrap gap-3 mt-4">
              <HeroStat value="12K+" label="weekly visits" />
              <HeroStat value="4.9/5" label="luxury rating" />
              <HeroStat value="AI" label="bargain engine" />
            </div>
          </div>
          <div className="col-lg-5">
            <motion.div whileHover={{ rotateY: -8, rotateX: 5, scale: 1.02 }} className="glass-panel rounded-5 p-3 p-lg-4 hero-card">
              <div className="video-banner rounded-4 overflow-hidden position-relative mb-3">
                <div className="video-caption">
                  <FiPlay className="fs-1 mb-2" />
                  <h3 className="h5 mb-1">Auto-playing fashion motion banner</h3>
                  <p className="mb-0 text-white-75">A cinematic banner ready for your brand video.</p>
                </div>
              </div>
              <LuxLookCanvas />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="row g-4 mb-4 mb-lg-5">
        <SectionHeading eyebrow="Trending collections" title="AI-curated drops with neon energy" copy="Premium looks, limited drops, and flash-sale highlights built to feel like a luxury launch." />
        {catalog.slice(0, 3).map((product) => (
          <div className="col-md-4" key={product.id}>
            <ProductCard product={product} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} />
          </div>
        ))}
      </section>

      <section className="row g-4 mb-4 mb-lg-5 align-items-stretch">
        <div className="col-lg-7">
          <SectionHeading eyebrow="AI recommended products" title="A premium recommendation engine" copy="The store highlights best-match items based on category, trend, and fit intent." />
          <div className="row g-3">
            {catalog.slice(3).map((product) => (
              <div className="col-md-6" key={product.id}>
                <MiniProductCard product={product} onAddToCart={onAddToCart} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-5">
          <div className="glass-panel rounded-5 p-4 h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 className="h4 fw-bold mb-0">Luxury experience stack</h2>
              <span className="badge text-bg-success">Live</span>
            </div>
            <div className="stacked-features">
              {['Glassmorphism + glow surfaces', 'Framer Motion + GSAP choreography', '3D try-on using React Three Fiber', 'Local cart + wishlist persistence', 'Protected admin + bargain history'].map((item) => (
                <div className="stacked-item" key={item}>
                  <FiTrendingUp className="text-info" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-4 bg-dark bg-opacity-50 border border-white border-opacity-10">
              <div className="text-white-50 small mb-2">Instagram feed integration</div>
              <div className="instagram-grid">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div className="instagram-tile" key={index}>
                    <FiCamera />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="row g-4 mb-4 mb-lg-5">
        <SectionHeading eyebrow="Customer reviews" title="Social proof with motion" copy="A polished review strip to echo the premium experience across the store." />
        {reviews.map((review) => (
          <div className="col-md-6 col-lg-3" key={review.name}>
            <motion.div whileHover={{ y: -8 }} className="glass-panel rounded-4 p-4 review-card h-100">
              <div className="d-flex align-items-center gap-2 mb-3 text-warning">
                {Array.from({ length: review.stars }).map((_, index) => (
                  <FiStar key={index} />
                ))}
              </div>
              <p className="mb-3 text-white-75">“{review.text}”</p>
              <div className="fw-semibold">{review.name}</div>
            </motion.div>
          </div>
        ))}
      </section>
    </main>
  )
}

function ShopPage({ catalog, wishlist, onAddToCart, onToggleWishlist, onOpenBargain }) {
  const navigate = useNavigate()
  return (
    <main className="container py-4 py-lg-5">
      <SectionHeading eyebrow="Shop" title="Explore futuristic fashion pieces" copy="Quick view, add to cart, wishlist, bargain, and jump into the product page." />
      <div className="row g-4">
        {catalog.map((product) => (
          <div className="col-md-6 col-xl-4" key={product.id}>
            <ProductCard
              product={product}
              isWishlisted={wishlist.some((item) => item.id === product.id)}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onOpenBargain={onOpenBargain}
              onNavigate={() => navigate(`/product/${product.id}`)}
            />
          </div>
        ))}
      </div>
    </main>
  )
}

function ProductPage({ catalog, wishlist, bargains, onAddToCart, onToggleWishlist, onOpenBargain, onSubmitBargain }) {
  const { slug } = useParams()
  const product = catalog.find((item) => item.id === slug)
  const [offer, setOffer] = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOffer('')
      setResult(null)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [slug])

  if (!product) return <Navigate to="/shop" replace />

  return (
    <main className="container py-4 py-lg-5">
      <div className="row g-4 align-items-stretch">
        <div className="col-lg-6">
          <motion.div whileHover={{ scale: 1.01 }} className="glass-panel rounded-5 p-3 p-lg-4 h-100">
            <div className="product-gallery mb-3">
              {product.palette.map((color, index) => (
                <div className="gallery-tile" key={color} style={{ background: color, animationDelay: `${index * 120}ms` }} />
              ))}
            </div>
            <div className="rounded-4 overflow-hidden video-banner mb-3">
              <div className="video-caption">
                <FiPlay className="fs-1 mb-2" />
                <h2 className="h5 mb-1">Product motion reel</h2>
                <p className="text-white-75 mb-0">Replace this with a real fashion video from your media library.</p>
              </div>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {product.palette.map((color) => (
                <span className="palette-chip" key={color} style={{ background: color }} />
              ))}
            </div>
          </motion.div>
        </div>
        <div className="col-lg-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-5 p-4 p-lg-5 h-100">
            <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
              <div>
                <span className="badge text-bg-info text-dark mb-2">{product.badge}</span>
                <h1 className="display-6 fw-bold mb-2">{product.name}</h1>
                <p className="text-white-75 mb-0">{product.summary}</p>
              </div>
              <div className="text-end">
                <div className="fs-3 fw-bold text-warning">${product.price}</div>
                <div className="text-white-50 small">Minimum bargain: ${product.minAcceptablePrice}</div>
              </div>
            </div>
            <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
              <span className="badge rounded-pill text-bg-dark border border-white border-opacity-10">{product.category}</span>
              <span className="text-warning d-inline-flex align-items-center gap-1"><FiStar /> {product.rating} • {product.reviews} reviews</span>
              <span className="badge rounded-pill text-bg-success">{product.aiTag}</span>
            </div>
            <div className="d-flex flex-wrap gap-3 mb-4">
              <button type="button" className="btn btn-warning fw-semibold" onClick={() => onAddToCart(product)}><FiShoppingBag className="me-2" />Add to cart</button>
              <button type="button" className="btn btn-outline-light" onClick={() => onToggleWishlist(product)}><FiHeart className="me-2" />Wishlist</button>
              <button type="button" className="btn btn-outline-info" onClick={() => onOpenBargain(product)}><FiMessageCircle className="me-2" />Negotiate Price</button>
            </div>
            <div className="grid-two mb-4">
              {[
                { label: 'Bargain status', value: product.bargainingEnabled ? 'Enabled' : 'Disabled' },
                { label: 'Auto-accept at', value: `$${product.autoAcceptAt}` },
                { label: 'Wishlist flag', value: wishlist.some((item) => item.id === product.id) ? 'Saved' : 'Not saved' },
                { label: 'Luxury fit', value: 'Custom sizing ready' },
              ].map((item) => (
                <div className="info-chip" key={item.label}>
                  <span className="text-white-50 small">{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
            <div className="bargain-panel mb-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h2 className="h5 mb-0">AI bargaining system</h2>
                <span className="badge text-bg-dark">Live chat</span>
              </div>
              <div className="bargain-chat mb-3">
                <div className="chat-bubble system">Hello! Please make your best offer.</div>
                {result ? (
                  <div className={`chat-bubble ${result.status === 'Accepted' ? 'accepted' : result.status === 'Counter Offer' ? 'counter' : 'rejected'}`}>
                    <strong>{result.status}:</strong> {result.message}
                    {result.counterOffer ? <div className="mt-1">Counter offer: ${result.counterOffer}</div> : null}
                  </div>
                ) : null}
              </div>
              <div className="d-flex flex-wrap gap-2 align-items-end">
                <div className="grow">
                  <label className="form-label text-white-50 small">Your offer</label>
                  <input
                    className="form-control form-control-lg bg-dark text-white border-white border-opacity-10"
                    type="number"
                    value={offer}
                    onChange={(event) => setOffer(event.target.value)}
                    placeholder="Enter offer price"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-info btn-lg fw-semibold"
                  onClick={async () => setResult(await onSubmitBargain({ productId: product.id, offer, message: `I offer $${offer}` }))}
                >
                  <FiMessageCircle className="me-2" />Send offer
                </button>
              </div>
            </div>
            <div className="review-strip">
              <div className="text-white-50 small mb-2">Recent bargain history</div>
              <div className="history-list">
                {bargains.filter((item) => item.productId === product.id).length === 0 ? (
                  <div className="text-white-50">Open the bargain popup or use the shop grid to start negotiating.</div>
                ) : (
                  bargains
                    .filter((item) => item.productId === product.id)
                    .slice(0, 3)
                    .map((item) => (
                      <div className="history-item" key={item.id}>
                        <div className="d-flex justify-content-between gap-3">
                          <strong>{item.status}</strong>
                          <span className="text-warning">${item.offer}</span>
                        </div>
                        <small className="text-white-50">{new Date(item.timestamp).toLocaleString()}</small>
                      </div>
                    ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="row g-4 mt-4 mt-lg-5 align-items-stretch">
        <div className="col-lg-7">
          <SectionHeading eyebrow="Luxury sizing" title="Custom fit intelligence built into the experience" copy="Upload measurements, reference images, and create a personal fitting profile." />
          <SizeProfileCard />
        </div>
        <div className="col-lg-5">
          <SectionHeading eyebrow="Customer proof" title="Reviews, zoom, and immersive product details" copy="Everything needed for a high-conversion fashion product page." />
          <div className="glass-panel rounded-4 p-4 h-100">
            {reviews.map((review) => (
              <div className="mini-review mb-3" key={review.name}>
                <div className="d-flex align-items-center gap-2 text-warning mb-1">
                  {Array.from({ length: review.stars }).map((_, index) => <FiStar key={index} />)}
                </div>
                <p className="mb-1">{review.text}</p>
                <small className="text-white-50">— {review.name}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

function TryOnPage({ catalog, onAddToCart }) {
  const [bodyType, setBodyType] = useState('Athletic')
  const [measurements, setMeasurements] = useState({ height: 178, weight: 74, chest: 98, waist: 82, shoulders: 48 })
  const [productId, setProductId] = useState(catalog[0]?.id || '')
  const [profileName, setProfileName] = useState('My luxury fit profile')
  const product = catalog.find((item) => item.id === productId) ?? catalog[0]
  const recommendedSize = useMemo(() => (measurements.weight < 68 ? 'S' : measurements.weight < 82 ? 'M' : measurements.weight < 95 ? 'L' : 'XL'), [measurements.weight])

  return (
    <main className="container py-4 py-lg-5">
      <SectionHeading eyebrow="3D try-on" title="Build a futuristic fitting studio" copy="Choose a body type, enter measurements, and preview the avatar in multiple angles." />
      <div className="row g-4">
        <div className="col-lg-5">
          <div className="glass-panel rounded-5 p-4 h-100">
            <label className="form-label text-white-50 small">Body type</label>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {bodyTypes.map((option) => (
                <button key={option} type="button" className={`btn ${bodyType === option ? 'btn-warning' : 'btn-outline-light'} rounded-pill`} onClick={() => setBodyType(option)}>
                  {option}
                </button>
              ))}
            </div>
            <div className="row g-3 mb-4">
              {[
                ['height', 'Height (cm)'],
                ['weight', 'Weight (kg)'],
                ['chest', 'Chest (cm)'],
                ['waist', 'Waist (cm)'],
                ['shoulders', 'Shoulder (cm)'],
              ].map(([field, label]) => (
                <div className="col-sm-6" key={field}>
                  <label className="form-label text-white-50 small">{label}</label>
                  <input
                    className="form-control bg-dark text-white border-white border-opacity-10"
                    type="number"
                    value={measurements[field]}
                    onChange={(event) => setMeasurements((current) => ({ ...current, [field]: Number(event.target.value) }))}
                  />
                </div>
              ))}
            </div>
            <div className="d-flex flex-wrap gap-3 mb-4">
              <div className="fit-chip"><span>Recommended size</span><strong>{recommendedSize}</strong></div>
              <div className="fit-chip"><span>Profile</span><strong>{profileName}</strong></div>
            </div>
            <div className="d-flex flex-wrap gap-3 mb-4">
              <label className="btn btn-outline-info d-inline-flex align-items-center gap-2"><FiUploadCloud /> Upload measurements<input type="file" hidden /></label>
              <label className="btn btn-outline-light d-inline-flex align-items-center gap-2"><FiCamera /> Upload reference image<input type="file" hidden /></label>
            </div>
            <div className="form-floating mb-3">
              <input className="form-control bg-dark text-white border-white border-opacity-10" id="profile-name" value={profileName} onChange={(event) => setProfileName(event.target.value)} />
              <label htmlFor="profile-name">Profile name</label>
            </div>
            <button type="button" className="btn btn-warning fw-semibold" onClick={() => onAddToCart(product)}>Save profile & add recommended look</button>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="row g-3 h-100">
            {[
              { label: 'Front view', rotation: [0, 0, 0] },
              { label: 'Side view', rotation: [0, Math.PI / 2, 0] },
              { label: 'Back view', rotation: [0, Math.PI, 0] },
            ].map((view) => (
              <div className="col-md-4" key={view.label}>
                <motion.div whileHover={{ y: -6 }} className="glass-panel rounded-4 p-3 h-100">
                  <div className="text-white-50 small mb-2">{view.label}</div>
                  <div className="tryon-canvas-wrap">
                    <AvatarCanvas bodyType={bodyType} measurements={measurements} rotation={view.rotation} product={product} />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          <div className="glass-panel rounded-5 p-4 mt-3">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
              <div>
                <div className="text-white-50 small">Product match</div>
                <h2 className="h4 fw-bold mb-0">{product.name}</h2>
              </div>
              <select className="form-select bg-dark text-white border-white border-opacity-10 w-auto" value={productId} onChange={(event) => setProductId(event.target.value)}>
                {catalog.map((entry) => <option value={entry.id} key={entry.id}>{entry.name}</option>)}
              </select>
            </div>
            <div className="text-white-75 mb-0">The avatar reacts to your measurements in real time, giving a polished preview before purchase.</div>
          </div>
        </div>
      </div>
    </main>
  )
}

function WishlistPage({ wishlist, onAddToCart }) {
  return (
    <main className="container py-4 py-lg-5">
      <SectionHeading eyebrow="Wishlist" title="Saved pieces" copy="Your wishlist is kept in local storage so it persists between visits." />
      <div className="row g-4">
        {wishlist.length === 0 ? (
          <div className="col-12">
            <div className="glass-panel rounded-4 p-4 text-center text-white-50">No wishlist items yet — add some futuristic pieces from the shop.</div>
          </div>
        ) : (
          wishlist.map((product) => (
            <div className="col-md-6 col-xl-4" key={product.id}>
              <motion.div whileHover={{ y: -8 }} className="glass-panel rounded-4 p-4">
                <h3 className="h5 fw-bold">{product.name}</h3>
                <p className="text-white-50">${product.price}</p>
                <button type="button" className="btn btn-warning btn-sm" onClick={() => onAddToCart(product)}>Add to cart</button>
              </motion.div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}

function CheckoutPage({ cart, catalog }) {
  const items = cart.map((item) => ({ ...item, product: catalog.find((entry) => entry.id === item.id) }))
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <main className="container py-4 py-lg-5">
      <SectionHeading eyebrow="Checkout" title="Secure, smooth, and premium" copy="A secure checkout scaffold with order tracking and future payment integration ready for expansion." />
      <div className="row g-4">
        <div className="col-lg-7">
          <div className="glass-panel rounded-4 p-4">
            <h2 className="h5 fw-bold mb-3">Customer details</h2>
            <div className="row g-3">
              <div className="col-md-6"><input className="form-control bg-dark text-white border-white border-opacity-10" placeholder="Full name" /></div>
              <div className="col-md-6"><input className="form-control bg-dark text-white border-white border-opacity-10" placeholder="Email address" /></div>
              <div className="col-12"><input className="form-control bg-dark text-white border-white border-opacity-10" placeholder="Shipping address" /></div>
            </div>
            <div className="mt-3 text-white-50">Protected routes, validation, and payment integrations can plug in here.</div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="glass-panel rounded-4 p-4">
            <h2 className="h5 fw-bold mb-3">Order summary</h2>
            {items.map((item) => <div className="cart-row" key={item.id}><div>{item.name}</div><div>${item.price * item.quantity}</div></div>)}
            <hr className="border-white border-opacity-10" />
            <div className="d-flex justify-content-between fw-bold"><span>Total</span><span>${total}</span></div>
          </div>
        </div>
      </div>
    </main>
  )
}

function ProtectedRoute({ token, children }) {
  if (!token) return <Navigate to="/signin" replace />
  return children
}

function BargainModal({ product, onClose, onSubmit }) {
  const [offer, setOffer] = useState('')
  const [message, setMessage] = useState('I love this piece, can you work with me on the price?')
  const [lastResult, setLastResult] = useState(null)

  return (
    <motion.div className="modal-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="modal-card glass-panel rounded-5 p-4 p-lg-5" initial={{ y: 40, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0, scale: 0.95 }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <div className="text-white-50 small">AI bargain popup</div>
            <h2 className="h4 fw-bold mb-0">Negotiate {product.name}</h2>
          </div>
          <button type="button" className="btn btn-outline-light btn-sm" onClick={onClose}>Close</button>
        </div>
        <div className="bargain-chat popup mb-3">
          <div className="chat-bubble system">Typing... thinking like a premium assistant.</div>
          {lastResult ? <div className={`chat-bubble ${lastResult.status === 'Accepted' ? 'accepted' : lastResult.status === 'Counter Offer' ? 'counter' : 'rejected'}`}><strong>{lastResult.status}</strong> — {lastResult.message}</div> : null}
        </div>
        <div className="row g-3">
          <div className="col-md-4"><label className="form-label text-white-50 small">Your offer</label><input className="form-control bg-dark text-white border-white border-opacity-10" type="number" value={offer} onChange={(event) => setOffer(event.target.value)} /></div>
          <div className="col-md-8"><label className="form-label text-white-50 small">Message</label><input className="form-control bg-dark text-white border-white border-opacity-10" value={message} onChange={(event) => setMessage(event.target.value)} /></div>
        </div>
        <div className="d-flex flex-wrap gap-3 mt-4">
          <button type="button" className="btn btn-info fw-semibold" onClick={async () => setLastResult(await onSubmit({ productId: product.id, offer, message }))}>Send bargain</button>
          <div className="text-white-50 align-self-center small">Minimum accepted: ${product.minAcceptablePrice}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <motion.div className="col-12 mb-2 mb-lg-3" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="text-info text-uppercase small fw-semibold letter-space mb-2">{eyebrow}</div>
      <h2 className="display-6 fw-bold mb-2">{title}</h2>
      <p className="text-white-75 mb-0 col-lg-9">{copy}</p>
    </motion.div>
  )
}

function HeroStat({ value, label }) {
  return (
    <div className="glass-panel stat-chip rounded-4 px-3 py-3">
      <div className="fw-bold fs-4">{value}</div>
      <div className="text-white-50 small">{label}</div>
    </div>
  )
}

function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted = false, onOpenBargain, onNavigate }) {
  return (
    <motion.div whileHover={{ y: -10 }} className="glass-panel rounded-4 p-3 h-100 product-card">
      <div className="product-media mb-3" style={{ background: product.gradient }}>
        <div className="product-media-overlay">
          <div className="badge text-bg-dark border border-white border-opacity-10 mb-2">{product.badge}</div>
          <div className="badge text-bg-info text-dark">{product.aiTag}</div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
        <div>
          <h3 className="h5 fw-bold mb-1">{product.name}</h3>
          <div className="text-white-50 small">{product.category}</div>
        </div>
        <div className="text-end">
          <div className="text-warning fw-bold">${product.price}</div>
          <small className="text-white-50">Min ${product.minAcceptablePrice}</small>
        </div>
      </div>
      <p className="text-white-75 small mb-3">{product.summary}</p>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-warning small d-inline-flex align-items-center gap-1"><FiStar /> {product.rating}</span>
        <span className="text-white-50 small">{product.reviews} reviews</span>
      </div>
      <div className="d-flex flex-wrap gap-2">
        <button type="button" className="btn btn-warning btn-sm fw-semibold" onClick={() => onAddToCart(product)}><FiShoppingBag className="me-1" />Add</button>
        <button type="button" className="btn btn-outline-light btn-sm" onClick={() => onToggleWishlist(product)}>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</button>
        {onOpenBargain ? <button type="button" className="btn btn-outline-info btn-sm" onClick={() => onOpenBargain(product)}>Negotiate</button> : null}
        {onNavigate ? <button type="button" className="btn btn-outline-success btn-sm" onClick={onNavigate}>Quick view</button> : null}
      </div>
    </motion.div>
  )
}

function MiniProductCard({ product, onAddToCart }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="glass-panel rounded-4 p-3 mini-product-card">
      <div className="d-flex justify-content-between gap-3 mb-2"><strong>{product.name}</strong><span className="text-warning">${product.price}</span></div>
      <div className="text-white-50 small mb-3">{product.summary}</div>
      <div className="d-flex gap-2">
        <button type="button" className="btn btn-outline-light btn-sm" onClick={() => onAddToCart(product)}><FiShoppingBag className="me-1" />Add</button>
        <Link className="btn btn-outline-info btn-sm" to={`/product/${product.id}`}>Explore</Link>
      </div>
    </motion.div>
  )
}

function SizeProfileCard() {
  return (
    <div className="glass-panel rounded-4 p-4 h-100">
      <div className="row g-3 align-items-stretch">
        <div className="col-md-6">
          <div className="fit-upload-box h-100">
            <FiUploadCloud className="fs-2 text-info mb-2" />
            <div className="fw-semibold mb-1">Upload measurements</div>
            <div className="text-white-50 small">Saved to the custom fitting profile.</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="fit-upload-box h-100">
            <FiCamera className="fs-2 text-warning mb-2" />
            <div className="fw-semibold mb-1">Reference image</div>
            <div className="text-white-50 small">Use for AI size recommendation.</div>
          </div>
        </div>
      </div>
      <div className="mt-3 p-3 rounded-4 bg-dark bg-opacity-50 border border-white border-opacity-10 d-flex justify-content-between align-items-center">
        <div>
          <div className="text-white-50 small">AI size recommendation</div>
          <strong>Recommended size: M / Custom Stitch</strong>
        </div>
        <FiRefreshCw className="fs-4 text-info" />
      </div>
    </div>
  )
}

function AvatarCanvas({ bodyType, measurements, rotation, product }) {
  const scale = useMemo(() => ({ Slim: 0.88, Athletic: 1, Oversized: 1.14, Custom: 1 + (measurements.weight - 70) / 250 }[bodyType]), [bodyType, measurements.weight])
  const chestScale = Math.max(0.82, 1 + (measurements.chest - 96) / 300)
  const waistScale = Math.max(0.78, 1 + (measurements.waist - 80) / 340)

  return (
    <Canvas camera={{ position: [0, 1.8, 4.5], fov: 42 }} className="avatar-canvas">
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 4, 3]} intensity={2.2} color="#ffffff" />
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.55}>
        <group rotation={rotation} scale={[scale, chestScale, waistScale]}>
          <mesh position={[0, 0.6, 0]}><sphereGeometry args={[0.4, 32, 32]} /><meshStandardMaterial color="#e2e8f0" roughness={0.35} metalness={0.08} /></mesh>
          <mesh position={[0, -0.15, 0]}><boxGeometry args={[1.1, 1.5, 0.55]} /><meshStandardMaterial color={product.gradient.includes('38bdf8') ? '#38bdf8' : '#94a3b8'} roughness={0.28} metalness={0.2} /></mesh>
          <mesh position={[-0.58, -0.15, 0]}><cylinderGeometry args={[0.12, 0.12, 1.3, 20]} /><meshStandardMaterial color="#0f172a" roughness={0.5} /></mesh>
          <mesh position={[0.58, -0.15, 0]}><cylinderGeometry args={[0.12, 0.12, 1.3, 20]} /><meshStandardMaterial color="#0f172a" roughness={0.5} /></mesh>
          <mesh position={[-0.22, -1.3, 0]}><cylinderGeometry args={[0.14, 0.14, 1.2, 20]} /><meshStandardMaterial color="#1e293b" roughness={0.52} /></mesh>
          <mesh position={[0.22, -1.3, 0]}><cylinderGeometry args={[0.14, 0.14, 1.2, 20]} /><meshStandardMaterial color="#1e293b" roughness={0.52} /></mesh>
        </group>
      </Float>
      <ContactShadows opacity={0.5} blur={2.4} scale={8} far={4} />
      <Environment preset="city" />
      <OrbitControls enablePan={false} enableZoom />
    </Canvas>
  )
}

function LuxLookCanvas() {
  return (
    <div className="lux-canvas-wrap">
      <Canvas camera={{ position: [0, 0.8, 4], fov: 35 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 4, 4]} intensity={2} color="#ffffff" />
        <Float speed={2} rotationIntensity={1.2} floatIntensity={0.75}>
          <group>
            <mesh rotation={[0.2, 0.7, 0]}><torusKnotGeometry args={[0.9, 0.28, 120, 16]} /><meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.85} /></mesh>
            <mesh position={[-1.8, -0.3, 0.8]}><boxGeometry args={[0.6, 0.6, 0.6]} /><meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.8} /></mesh>
          </group>
        </Float>
        <ContactShadows opacity={0.35} blur={1.8} scale={8} far={4} />
        <Environment preset="dawn" />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.4} />
      </Canvas>
    </div>
  )
}

function AuroraOrbs() {
  return (
    <div className="aurora-layer" aria-hidden="true">
      <motion.div className="aurora-orb orb-one" animate={{ y: [0, -14, 0], x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }} />
      <motion.div className="aurora-orb orb-two" animate={{ y: [0, 12, 0], x: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }} />
      <motion.div className="aurora-orb orb-three" animate={{ y: [0, -8, 0], x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }} />
    </div>
  )
}

function CursorGlow({ cursor }) {
  return <motion.div className="cursor-glow" animate={{ left: cursor.x, top: cursor.y }} transition={{ type: 'spring', stiffness: 120, damping: 24 }} />
}

function LoadingSplash({ visible }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div className="splash-screen" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, pointerEvents: 'none' }}>
          <motion.div className="splash-card glass-panel" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="brand-mark mx-auto mb-3">M</div>
            <div className="text-uppercase small text-white-50 letter-space">Launching luxury experience</div>
            <div className="progress mt-3 splash-progress">
              <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" style={{ width: '100%' }} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function WhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href="https://wa.me/10000000000?text=Hello%20MMB%E2%80%99s%20Wears,%20I%20want%20to%20inquire%20about%20your%20products."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
      <span>WhatsApp</span>
    </a>
  )
}

export default App
