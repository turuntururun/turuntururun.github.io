// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Build config
  components: true,
  css: ['~/assets/styles/main.scss'],
  compatibilityDate: '2026-07-24',
  nitro: {
    output: {
      publicDir: 'docs',
    },
  },
  vite: {
    build: {
      target: ['es2015', 'safari11'],
    },
  },

  // Site config
  app: {
    head: {
      title: 'turuntururun',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.svg' }],
    },
  },

  routeRules: {
    '/tools/synth': { redirect: { to: '/reference/synth', statusCode: 301 } },
  },
})
