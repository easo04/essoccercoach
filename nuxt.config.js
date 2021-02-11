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
    '@nuxtjs/firebase',
    '@nuxtjs/auth-next',
    [
      'nuxt-fontawesome', {
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
        {
          set:'@fortawesome/free-brands-svg-icons',
          icons: ['fab']
        }
      ]
      }
    ]
  ],

  serverMiddleware: [
    '@/api/index.js',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    //baseURL: 'https://essoccercoach-api.herokuapp.com/api/',
    //baseURL: 'http://localhost:4000/api/',
    headers: {
      common: {
        'Accept': 'application/json, text/plain, */*'
      }
    },
    proxy:true
  },

  proxy:{
      '/api/': { target: 'http://localhost:4000/api', pathRewrite: {'^/api/': ''}, changeOrigin: true}
  },

  //Firebase module configuration
  firebase:{
    config: {
      apiKey: "AIzaSyAFdjN0MvRwatdGpSEozi1zM6ye-JfPq-A",
      authDomain: "essoccercoach.firebaseapp.com",
      databaseURL: "https://essoccercoach.firebaseio.com",
      projectId: "essoccercoach",
      storageBucket: "essoccercoach.appspot.com",
      messagingSenderId: "359986135028",
      appId: "1:359986135028:web:03cc97347a523c002103a1",
      measurementId: "G-GHNVKKV4PB"
    },
    services: {
      auth: true,
      firestore: true,
      storage: true,
    }
  },

  auth:{
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/'
    },
    strategies: {
      local: {
        token: {
          property: 'token',
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: { url: '/api/users/login', method: 'post'},
          logout: { url: '/api/users/logout', method: 'delete'},
          user: false
        }
      }
    }
  },

  
  loading: {
    color: '#28ABB9',
    height: '5px',
    continuous:true
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
