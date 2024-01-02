import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log(process.env.NODE_ENV,'process.env.NODE_ENV')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
