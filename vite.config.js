import { env } from 'node:process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: env.GITHUB_ACTIONS === 'true' ? '/copy-flow/' : '/',
})