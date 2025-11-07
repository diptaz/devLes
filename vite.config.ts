import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@components': path.resolve(__dirname, './components'),
      '@utils': path.resolve(__dirname, './utils'),
      '@styles': path.resolve(__dirname, './styles'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'chess-vendor': ['chess.js', 'react-chessboard'],
          'ui-vendor': ['lucide-react', 'sonner', 'recharts'],
          'radix-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'chess.js',
      'react-chessboard',
      'lucide-react',
      'sonner',
      'date-fns',
    ],
  },
  server: {
    port: 3000, // Changed from 5173 to match your setup
    host: true,
  },
  preview: {
    port: 3001, // Changed from 4173 to match server port
    host: true,
  },
});
