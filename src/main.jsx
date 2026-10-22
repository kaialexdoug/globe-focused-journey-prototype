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
