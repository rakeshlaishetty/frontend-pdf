import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log(process.env.NODE_ENV,'process.env.NODE_ENV')
// https://vitejs.dev/config/
export default defineConfig({
  base:process.env.NODE_ENV === 'production' ? '/frontend-pdf/' : '/',
  plugins: [react()],
})
