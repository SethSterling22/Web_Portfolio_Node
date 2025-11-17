import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Accept all hosts for dinamic ip
    allowedHosts: true,
    //allowedHosts: [
    //  'aery',
    //],
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true 
      }
    }
  }
})
