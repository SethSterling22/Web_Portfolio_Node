import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'aery.stegosaurus-panga.ts.net',
      'aery',
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true 
      }
    }
  }
})
