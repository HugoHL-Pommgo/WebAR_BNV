import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Pour GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        marker: './marker.html',
        viewer: './viewer.html'
      }
    }
  },
  publicDir: 'assets', // Copie le dossier assets
  server: {
    https: true, // Pour les tests locaux
    host: '0.0.0.0',
    port: 8443
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
