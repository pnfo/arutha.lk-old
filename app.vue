<template>
  <v-app>
  <v-layout>
    <v-app-bar density="compact">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>

        <v-spacer></v-spacer>
        <v-text-field placeholder="Doe" density="compact" hide-details @update:modelValue="doSearch"></v-text-field>
        <v-app-bar-title>Arutha.lk</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" to="/" nuxt></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Bookmarks" to="/bookmarks" nuxt></v-list-item>
          <v-list-item prepend-icon="mdi-history" title="History" to="/history"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="About" to="/about" nuxt></v-list-item>
          <v-list-item prepend-icon="mdi-cog" title="Settings" to="/settings"></v-list-item>
        </v-list>
    </v-navigation-drawer>
    
    <v-main>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </v-main>

  </v-layout>
  </v-app>
</template>

<script setup>
//import { ref } from 'vue'
const drawer = ref(true)
useHead({
  titleTemplate: (titleChunk) => titleChunk ? `${titleChunk} - Dictionary` : 'Arutha.lk',
})
function doSearch(val) {
  if (val) navigateTo('/sinhala/' + val)
}
import { useSinhalaStore } from '@/stores/sinhala'
await useSinhalaStore().loadStrings()

import { useSettingsStore } from '@/stores/settings'
const settingsStore = useSettingsStore()
import { useTheme } from 'vuetify'
onMounted(() => {
  console.log('app is mounted hook')
  settingsStore.loadSettings()

  console.log(`settings darkMode = ${settingsStore.settings.darkMode}`)
  useTheme().global.name.value = settingsStore.settings.darkMode ? 'dark' : 'light'
})


</script>

<style>
@font-face { src: local('###'), url('~/fonts/UN-Abhaya.ttf') format('truetype'); font-weight: normal; font-family: 'sinhala'; }
/*@font-face { src: local('###'), url('./assets/fonts/AbhayaLibre-SemiBold.ttf') format('truetype'); font-weight: bold; font-family: 'sinhala'; }*/
@font-face { src: local('###'), url('~/fonts/UN-Alakamanda-4-95.ttf') format('truetype'); font-weight: normal; font-family: 'styled'; }
@font-face { src: local('###'), url('~/fonts/AbhayaLibre-SemiBold.ttf') format('truetype'); font-weight: normal; font-family: 'heading2'; }
body {
  font-family: 'sinhala';
}
</style>
