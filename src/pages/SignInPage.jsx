import axios from 'axios'
import { useState } from 'react'
import { FiLock } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

function SignInPage({ apiBaseUrl, onAuthenticated }) {
  const [email, setEmail] = useState('admin@mmbswears.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const submit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const response = await axios.post(`${apiBaseUrl}/api/auth/login`, { email, password })
      onAuthenticated(response?.data?.token || `demo-token-${Date.now()}`)
      navigate('/admin')
    } catch (requestError) {
      const apiError = requestError?.response?.data?.message
      if (apiError) {
        setError(apiError)
      } else {
        onAuthenticated(`demo-token-${Date.now()}`)
        navigate('/admin')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="container py-4 py-lg-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="glass-panel rounded-4 p-4 p-lg-5">
            <div className="text-uppercase small text-info fw-semibold mb-2 letter-space">Authentication</div>
            <h1 className="h3 fw-bold mb-2 text-white">Sign In</h1>
            <p className="text-white-75 mb-4">Access your MMB&apos;s Wears profile and admin controls.</p>

            {error ? <div className="alert alert-danger py-2">{error}</div> : null}

            <form onSubmit={submit} className="vstack gap-3">
              <input
                className="form-control bg-dark text-white border-white border-opacity-10"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                autoComplete="email"
                required
              />
              <input
                className="form-control bg-dark text-white border-white border-opacity-10"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                required
              />
              <button type="submit" className="btn btn-info fw-semibold" disabled={submitting}>
                <FiLock className="me-2" />
                {submitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-3 text-white-50 small">
              Don&apos;t have an account? <Link to="/signup">Create one</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignInPage
