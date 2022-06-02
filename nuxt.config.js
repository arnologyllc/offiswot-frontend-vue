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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '' }],
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

  loading: { color: "#4156F6" },
}
