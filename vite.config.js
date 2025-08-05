import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      process: 'process/browser',
      stream: 'stream-browserify',
      crypto: 'crypto-browserify',
    }
  },
  define: {
    'process.env': {}
  }
})
