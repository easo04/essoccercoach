require('dotenv').config();

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Le créateur d\'exercices de soccer | ESSoccerCoach',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid:'description',
        name:'description',
        content:'Vous cherchez un outil pour créer vos exercices de soccer gratuitement? Nous avons le meilleur outil pour vous ✅ Création d\'exercices de soccer ✅ Création de séances de soccer ✅ Création d\'alignements de soccer'
      },
      {
          hid:'keywords',
          name:'keywords',
          content:'exercices de soccer, séances d\'entrâinement, soccer coach, créateur d\'exercices'
      },
      {
          hid:'robots',
          name:'robots',
          content:'index'
      },
    ],   
    htmlAttrs:{
      lang:'fr'
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo_app.ico' },
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/logo_app.ico' },
      { rel: 'stylesheet', href: '/flickity/flickity.css', media:'screen'},
      { rel: 'stylesheet', href: '/icons/icons.css', media:'screen'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato&family=Open+Sans&display=swap'}
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
    ],
    "@nuxtjs/cloudinary",
    '@nuxtjs/dotenv',
    '@nuxtjs/google-analytics'
  ],

  dotenv:{
    systemvars:true
  },

  serverMiddleware: [
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    //baseURL: 'https://essoccercoach-api.herokuapp.com/api/',
    //baseURL local: http://localhost:4000/api
    headers: {
      common: {
        'Accept': 'application/json, text/plain, */*'
      }
    },
    proxy:true
  },

  proxy:{
      '/api/': { target: process.env.URL_API, pathRewrite: {'^/api/': ''}, changeOrigin: true}
  },

  auth:{
    redirect: {
      login: '/dashboard',
      logout: '/login',
      home: '/dashboard'
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

  //cloudinary module configuration
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID, // Use as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
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
