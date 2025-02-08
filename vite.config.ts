import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // alternatívny port ak 5173 nefunguje
    open: true   // automaticky otvorí prehliadač
  },
  build: {
    outDir: 'build',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore']
        }
      }
    },
    // Kopírovanie assets
    assetsDir: 'assets',
    copyPublicDir: true
  },
  // Nastavenie public priečinka
  publicDir: 'public'
})
