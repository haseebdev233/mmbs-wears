import { FiHeart, FiShoppingBag } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function NewArrivalsPage({ catalog, wishlist, onAddToCart, onToggleWishlist }) {
  const newArrivalItems = catalog
    .filter((product) => ['New Arrival', 'Limited Drop', 'Exclusive', 'Flash Sale'].includes(product.badge))
    .slice(0, 8)

  return (
    <main className="container py-4 py-lg-5">
      <section className="mb-4">
        <div className="text-uppercase small text-info fw-semibold mb-2 letter-space">Fresh Collection</div>
        <h1 className="display-6 fw-bold text-white mb-2">New Arrivals</h1>
        <p className="text-white-75 mb-0">Latest premium drops with futuristic styling and high-demand silhouettes.</p>
      </section>

      <section className="row g-4">
        {newArrivalItems.map((product) => {
          const isWishlisted = wishlist.some((item) => item.id === product.id)
          return (
            <div className="col-md-6 col-xl-4" key={product.id}>
              <div className="glass-panel rounded-4 p-4 h-100">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="badge text-bg-info">{product.badge}</span>
                  <span className="fw-semibold text-warning">${product.price}</span>
                </div>
                <h2 className="h5 fw-bold text-white mb-2">{product.name}</h2>
                <p className="text-white-75 mb-3">{product.summary}</p>
                <div className="d-flex gap-2 flex-wrap">
                  <button type="button" className="btn btn-warning btn-sm fw-semibold" onClick={() => onAddToCart(product)}>
                    <FiShoppingBag className="me-1" />
                    Add to cart
                  </button>
                  <button type="button" className="btn btn-outline-light btn-sm" onClick={() => onToggleWishlist(product)}>
                    <FiHeart className="me-1" />
                    {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                  </button>
                  <Link to={`/product/${product.id}`} className="btn btn-outline-info btn-sm">View</Link>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}

export default NewArrivalsPage
