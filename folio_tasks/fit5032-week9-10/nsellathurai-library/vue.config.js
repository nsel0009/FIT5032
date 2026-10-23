export default defineConfig({
  // Add your repository base path here for production
  base: process.env.NODE_ENV === 'production' ? '/FIT5032/' : '/',

  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
