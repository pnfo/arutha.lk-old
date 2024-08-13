// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    '@pinia/nuxt',
  ],

  pinia: {
    autoImports: [
      'defineStore', // auto import { defineStore } from 'pinia'
    ],
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000', // for prod server - comment out for android
    },
  },

  app: { // uncomment if root element needs to be accessed in onMounted hook
    pageTransition: false,
    layoutTransition: false,
    buildAssetsDir: '/nuxt/' // (default _nuxt) usuful in android since underscore folders are not copied to asset folder
  },

  // uncomment when building android app with local resources 
  ssr: true,

  devtools: { enabled: true },

  routeRules: { // this is needed for android otherwise page not found error shown at app initialization
    '/index.html': { redirect: '/' },
  },

  compatibilityDate: '2024-08-11',
})