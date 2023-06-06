module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-undef': 'off',
    'vue/multi-word-component-names': 0,
    'vue/no-v-html': 'off',
    'vue/no-mutating-props': 'off',
    'vue/require-explicit-emits': 'off',
  },
}
