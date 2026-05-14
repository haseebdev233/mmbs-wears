import { Link } from 'react-router-dom'
import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
  FiShoppingBag,
  FiHeart,
  FiMessageCircle,
} from 'react-icons/fi'
import './Footer.css'

const footerLinks = {
  Shop: [
    { label: 'New Arrivals', to: '/new-arrivals' },
    { label: "Men's Collection", to: '/shop/mens' },
    { label: "Women's Collection", to: '/shop/womens' },
    { label: 'Accessories', to: '/shop/accessories' },
    { label: 'Sale', to: '/shop/sale' },
  ],
  Design: [
    { label: '3D Models', to: '/design/3d-models' },
    { label: 'Custom Models', to: '/design/custom-models' },
    { label: '3D Try-On', to: '/try-on' },
    { label: 'Style AI', to: '/style-ai' },
  ],
  Support: [
    { label: 'FAQ', to: '/faq' },
    { label: 'Shipping & Returns', to: '/shipping' },
    { label: 'Size Guide', to: '/size-guide' },
    { label: 'Track Order', to: '/track' },
    { label: 'Contact Us', to: '/contact' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Careers', to: '/careers' },
    { label: 'Press', to: '/press' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
  ],
}

const socials = [
  { icon: FiInstagram, label: 'Instagram', href: '#' },
  { icon: FiTwitter, label: 'Twitter', href: '#' },
  { icon: FiFacebook, label: 'Facebook', href: '#' },
  { icon: FiYoutube, label: 'YouTube', href: '#' },
]

const stats = [
  { icon: FiShoppingBag, value: '50K+', label: 'Orders Delivered' },
  { icon: FiHeart, value: '120K+', label: 'Happy Customers' },
  { icon: FiMessageCircle, value: '98%', label: 'Satisfaction Rate' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-stats">
        <div className="footer-stats-grid">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="footer-stat-item">
              <div className="footer-stat-icon">
                <Icon />
              </div>
              <div>
                <h4>{value}</h4>
                <p>{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-container">
        <div className="footer-grid">
          <div className="space-y-6 lg:col-span-2">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon">M</span>
              <div>
                <div className="footer-brand-name">MMB&apos;s Wears</div>
                <div className="footer-brand-subtitle">Luxury AI Fashion</div>
              </div>
            </Link>

            <p className="footer-description">
              Redefining fashion commerce with AI-powered styling, immersive 3D try-ons, and curated luxury pieces delivered to your door.
            </p>

            <div className="footer-newsletter">
              <p className="footer-newsletter-title">Stay In The Loop</p>
              <div className="footer-newsletter-box">
                <input type="email" placeholder="your@email.com" />
                <button type="button">
                  Join <FiArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="footer-socials">
              {socials.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              {heading === 'Design' ? (
                <Link to="/design" className="footer-column-title">
                  {heading}
                </Link>
              ) : (
                <h3 className="footer-column-title">{heading}</h3>
              )}

              <div className="footer-links">
                {links.map(({ label, to }) => (
                  <Link key={to} to={to}>
                    <FiArrowRight size={11} />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="footer-contact">
          {[
            { icon: FiMail, text: 'support@mmbswears.com', href: 'mailto:support@mmbswears.com' },
            { icon: FiPhone, text: '+1 (800) MMB-WEAR', href: 'tel:+18006629327' },
            { icon: FiMapPin, text: 'New York, NY 10001', href: '#' },
          ].map(({ icon: Icon, text, href }) => (
            <a key={text} href={href} className="footer-contact-item">
              <span className="footer-contact-icon">
                <Icon size={15} />
              </span>
              {text}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>© {new Date().getFullYear()} MMB&apos;s Wears. All rights reserved.</p>

          <div className="footer-bottom-links">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <Link key={item} to={`/${item.toLowerCase()}`}>
                {item}
              </Link>
            ))}
          </div>

          <p>
            Crafted with <span className="footer-heart">♥</span> & AI
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer