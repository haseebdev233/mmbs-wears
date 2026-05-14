import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function CartPage({ cart, catalog, onIncrease, onDecrease, onRemove, onClear }) {
  const cartItems = cart.map((item) => ({ ...item, product: catalog.find((entry) => entry.id === item.id) }))
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 0 : 0
  const total = subtotal + shipping

  return (
    <main className="container py-4 py-lg-5">
      <section className="mb-4">
        <div className="text-uppercase small text-info fw-semibold mb-2 letter-space">Cart</div>
        <h1 className="display-6 fw-bold text-white mb-2">Your shopping cart</h1>
        <p className="text-white-75 mb-0">Add, remove, and adjust quantity before checkout.</p>
      </section>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="glass-panel rounded-4 p-4">
            {cartItems.length === 0 ? (
              <div className="text-center text-white-50">
                Your cart is empty. <Link to="/new-arrivals">Browse new arrivals</Link>.
              </div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div className="cart-row d-flex flex-wrap justify-content-between align-items-center gap-3 p-3 mb-3 rounded-3" key={item.id}>
                    <div>
                      <div className="fw-semibold text-white">{item.name}</div>
                      <small className="text-white-50">${item.price} each</small>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <button type="button" className="btn btn-outline-light btn-sm" onClick={() => onDecrease(item.id)}>
                        <FiMinus />
                      </button>
                      <span className="fw-semibold text-white px-2">{item.quantity}</span>
                      <button type="button" className="btn btn-outline-light btn-sm" onClick={() => onIncrease(item.id)}>
                        <FiPlus />
                      </button>
                      <button type="button" className="btn btn-outline-danger btn-sm ms-2" onClick={() => onRemove(item.id)}>
                        <FiTrash2 className="me-1" />
                        Remove
                      </button>
                    </div>
                    <div className="text-warning fw-semibold">${item.price * item.quantity}</div>
                  </div>
                ))}
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={onClear}>Clear cart</button>
              </>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="glass-panel rounded-4 p-4">
            <h2 className="h5 text-white fw-bold mb-3">Order Summary</h2>
            <div className="d-flex justify-content-between mb-2"><span>Subtotal</span><strong>${subtotal}</strong></div>
            <div className="d-flex justify-content-between mb-2"><span>Shipping</span><strong>{shipping === 0 ? 'Free' : `$${shipping}`}</strong></div>
            <div className="d-flex justify-content-between mb-4"><span>Total</span><strong>${total}</strong></div>
            <Link
              className={`btn w-100 fw-semibold ${cartItems.length ? 'btn-warning' : 'btn-secondary disabled'}`}
              to={cartItems.length ? '/checkout' : '/cart'}
              aria-disabled={!cartItems.length}
            >
              Go to checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CartPage
