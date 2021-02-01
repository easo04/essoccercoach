export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'essoccercoach',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/flickity/flickity.css', media:'screen'},
      { rel: 'stylesheet', href: '/icons/icons.css', media:'screen'},
    ],
    script:[
      {src:'https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js'},
      {src:'/fontawesome/js/all.js'},
      {src:'/flickity/flickity.pkgd.min.js'},
      {src:'/icons/icons.js'},
      {src:'/imports/interact.js'},
      {src:'/imports/jspdf.min.js'},
      {src:'/imports/canvas2image.js'},
      {src:'/drag.js'},
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/main.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/vue-js-modal.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  serverMiddleware: [
    '@/api/index.js',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
