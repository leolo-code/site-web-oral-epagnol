import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' : le site fonctionne aussi bien sur GitHub Pages (sous-dossier) qu'en local.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
