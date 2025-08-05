import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Fix for process is not defined
export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // for some polyfills
    'process.env': {}, // fake env object
  },
})
