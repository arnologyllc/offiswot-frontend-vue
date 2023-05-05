// https://nuxt.com/docs/api/configuration/nuxt-config
import Cookies from 'js-cookie'

export default defineNuxtConfig({
  target: 'static',
  ssr: true,
  components: true,

  buildModules: ['@nuxtjs/eslint-module'],
  modules: ['@pinia/nuxt', '@element-plus/nuxt'],
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

  css: ['@/assets/styles/main.css', 'maz-ui/css/main.css'],

  server: {
    port: process.env.PORT || 8000,
    host: '0.0.0.0',
    timing: false,
  },
  runtimeConfig: {
    public: {
      env: {
        apiUrl: 'https://offiswot-api.arnologyapps.com/api/',
        serverUrl: 'https://offiswot-api.arnologyapps.com',
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
})
