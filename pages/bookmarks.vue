<script lang="js" setup>
  import { useSettingsStore } from '@/stores/settings'
  const settingsStore = useSettingsStore()
  useSeoMeta({
    title: 'Bookmarks',
    ogTitle: 'My Amazing Site',
    description: 'This is my amazing site, let me tell you all about it.',
    ogDescription: 'This is my amazing site, let me tell you all about it.',
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
  })
</script>

<template>
  <div>
    {{ settingsStore.doubleCount }}
    <v-btn @click.stop="settingsStore.increment()" icon><v-icon>mdi-plus</v-icon></v-btn>
    <v-text-field v-model="settingsStore.settings.count"></v-text-field>
  </div>
</template>

<style scoped></style>
