<template>
<v-app>
  <v-layout>
    <v-app-bar density="compact">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="primary"></v-app-bar-nav-icon>
        </template>

        <v-spacer></v-spacer>
        <v-text-field style="width: 100%; max-width: 400px;" placeholder="සෙවුම් පද මෙතැන යොදන්න" v-model="searchTerm"
          density="compact" hide-details @update:modelValue="doSearch" @update:focused="checkSearch"></v-text-field>
        <!-- <v-app-bar-title color="primary" class="app-title">අරුත.lk</v-app-bar-title> -->

        <v-spacer></v-spacer>
        <template v-if="$vuetify.display.smAndUp">
          <v-divider class="mx-3 align-self-center" length="24" thickness="2" vertical></v-divider>
          <v-btn icon="mdi-folder-outline"></v-btn>
          <v-btn icon="mdi-magnify"></v-btn>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home" to="/" nuxt>
            <v-list-item-title :style="settingsStore.fontSizeStyle" class="py-2">මුල් පිටුව</v-list-item-title>
          </v-list-item>
          <v-list-item to="/bookmarks" nuxt>
            <template v-slot:prepend><v-icon color="star">mdi-star</v-icon></template>
            <v-list-item-title :style="settingsStore.fontSizeStyle" class="py-2">තරුයෙදූ / Bookmarks</v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-book-open-page-variant-outline" to="/bookpage/sankshiptha/1">
            <v-list-item-title :style="settingsStore.fontSizeStyle" class="py-2">පොතේ පිටු</v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-forum" to="/about" nuxt>
            <v-list-item-title :style="settingsStore.fontSizeStyle" class="py-2">අප ගැන</v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-cog" to="/settings">
            <template v-slot:prepend><v-icon color="primary">mdi-cog</v-icon></template>
            <v-list-item-title :style="settingsStore.fontSizeStyle" class="py-2">සැකසුම් / Settings</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
    
    <v-main>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </v-main>

  </v-layout>
  <v-snackbar app v-model="settingsStore.snackbar.model" top rounded="pill" color="info"
      :timeout="settingsStore.snackbar.timeout" >
      <div style="text-align: center;"><span>{{ settingsStore.snackbar.message }}</span></div>
  </v-snackbar>
</v-app>
</template>

<script setup>
useHead({
  titleTemplate: (titleChunk) => titleChunk ? `${titleChunk} - Arutha.lk` : 'Arutha.lk',
})
const searchTerm = ref('')
// prevent multiple searches that makes the UI sluggish when typing fast in the search box
let timeoutId
function doSearch(term) {
    if (!term.trim().length) return
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => navigateTo('/sinhala/' + term.trim()), 400)
}
function checkSearch(focused) {
    if (focused && searchTerm.value.length && !useRoute().path.includes('sinhala')) doSearch(searchTerm.value)
}
import { useSinhalaStore, dictionaryInfos } from '@/stores/sinhala'
for (const info of dictionaryInfos) {
    await useSinhalaStore(info.id).loadData()
}

import { useSavedStore, useSettingsStore } from '@/stores/savedStore'
const settingsStore = useSettingsStore(), initStoreIds = ['bookmarks']
import { useTheme, useDisplay } from 'vuetify'
const drawer = ref(useDisplay().smAndUp)

onMounted(() => {
    settingsStore.loadSettings()
    initStoreIds.forEach(id => useSavedStore(id).loadState())

    console.log(`settings darkMode = ${settingsStore.settings.darkMode}`)
    useTheme().global.name.value = settingsStore.settings.darkMode ? 'dark' : 'light'
})
</script>

<style>
@font-face { src: local('###'), url('/fonts/UN-Abhaya.ttf') format('truetype'); font-weight: normal; font-family: 'sinhala'; }
/*@font-face { src: local('###'), url('./assets/fonts/AbhayaLibre-SemiBold.ttf') format('truetype'); font-weight: bold; font-family: 'sinhala'; }*/
@font-face { src: local('###'), url('/fonts/UN-Alakamanda-4-95.ttf') format('truetype'); font-weight: normal; font-family: 'styled'; }
@font-face { src: local('###'), url('/fonts/AbhayaLibre-SemiBold.ttf') format('truetype'); font-weight: normal; font-family: 'heading2'; }
body {
  font-family: 'sinhala';
}
.app-title { font-family: styled; }
div.nav-title { font-size: 18px; padding: 1rem 0rem 1rem 0rem; }
</style>
