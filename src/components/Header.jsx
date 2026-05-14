import { useState } from 'react'
import { FiLogOut, FiMessageCircle, FiShoppingCart, FiHeart, FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'

function Header({ cartCount, wishlistCount, bargainCount, token, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [designOpen, setDesignOpen] = useState(false)

  const navLinks = [
    ['/', 'Home'],
    ['/about', 'About'],
    ['/new-arrivals', 'New Arrivals'],
    ['/try-on', '3D Experience'],
  ]

  const navLinkClass = ({ isActive }) =>
    `hdr-nav-link${isActive ? ' hdr-nav-link--active' : ''}`

  return (
    <header className="hdr">
      <div className="hdr-container">

        {/* Logo */}
        <Link className="hdr-logo" to="/" onClick={() => setMobileOpen(false)}>
          <span className="hdr-logo__mark">M</span>
          <span className="hdr-logo__text">
            <span className="hdr-logo__name">MMB&apos;s Wears</span>
            <span className="hdr-logo__sub">Luxury AI Fashion</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hdr-nav" aria-label="Main navigation">
          <ul className="hdr-nav__list">
            {navLinks.map(([to, label]) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'} className={navLinkClass}>
                  {label}
                </NavLink>
              </li>
            ))}

            {/* Design Dropdown */}
            <li className="hdr-dropdown">
              <button
                className="hdr-nav-link hdr-dropdown__trigger"
                onClick={() => setDesignOpen(o => !o)}
                aria-expanded={designOpen}
                type="button"
              >
                Design <FiChevronDown className={`hdr-dropdown__chevron${designOpen ? ' hdr-dropdown__chevron--open' : ''}`} />
              </button>
              {designOpen && (
                <ul className="hdr-dropdown__menu" role="menu">
                  <li role="none">
                    <NavLink to="/design/3d-models" className="hdr-dropdown__item" role="menuitem" onClick={() => setDesignOpen(false)}>
                      3D Models
                    </NavLink>
                  </li>
                  <li role="none">
                    <NavLink to="/design/custom-models" className="hdr-dropdown__item" role="menuitem" onClick={() => setDesignOpen(false)}>
                      Custom Models
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="hdr-actions">
          <NavLink to="/wishlist" className="hdr-icon-btn" aria-label={`Wishlist (${wishlistCount})`}>
            <FiHeart />
            {wishlistCount > 0 && <span className="hdr-badge">{wishlistCount}</span>}
          </NavLink>

          <NavLink to="/cart" className="hdr-icon-btn" aria-label={`Cart (${cartCount})`}>
            <FiShoppingCart />
            {cartCount > 0 && <span className="hdr-badge hdr-badge--warning">{cartCount}</span>}
          </NavLink>

          <span className="hdr-icon-btn hdr-icon-btn--static" aria-label={`Bargains (${bargainCount})`}>
            <FiMessageCircle />
            {bargainCount > 0 && <span className="hdr-badge hdr-badge--info">{bargainCount}</span>}
          </span>

          {token ? (
            <button type="button" className="hdr-btn hdr-btn--outline" onClick={onLogout}>
              <FiLogOut />
              Logout
            </button>
          ) : (
            <div className="hdr-auth">
              <NavLink to="/signin" className={({ isActive }) => `hdr-nav-link${isActive ? ' hdr-nav-link--active' : ''}`}>
                Sign In
              </NavLink>
              <NavLink to="/signup" className="hdr-btn hdr-btn--primary">
                Sign Up
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="hdr-mobile-toggle"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          type="button"
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="hdr-mobile" aria-label="Mobile navigation">
          <ul className="hdr-mobile__list">
            {navLinks.map(([to, label]) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={navLinkClass}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/design/3d-models" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                3D Models
              </NavLink>
            </li>
            <li>
              <NavLink to="/design/custom-models" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                Custom Models
              </NavLink>
            </li>
            <li className="hdr-mobile__divider" />
            <li>
              <NavLink to="/wishlist" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                <FiHeart /> Wishlist {wishlistCount > 0 && <span className="hdr-badge">{wishlistCount}</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                <FiShoppingCart /> Cart {cartCount > 0 && <span className="hdr-badge hdr-badge--warning">{cartCount}</span>}
              </NavLink>
            </li>
            <li>
              <span className="hdr-nav-link">
                <FiMessageCircle /> Bargains {bargainCount > 0 && <span className="hdr-badge hdr-badge--info">{bargainCount}</span>}
              </span>
            </li>
            <li className="hdr-mobile__divider" />
            {token ? (
              <li>
                <button type="button" className="hdr-btn hdr-btn--outline hdr-btn--full" onClick={() => { onLogout(); setMobileOpen(false) }}>
                  <FiLogOut /> Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/signin" className={navLinkClass} onClick={() => setMobileOpen(false)}>Sign In</NavLink>
                </li>
                <li>
                  <NavLink to="/signup" className="hdr-btn hdr-btn--primary hdr-btn--full" onClick={() => setMobileOpen(false)}>Sign Up</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header