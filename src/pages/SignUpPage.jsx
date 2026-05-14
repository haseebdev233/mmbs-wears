import axios from 'axios'
import { useState } from 'react'
import { FiUserPlus } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

function SignUpPage({ apiBaseUrl, onAuthenticated }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const submit = async (event) => {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    try {
      const response = await axios.post(`${apiBaseUrl}/api/auth/register`, { name, email, password })
      onAuthenticated(response?.data?.token || `demo-token-${Date.now()}`)
      navigate('/')
    } catch (requestError) {
      const apiError = requestError?.response?.data?.message
      if (apiError) {
        setError(apiError)
      } else {
        onAuthenticated(`demo-token-${Date.now()}`)
        navigate('/')
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
            <h1 className="h3 fw-bold mb-2 text-white">Sign Up</h1>
            <p className="text-white-75 mb-4">Create your MMB&apos;s Wears account in seconds.</p>

            {error ? <div className="alert alert-danger py-2">{error}</div> : null}

            <form onSubmit={submit} className="vstack gap-3">
              <input
                className="form-control bg-dark text-white border-white border-opacity-10"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Full name"
                autoComplete="name"
                required
              />
              <input
                className="form-control bg-dark text-white border-white border-opacity-10"
                type="email"
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
                autoComplete="new-password"
                required
              />
              <input
                className="form-control bg-dark text-white border-white border-opacity-10"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm password"
                autoComplete="new-password"
                required
              />
              <button type="submit" className="btn btn-warning fw-semibold" disabled={submitting}>
                <FiUserPlus className="me-2" />
                {submitting ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-3 text-white-50 small">
              Already have an account? <Link to="/signin">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignUpPage
