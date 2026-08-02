import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` must match the GitHub repository name exactly, with slashes both
// sides — GitHub Pages serves the site from https://<user>.github.io/<repo>/.
// If you name the repo something other than `afters-invite`, change it here,
// in SITE_URL in src/content.js, and in the og:/twitter: URLs in index.html.
export default defineConfig({
  plugins: [react()],
  base: '/afters-invite/',
})
