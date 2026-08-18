// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

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

  css: ['~/assets/styles/main.scss', '~/assets/css/nuxt-content.scss'],

  components: true,

  devServer: {
    host: '0.0.0.0',
  },

  nitro: {
    output: {
      publicDir: 'docs',
    },
  },
  compatibilityDate: '2026-07-24',

  routeRules: {
    '/tools/synth': { redirect: { to: '/reference/synth', statusCode: 301 } },
  },
})
