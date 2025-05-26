import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path' 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-training/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), 
      },
  },
})
