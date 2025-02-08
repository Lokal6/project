import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // alternatívny port ak 5173 nefunguje
        open: true // automaticky otvorí prehliadač
    },
    build: {
        outDir: 'dist',
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor': ['react', 'react-dom', 'react-router-dom'],
                    'firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore']
                }
            }
        },
        // Kopírovanie assets
        assetsDir: 'assets',
        copyPublicDir: true
    },
    // Nastavenie public priečinka
    publicDir: 'public'
});
