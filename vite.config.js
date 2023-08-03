/** @type {import('vite').UserConfig} */
export default {
  root: 'src/',
  base: './',
  publicDir: '../public/',
  server: {
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['three', 'lil-gui'],
          lib: ['gsap'],
        },
      },
    },
  },
};
