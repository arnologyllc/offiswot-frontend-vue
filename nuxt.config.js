// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  target: 'static',
  ssr: true,
  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/pwa'],
  modules: ['@pinia/nuxt', '@element-plus/nuxt', '@vite-pwa/nuxt'],
  plugins: ['@/plugins/headers'],

  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },

  vite: {
    build: { assetsInlineLimit: 0 },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/_variables.scss";',
        },
      },
    },
  },

  css: [
    '@/assets/styles/main.css',
    '@/assets/styles/errors.scss',
    '@/assets/styles/modals.scss',
    'maz-ui/css/main.css',
  ],

  server: {
    port: process.env.PORT || 8000,
    host: '0.0.0.0',
    timing: false,
  },
  runtimeConfig: {
    public: {
      env: {
        apiUrl: 'http://93.188.164.8:8088/api/',
        serverUrl: 'http://93.188.164.8:8088/',
      },
    },
  },

  loading: { color: '#4156F6' },

  vueCompiler: {
    compilerOptions: {
      suppressWarnings: true,
    },
  },
  build: {
    transpile: ['maz-ui'],
  },

  pwa: {
    manifest: {
      name: 'offisewot PWA',
      short_name: 'offisewot',
      start_url: '/login',
      icons: [
        { src: 'android-chrome-64x64.png', sizes: '64x64', type: 'image/png' },
        { src: 'android-chrome-144x144.png', sizes: '144x144', type: 'image/png' },
        { src: 'android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    },

    workbox: {
      navigateFallback: '/login',
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
})
