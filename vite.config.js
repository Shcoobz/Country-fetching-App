import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/more-on-fetch-the-countries-react-Shcoobz/',
  build: {
    outDir: 'build',
  },
});
