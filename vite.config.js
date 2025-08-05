import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Fix for `process is not defined`
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      process: 'process/browser', // use process polyfill
    },
  },
  define: {
    'process.env': {}, // prevent undefined env
  },
})
