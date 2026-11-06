import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // The studio goes live at the app's address with /studio/ on the end
  // (.github/workflows/deploy.yml builds both and puts them together).
  base: '/globe-focused-journey-prototype/studio/',
  server: {
    fs: {
      // Until there's a database, the studio reads journeys straight from the
      // app's files (src/journeyStore.js), so while working on it, it's allowed
      // to load files from main-app/ as well as its own folder.
      allow: [fileURLToPath(new URL('.', import.meta.url)), fileURLToPath(new URL('../main-app', import.meta.url))],
    },
  },
})
