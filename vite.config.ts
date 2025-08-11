import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Base path ensures assets load correctly when deployed to GitHub Pages
// at https://comnori.github.io/needbox-web/
export default defineConfig({
  base: '/needbox-web/',
  plugins: [react()],
  resolve: {
    alias: {
      antd: path.resolve(__dirname, 'src/antd-stubs.tsx')
    }
  },
  test: {
    environment: 'jsdom'
  }
});
