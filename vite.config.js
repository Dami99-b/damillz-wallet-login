import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify', // Fix for crypto in browser
      stream: 'stream-browserify', // Needed by crypto-browserify
    },
  },
  define: {
    global: {},        // Polyfill for packages expecting global
    'process.env': {}, // Avoid "process is not defined"
  },
})
