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
      baseURL: process.env.BASE_URL || 'http://localhost:3000', // '../'
    },
  },
  app: { // uncomment if root element needs to be accessed in onMounted hook
    pageTransition: false,
    layoutTransition: false,
  },
  // uncomment when building android app with local resources and set base url to ../
  // check this issue https://github.com/nuxt/nuxt/issues/13857
  // ssr: false, 
  devtools: { enabled: true }
})
