import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['pdfjs-dist', 'react-pdf'],
  },
  server: {
    host: true, // Allow access from local network (e.g., your phone on same WiFi)
    headers: {
      // CORS headers for fonts in development
      'Access-Control-Allow-Origin': '*',
    },
  },
  preview: {
    headers: {
      // CORS headers for fonts in preview mode
      'Access-Control-Allow-Origin': '*',
    },
  },
})
