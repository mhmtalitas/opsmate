import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  },
  base: '/',
  define: {
    'process.env': {}
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  head: {
    title: 'OpsMate'
  }
}) 