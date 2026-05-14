import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'
const JWT_SECRET = process.env.JWT_SECRET || 'replace-this-secret'
const upload = multer({ storage: multer.memoryStorage() })

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

mongoose.set('strictQuery', true)

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('dev'))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 250 }))

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, unique: true, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    savedSizeProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SizeProfile' }],
  },
  { timestamps: true },
)

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, required: true, lowercase: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    minAcceptablePrice: { type: Number, default: 0 },
    autoAcceptAt: { type: Number, default: 0 },
    bargainingEnabled: { type: Boolean, default: true },
    images: [{ type: String }],
    videos: [{ type: String }],
    model3DUrl: { type: String, default: '' },
    badges: [{ type: String }],
    colors: [{ type: String }],
    sizes: [{ type: String }],
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 4.8 },
    reviewsCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    flashSale: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const bargainSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    buyerName: { type: String, default: 'Guest' },
    buyerEmail: { type: String, default: '' },
    offer: { type: Number, required: true },
    status: { type: String, enum: ['Accepted', 'Rejected', 'Counter Offer', 'Pending'], default: 'Pending' },
    counterOffer: { type: Number, default: null },
    userMessage: { type: String, default: '' },
    adminNote: { type: String, default: '' },
    autoAccepted: { type: Boolean, default: false },
    history: [{ role: String, message: String, createdAt: { type: Date, default: Date.now } }],
  },
  { timestamps: true },
)

const sizeProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    profileName: { type: String, required: true },
    bodyType: { type: String, enum: ['Slim', 'Athletic', 'Oversized', 'Custom'], default: 'Athletic' },
    height: Number,
    weight: Number,
    chest: Number,
    waist: Number,
    shoulders: Number,
    referenceImageUrl: { type: String, default: '' },
    measurementsFileUrl: { type: String, default: '' },
    recommendedSize: { type: String, default: 'M' },
    stitchingNotes: { type: String, default: '' },
  },
  { timestamps: true },
)

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    customer: {
      name: String,
      email: String,
      phone: String,
      address: String,
    },
    total: Number,
    status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    trackingCode: { type: String, default: '' },
  },
  { timestamps: true },
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
const Product = mongoose.models.Product || mongoose.model('Product', productSchema)
const Bargain = mongoose.models.Bargain || mongoose.model('Bargain', bargainSchema)
const SizeProfile = mongoose.models.SizeProfile || mongoose.model('SizeProfile', sizeProfileSchema)
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)

const protect = async (req, res, next) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized' })
  }

  try {
    const token = header.slice(7)
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    if (!user) return res.status(401).json({ message: 'Not authorized' })
    req.user = user
    next()
  } catch {
    return res.status(401).json({ message: 'Token expired or invalid' })
  }
}

const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin access required' })
  next()
}

const seedProducts = [
  {
    slug: 'aurora-alpha-jacket',
    name: 'Aurora Alpha Jacket',
    category: 'Outerwear',
    description: 'A sharp futuristic jacket with reflective trims and premium comfort.',
    price: 249,
    minAcceptablePrice: 189,
    autoAcceptAt: 219,
    bargainingEnabled: true,
    images: ['https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80'],
    videos: [],
    badges: ['Limited Drop'],
    colors: ['#0f172a', '#38bdf8', '#a855f7'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 18,
    rating: 4.9,
    reviewsCount: 128,
    featured: true,
    flashSale: false,
  },
  {
    slug: 'stellar-core-hoodie',
    name: 'Stellar Core Hoodie',
    category: 'Streetwear',
    description: 'Luxury fleece hoodie designed for modern athletic silhouettes.',
    price: 149,
    minAcceptablePrice: 109,
    autoAcceptAt: 129,
    bargainingEnabled: true,
    images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80'],
    videos: [],
    badges: ['Flash Sale'],
    colors: ['#0f172a', '#22c55e', '#e2e8f0'],
    sizes: ['S', 'M', 'L'],
    stock: 36,
    rating: 4.8,
    reviewsCount: 211,
    featured: true,
    flashSale: true,
  },
  {
    slug: 'nova-edge-joggers',
    name: 'Nova Edge Joggers',
    category: 'Bottoms',
    description: 'Tailored tech joggers with a slim futuristic cut.',
    price: 119,
    minAcceptablePrice: 89,
    autoAcceptAt: 99,
    bargainingEnabled: true,
    images: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80'],
    videos: [],
    badges: ['New Arrival'],
    colors: ['#0f172a', '#f59e0b', '#fde68a'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 22,
    rating: 4.7,
    reviewsCount: 96,
    featured: false,
    flashSale: false,
  },
]

const authRoutes = express.Router()
authRoutes.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ message: 'User already exists' })

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed, role: role === 'admin' ? 'admin' : 'customer' })
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })
    return res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (error) {
    next(error)
  }
})

authRoutes.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })

    const user = await User.findOne({ email }).select('+password')
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })
    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (error) {
    next(error)
  }
})

authRoutes.get('/me', protect, async (req, res) => {
  return res.json({ user: req.user })
})

const productRoutes = express.Router()
productRoutes.get('/', async (_req, res, next) => {
  try {
    const products = await Product.find().sort({ featured: -1, createdAt: -1 })
    res.json({ products })
  } catch (error) {
    next(error)
  }
})

productRoutes.get('/:slug', async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ product })
  } catch (error) {
    next(error)
  }
})

productRoutes.post('/', protect, adminOnly, async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json({ product })
  } catch (error) {
    next(error)
  }
})

productRoutes.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ product })
  } catch (error) {
    next(error)
  }
})

productRoutes.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product removed' })
  } catch (error) {
    next(error)
  }
})

productRoutes.post('/upload', protect, adminOnly, upload.single('file'), async (req, res) => {
  const fileInfo = req.file
    ? {
        filename: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
      }
    : null

  res.status(201).json({
    message: 'Upload scaffold ready for Cloudinary integration',
    file: fileInfo,
  })
})

const bargainRoutes = express.Router()
bargainRoutes.get('/', protect, adminOnly, async (_req, res, next) => {
  try {
    const bargains = await Bargain.find().populate('productId').sort({ createdAt: -1 })
    res.json({ bargains })
  } catch (error) {
    next(error)
  }
})

bargainRoutes.post('/', async (req, res, next) => {
  try {
    const { productId, offer, userMessage, buyerName, buyerEmail } = req.body
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: 'Product not found' })

    let status = 'Rejected'
    let counterOffer = null
    let autoAccepted = false
    let adminNote = 'Offer is below the minimum acceptable threshold.'

    if (!product.bargainingEnabled) {
      adminNote = 'Bargaining is currently disabled for this product.'
    } else if (Number(offer) >= product.autoAcceptAt) {
      status = 'Accepted'
      autoAccepted = true
      counterOffer = Number(offer)
      adminNote = 'Offer auto-accepted based on admin policy.'
    } else if (Number(offer) >= product.minAcceptablePrice) {
      status = 'Counter Offer'
      counterOffer = Math.max(product.minAcceptablePrice, Math.round((Number(offer) + product.price * 0.9) / 2))
      adminNote = 'AI style counter offer generated.'
    }

    const bargain = await Bargain.create({
      productId,
      offer,
      buyerName,
      buyerEmail,
      userMessage,
      status,
      counterOffer,
      autoAccepted,
      adminNote,
      history: [
        { role: 'buyer', message: userMessage || `Offer: ${offer}` },
        { role: 'admin', message: adminNote },
      ],
    })

    res.status(201).json({ bargain })
  } catch (error) {
    next(error)
  }
})

bargainRoutes.patch('/:id/respond', protect, adminOnly, async (req, res, next) => {
  try {
    const { status, counterOffer, adminNote } = req.body
    const bargain = await Bargain.findByIdAndUpdate(
      req.params.id,
      {
        status,
        counterOffer,
        adminNote,
        $push: { history: { role: 'admin', message: adminNote || 'Updated by admin' } },
      },
      { new: true },
    )
    if (!bargain) return res.status(404).json({ message: 'Bargain not found' })
    res.json({ bargain })
  } catch (error) {
    next(error)
  }
})

const sizeRoutes = express.Router()
sizeRoutes.get('/', protect, async (req, res, next) => {
  try {
    const profiles = await SizeProfile.find({ userId: req.user._id }).sort({ createdAt: -1 })
    res.json({ profiles })
  } catch (error) {
    next(error)
  }
})

sizeRoutes.post('/', protect, async (req, res, next) => {
  try {
    const profile = await SizeProfile.create({ ...req.body, userId: req.user._id })
    res.status(201).json({ profile })
  } catch (error) {
    next(error)
  }
})

sizeRoutes.get('/admin/all', protect, adminOnly, async (_req, res, next) => {
  try {
    const profiles = await SizeProfile.find().populate('userId', 'name email').sort({ createdAt: -1 })
    res.json({ profiles })
  } catch (error) {
    next(error)
  }
})

const orderRoutes = express.Router()
orderRoutes.post('/', protect, async (req, res, next) => {
  try {
    const order = await Order.create({ ...req.body, userId: req.user._id })
    res.status(201).json({ order })
  } catch (error) {
    next(error)
  }
})

orderRoutes.get('/', protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 })
    res.json({ orders })
  } catch (error) {
    next(error)
  }
})

orderRoutes.get('/admin/all', protect, adminOnly, async (_req, res, next) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 })
    res.json({ orders })
  } catch (error) {
    next(error)
  }
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', brand: 'MMB\'s Wears API', timestamp: new Date().toISOString() })
})

app.get('/api/admin/dashboard', protect, adminOnly, async (_req, res, next) => {
  try {
    const [products, bargains, profiles, orders] = await Promise.all([
      Product.countDocuments(),
      Bargain.countDocuments(),
      SizeProfile.countDocuments(),
      Order.countDocuments(),
    ])
    res.json({ products, bargains, profiles, orders })
  } catch (error) {
    next(error)
  }
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/bargains', bargainRoutes)
app.use('/api/sizes', sizeRoutes)
app.use('/api/orders', orderRoutes)

app.use((err, _req, res, next) => {
  void next
  console.error(err)
  res.status(500).json({ message: err.message || 'Server error' })
})

async function seed() {
  const hasProducts = await Product.exists()
  if (hasProducts) return
  await Product.insertMany(seedProducts)
}

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI)
      await seed()
      console.log('MongoDB connected')
    } catch (error) {
      console.warn('MongoDB connection skipped for local scaffolding:', error.message)
    }
  } else {
    console.warn('MONGODB_URI not set. Running API scaffold without database connection.')
  }

  app.listen(PORT, () => {
    console.log(`MMB's Wears API running on http://localhost:${PORT}`)
  })
}

start()
