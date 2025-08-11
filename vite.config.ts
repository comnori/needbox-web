import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path ensures assets load correctly when deployed to GitHub Pages
// at https://comnori.github.io/needbox-web/
export default defineConfig({
  base: '/needbox-web/',
  plugins: [react()],
  test: {
    environment: 'jsdom'
  }
});
