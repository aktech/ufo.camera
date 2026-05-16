import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ufo.camera/',
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
})
