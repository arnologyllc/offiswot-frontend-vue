export default {
  target: 'static',
  ssr: true,
  head: {
    title: 'officewot',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '' }, { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' }],
  },

  css: ['element-ui/lib/theme-chalk/index.css', './assets/styles/main.css'],

  plugins: ['@/plugins/element-ui', '@/plugins/axios'],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    "@nuxtjs/style-resources",
    [
      'nuxt-compress',
      {
        gzip: {
          threshold: 8192,
        },
        brotli: {
          threshold: 8192,
        },
      },
    ],

  ],

  styleResources: {
    scss: ["@/assets/styles/_variables.scss"]
  },


  modules: [
    '@nuxtjs/axios',
    [
      'nuxt-compress',
      {
        gzip: {
          threshold: 8192,
        },
        brotli: {
          threshold: 8192,
        },
      },
    ],
    'cookie-universal-nuxt',
  ],

  build: {
    transpile: [/^element-ui/],
  },

  server: {
    port: process.env.PORT || 8000,
    host: '0.0.0.0',
    timing: false
  },

  loading: { color: "#4156F6" },
}

