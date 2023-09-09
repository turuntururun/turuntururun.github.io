// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  devtools: { enabled: true },

  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',

  // head: {
  //   title: 'turuntururun',
  //   meta: [
  //     { charset: 'utf-8' },
  //     { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //     { hid: 'description', name: 'description', content: '' },
  //     { name: 'format-detection', content: 'telephone=no' },
  //   ],
  //   link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.svg' }],
  // },

  css: ['@/assets/css/main.css'],// '@/assets/css/nuxt-content'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
    '@nuxt/content',
  ],

  /*/ PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'es',
    },
    icon: {
      fileName: 'logo.png',
    },
  },*/

  devServer: {
    host: '0.0.0.0',
  },


  // content: {
  //   // Options
  // },

  generate: {
    // dir: 'docs',
  },//*/
})
