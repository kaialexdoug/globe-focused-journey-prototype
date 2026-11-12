import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/noto-serif-display/400.css'
import '@fontsource/noto-serif-display/600.css'
import '@fontsource/noto-serif-display/700.css'
import './index.css'
import App from './App.jsx'

// No zooming the app on a phone (see the viewport in index.html). iPhones
// let you pinch to zoom whatever the page asks, so the pinch is stopped
// here, except on a map, which zooms itself when pinched. (A journey stop's
// embedded map is its own page, so it never comes through here.)
for (const type of ['gesturestart', 'gesturechange']) {
  document.addEventListener(
    type,
    (event) => {
      if (!event.target.closest?.('.liveMap, .routeMap, .gm-style')) {
        event.preventDefault()
      }
    },
    { passive: false },
  )
}

// The app is pinned to the screen and scrolls inside itself, so the page
// under it should never move. iPhones can leave it moved once the keyboard
// closes, which pushes the top of the app off the screen and lets the
// navbar slide away, so it's put back as soon as you're not typing.
function settlePage() {
  const typing = document.activeElement?.matches('input, textarea')
  if (!typing && (window.scrollX !== 0 || window.scrollY !== 0)) {
    window.scrollTo(0, 0)
  }
}
window.addEventListener('scroll', settlePage, { passive: true })
document.addEventListener('focusout', () => setTimeout(settlePage, 100))

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
