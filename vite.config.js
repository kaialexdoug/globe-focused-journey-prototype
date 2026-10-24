import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/globe-focused-journey-prototype/',
  // When this copy of the app was built, for the version at the bottom of
  // Profile → Settings (APP_VERSION in src/config.js).
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
})
