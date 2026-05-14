import { FiBox, FiShoppingBag } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function Design3DModelsPage({ catalog, onAddToCart }) {
  const models = catalog.slice(0, 6)

  return (
    <main className="container py-4 py-lg-5">
      <section className="mb-4">
        <div className="text-uppercase small text-info fw-semibold mb-2 letter-space">Design Lab</div>
        <h1 className="display-6 fw-bold text-white mb-2">3D Models</h1>
        <p className="text-white-75 mb-0">Explore products prepared for interactive 3D visualization and fitting previews.</p>
      </section>

      <section className="row g-4">
        {models.map((product) => (
          <div className="col-md-6 col-xl-4" key={product.id}>
            <div className="glass-panel rounded-4 p-4 h-100">
              <div className="d-inline-flex align-items-center gap-2 text-info small mb-2">
                <FiBox />
                3D Ready
              </div>
              <h2 className="h5 fw-bold text-white mb-2">{product.name}</h2>
              <p className="text-white-75 mb-3">{product.summary}</p>
              <div className="d-flex flex-wrap gap-2">
                <button type="button" className="btn btn-warning btn-sm fw-semibold" onClick={() => onAddToCart(product)}>
                  <FiShoppingBag className="me-1" />
                  Add to cart
                </button>
                <Link className="btn btn-outline-light btn-sm" to="/try-on">Open 3D Studio</Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

export default Design3DModelsPage
