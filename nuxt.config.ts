// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/scripts',
    '@nuxt/test-utils/module',
    '@nuxt/ui',
    '@nuxt/image',
    'nuxt-auth-utils'
  ],
  css: ['~/assets/css/main.css'],
  ui: {
    colors: {
      primary: 'blue',
      secondary: 'purple',
    }
  }
})