import path from 'path';
import { defineConfig } from 'vite';
import { glob } from 'glob';

const root = path.resolve(__dirname, 'src');
const outDir = path.resolve(__dirname, 'dist');

const input = Object.fromEntries(
  glob.sync('src/**/index.html').map((file) => {
    const key = path.relative('src', file).replace('/index.html', '');
    return [key, path.resolve(__dirname, file)];
  }),
);

export default defineConfig({
  root,
  publicDir: '../public/',
  server: {
    host: true,
  },
  resolve: {
    alias: {
      '@': root,
    },
  },
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input,
      output: {
        manualChunks: {
          vendor: ['three', 'lil-gui'],
          lib: ['gsap'],
        },
      },
    },
  },
});
