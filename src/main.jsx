import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import App from './App.jsx'

const SUPPRESSED_THREE_MESSAGES = [
  'THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.',
  'THREE.WebGLProgram: Program Info Log:',
]

if (import.meta.env.DEV && typeof window !== 'undefined' && !window.__MMBS_THREE_WARNING_FILTER__) {
  const patchConsole = (method) => {
    const original = console[method]
    console[method] = (...args) => {
      const message = args.find((arg) => typeof arg === 'string')
      if (typeof message === 'string' && SUPPRESSED_THREE_MESSAGES.some((text) => message.startsWith(text))) return
      original.apply(console, args)
    }
  }

  patchConsole('warn')
  patchConsole('error')
  window.__MMBS_THREE_WARNING_FILTER__ = true
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
