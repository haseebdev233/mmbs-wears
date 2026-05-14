import { FiShoppingBag, FiStar, FiTrendingUp } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function AISuggestionPage({ catalog, onAddToCart }) {
  const aiSuggestedProducts = [...catalog]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)

  return (
    <main className="container py-4 py-lg-5">
      <section className="glass-panel rounded-5 p-4 p-lg-5 mb-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <div className="text-uppercase small text-info fw-semibold mb-2 letter-space">AI Suggestion</div>
            <h1 className="display-6 fw-bold mb-2 text-white">Smart picks for your style profile</h1>
            <p className="text-white-75 mb-0">Recommendations are ranked by demand, rating, and fit confidence.</p>
          </div>
          <div className="text-white-75 d-inline-flex align-items-center gap-2">
            <FiTrendingUp className="text-info" />
            Updated in real time
          </div>
        </div>
      </section>

      <section className="row g-4">
        {aiSuggestedProducts.map((product, index) => (
          <div className="col-md-6 col-xl-4" key={product.id}>
            <div className="glass-panel rounded-4 p-4 h-100">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <span className="badge text-bg-primary">AI Rank #{index + 1}</span>
                <span className="text-warning fw-semibold">${product.price}</span>
              </div>
              <h2 className="h5 fw-bold text-white mb-2">{product.name}</h2>
              <p className="text-white-75 mb-3">{product.summary}</p>
              <div className="text-white-75 small d-inline-flex align-items-center gap-1 mb-3">
                <FiStar className="text-warning" /> {product.rating} ({product.reviews} reviews)
              </div>
              <div className="d-flex flex-wrap gap-2">
                <button type="button" className="btn btn-warning btn-sm fw-semibold" onClick={() => onAddToCart(product)}>
                  <FiShoppingBag className="me-1" />
                  Add to cart
                </button>
                <Link to={`/product/${product.id}`} className="btn btn-outline-info btn-sm">
                  Quick view
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

export default AISuggestionPage
