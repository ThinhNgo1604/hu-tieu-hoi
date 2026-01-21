
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Đảm bảo các file .js, .css tìm thấy nhau trên GitHub Pages
  build: {
    outDir: 'dist',
  },
});
