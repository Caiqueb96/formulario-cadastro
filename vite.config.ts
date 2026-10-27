/// <reference types="vitest/config" />
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    // jsdom simula um navegador (document, localStorage...) dentro do Node
    environment: 'jsdom',
    // Roda antes de cada arquivo de teste
    setupFiles: ['./src/test/setup.ts'],
  },
})
