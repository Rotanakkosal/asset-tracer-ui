import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path-browserify"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5173,
  },
  plugins: [react()],
  resolve: {
    alias: {
      path: "path-browserify",
    },
  },
})
