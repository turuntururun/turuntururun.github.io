// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  devtools: {enabled: true},

  app: {
    head: {
      title: 'turuntururun',
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {hid: 'description', name: 'description', content: ''},
        {name: 'format-detection', content: 'telephone=no'},
      ],
      link: [{rel: 'icon', type: 'image/x-icon', href: '/logo.svg'}],
    }
  },

  css: ['~/assets/css/main.css', '~/assets/css/nuxt-content.scss'],

  components: true,

  modules: ['@nuxt/content'],

  devServer: {
    host: '0.0.0.0',
  },

  nitro: {
    output: {
      publicDir: 'docs'
    }
  },

})
