// plugins/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/lib/util/colors'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      // options: {
      //   customProperties: true,
      // },
      themes: {
        light: {
          dark: false,
          colors: {
            primary: colors.orange.darken4,
            secondary: colors.grey.darken2,
            success: colors.green.darken3,
            info: colors.blue.darken3,
            star: colors.yellow.darken3,
          }
        },
        dark: {
          dark: true,
          colors: {
            primary: colors.orange.lighten1,
            secondary: colors.grey.lighten2,
            success: colors.green.lighten2,
            info: colors.blue.lighten2,
            star: colors.yellow.lighten2,
          }
        }
      },
      defaultTheme: 'dark'
    },
  })

  nuxtApp.vueApp.use(vuetify)
})