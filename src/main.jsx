import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { loadSettings } from './profileStore'

// The theme goes on before anything is drawn, so light mode doesn't flash
// dark for a moment first.
document.documentElement.dataset.theme = loadSettings().theme

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// The service worker (public/sw.js), which makes it installable and lets it
// open without a connection. Only on the built site: while working on it
// with `npm run dev`, every change should show up straight away.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch((error) => {
      console.error('Service worker not registered:', error)
    })
  })
}
