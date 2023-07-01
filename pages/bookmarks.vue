<script lang="js" setup>
  import { useSettingsStore, useSavedStore } from '@/stores/savedStore'
  import { getSeoTags, toggleBookmark } from '@/stores/utils'
  const settingsStore = useSettingsStore(), bookmarksStore = useSavedStore('bookmarks')
  useSeoMeta(getSeoTags('තරු යෙදූ - Bookmarks', 'ඔබ විසින් තරු යොදන ලද වචන - අරුත.lk සිංහල ශබ්දකෝෂය'))

  const bookmarks = computed(() => {
    return Object.entries(bookmarksStore.state).map(([word, info]) => [word, tsToStr(info.time)])
  })
  function tsToStr(time) {
    const seconds = (Date.now() - time) / 1000
    if (60 > seconds) return `තත්පර ${Math.floor(seconds)} කට පෙර` // using less than operator (even in a comment) gives an error when dev tools are enabled
    else if (3600 > seconds) return `විනාඩි ${Math.floor(seconds / 60)} කට පෙර`
    else if (86400 > seconds) return `පැය ${Math.floor(seconds / 3600)} කට පෙර`
    else if (2592000 > seconds) return `දින ${Math.floor(seconds / 86400)} කට පෙර`
    else return `මාස ${Math.floor(seconds / 2592000)} කට පෙර`
  }
</script>

<template>
  <div :style="settingsStore.fontSizeStyle">
    <!-- {{ settingsStore.doubleCount }} -->
    <v-alert v-if="bookmarks.length" variant="tonal" color="success" icon="mdi-star">
      {{ `ඔබ විසින් තරු යෙදූ වචන ${bookmarks.length} ක් ඇත.` }}
    </v-alert>
    <v-alert v-else variant="tonal" color="warning" icon="mdi-star">
      ඔබ විසින් කිසිම වචනයක තරු යොදා නැත. සෙවුම් ප්‍රතිඵල වල තරු ලකුණ ඉදිරියේ ක්ලික් කිරීමෙන් ඒවා එකතු කර ගත හැකිය.
    </v-alert>
    <!-- <v-btn @click.stop="addBookmark(newBookmarkWord)" icon><v-icon>mdi-plus</v-icon></v-btn>
    <v-text-field v-model="newBookmarkWord"></v-text-field> -->
    <v-container fluid>
      <v-row dense>
        <v-col cols="12" sm="6" xl="4" v-for="([word, timeStr], i) in bookmarks" :key="i">
          <v-card class="px-2">
             <div class="title">
              <span class="word">{{ word }}</span>
              <span class="time pl-2">{{ timeStr }}</span>
              <v-btn icon="mdi-delete" color="error" @click="toggleBookmark(word, true)" 
                size="small" variant="plain" density="compact" class="ml-1"></v-btn>
              
              <v-btn icon="mdi-arrow-right" color="success" :to="`/sinhala/${word.split(', ')[0]}.`" 
                size="small" variant="plain" density="compact"></v-btn>
            </div> 
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.word { font-size: 1.2em; color: rgb(var(--v-theme-primary)) }
.time { font-size: 0.7em; color: rgb(var(--v-theme-secondary))}
</style>
