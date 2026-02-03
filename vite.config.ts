import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt', // User chooses when to update
      devOptions: { enabled: true }, // Test PWA in dev
      includeAssets: ['logo/logo.svg', 'logo/icon-purple.svg'],
      manifest: {
        name: 'Digiteen',
        short_name: 'Digiteen',
        description: 'Digiteen - دیجی‌تین',
        theme_color: '#7e4bd0',
        background_color: '#7e4bd0',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        id: '/',
        icons: [
          {
            src: '/logo/icon-purple.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/logo/icon-purple.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/logo/icon-purple.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
        categories: ['social', 'lifestyle'],
        prefer_related_applications: false,
        // App shortcuts: long-press icon on Android shows these actions
        shortcuts: [
          {
            name: 'کیف پول',
            short_name: 'کیف پول',
            description: 'ورود به کیف پول',
            url: '/wallet-money',
            icons: [{ src: '/logo/icon-purple.svg', sizes: '120x120', type: 'image/svg+xml', purpose: 'any' }],
          },
          {
            name: 'فروشگاه',
            short_name: 'فروشگاه',
            description: 'ورود به فروشگاه',
            url: '/shop',
            icons: [{ src: '/logo/icon-purple.svg', sizes: '120x120', type: 'image/svg+xml', purpose: 'any' }],
          },
          {
            name: 'پروفایل',
            short_name: 'پروفایل',
            description: 'ورود به پروفایل',
            url: '/user-info',
            icons: [{ src: '/logo/icon-purple.svg', sizes: '120x120', type: 'image/svg+xml', purpose: 'any' }],
          },
          {
            name: 'پیام‌ها',
            short_name: 'پیام‌ها',
            description: 'ورود به پیام‌ها',
            url: '/messages',
            icons: [{ src: '/logo/icon-purple.svg', sizes: '120x120', type: 'image/svg+xml', purpose: 'any' }],
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,ttf}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3 MiB for large SVGs/JS
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/.*\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
              cacheableResponse: { statuses: [0, 200] },
              networkTimeoutSeconds: 10,
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico|woff2?|ttf)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-assets',
              expiration: { maxEntries: 128, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        cleanupOutdatedCaches: true,
        skipWaiting: false,
        clientsClaim: true,
      },
    }),
  ],
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
