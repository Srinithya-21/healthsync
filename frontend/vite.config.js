import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite React configuration for HealthSync
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
})
