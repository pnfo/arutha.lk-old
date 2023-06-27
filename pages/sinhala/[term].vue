<script setup>
const route = useRoute()
import { getPossibleMatches, isSinglishQuery } from '@pnfo/singlish-search'
import { useSinhalaStore } from '@/stores/sinhala'
import { useSavedStore, useSettingsStore } from '@/stores/savedStore'
const store = useSinhalaStore(), settingsStore = useSettingsStore(), 
  historyStore = useSavedStore('history'), bookmarksStore = useSavedStore('bookmarks')

const searchTerm = computed(() => route.params.term.trim().toLowerCase().replace(/[^a-zA-Z\u0D80-\u0DFF \.]/g, ''))
const searchError = ref('')
const maxResults = 50

const items = computed(() => {
  const exact = searchTerm.value.endsWith('.')  ///^'.*'$/.test(searchTerm.value)
  const term = exact ? searchTerm.value.slice(0, -1) : searchTerm.value // replace(/^'?(.*?)'?$/, '$1')
  const matches = isSinglishQuery(term) ? getPossibleMatches(term) : [term]
  if (!term.length || !matches.length || matches.length > 200) {
    searchError.value = 'input-error'
    return []
  }
  const regexpStr = `^(${matches.join('|')})${exact ? '$' : ''}`
  //console.log(regexpStr)
  const results = store.search(regexpStr, maxResults)
  //historyStore.setState(term, results.length)

  const pattern = /(^\d+\. ?|\[.*?\]|\(.*?\.\))/g, sankhethaPatttern = /\[.*?\]|\(.*?\.\)/
  return results.map(item => ({...item, starred: bookmarksStore.state[item.word], 
    lineParts: item.meaning.map(l => l.split(pattern)
      .filter(pt => pt.length).map(text => {
        let type = 'normal', tooltip
        if (sankhethaPatttern.test(text)) {
          const upart = text.slice(1, -1)
          tooltip = store.sankhetha[upart]
          if (tooltip) type = 'sankhetha'
        }
        return {type, text, tooltip}
    }))}))
})

const searchStatus = computed(() => {
  const term = searchTerm.value
  if (searchError.value == 'input-error') {
    return { text: `ඔබ විසින් ඇතුලු කළ සෙවුම් පදයේ වරදක් ඇත. පහත බොත්තම ඔබා උදව් ලබා ගන්න.`, type: 'error' }
  } else if (items.value.length == 0) {
    return { text: `“${term}” යන සෙවුම සඳහා ගැළපෙන වචන ශබ්දකෝෂ වල අඩංගු නොවේ.`, type: 'error' }
  } else if (items.value.length < maxResults) {
    return { text: `“${term}” යන සෙවුම සඳහා ගැළපෙන වචන ${items.value.length} ක් හමුවිය.`, type: 'success' }
  } else {
    return { text: `ඔබගේ “${term}” යන සෙවුම සඳහා ගැළපෙන වචන ${maxResults} කට වඩා හමුවිය. එයින් මුල් ${maxResults} පහත දැක්වේ.`, type: 'warning' }
  }
})

// note package.json of vue-clipboard3 need to be changed to "main": "dist/esm/index.js",
import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()
async function copy(word) {
  await toClipboard(`https://arutha.lk/sinhala/${word}`)
  settingsStore.setSnackbar({ type: 'link-copied' })
}
function toggleBookmark(item) {
  if (item.starred) {
    bookmarksStore.unsetState(item.word)
    settingsStore.setSnackbar({ type: 'bookmark-deleted' })
  } else {
    bookmarksStore.setState(item.word, {time: Date.now(), coll: 'dict'})
    settingsStore.setSnackbar({ type: 'bookmark-added' })
  }
}

onMounted(() => {
  //console.log('page is mounted hook')
})
</script>

<template>
    <div v-if="store.loaded" :style="settingsStore.fontSizeStyle">
      <div class="ma-2">
        <v-banner :icon="'$' + searchStatus.type" :color="searchStatus.type" density="compact">
          <v-banner-text :style="settingsStore.fontSizeStyle">{{ searchStatus.text }}</v-banner-text>
          <template v-slot:actions>
            <v-btn v-if="!searchError" prepend-icon="mdi-share" @click="copy(searchTerm)">බෙදාගන්න</v-btn>
            <v-btn v-else prepend-icon="mdi-lightbulb-question" to="/about">උදව්</v-btn>
            <v-btn prepend-icon="mdi-filter">තෝරන්න</v-btn>
          </template>
        </v-banner>
      </div>

      <v-container fluid>
      <v-row dense>
      <v-col cols="12" sm="6" xl="4" v-for="(item, i) in items" :key="i">
        <!-- <div class="row ma-2" v-for="item in items" :key="item.title"> -->
        <v-hover v-slot="{ isHovering, props }">
        <v-card class="pa-2" v-bind="props">
          <div class="title">
            <span class="word">{{ item.word }}</span>
            <span v-if="item.breakup" class="breakup pl-2">{{ item.breakup }}</span>
            <v-btn v-if="isHovering || item.starred" icon="mdi-star" color="star" @click="toggleBookmark(item)" 
              size="small" variant="plain" density="compact" class="ml-1"></v-btn>
            <v-btn v-if="isHovering" icon="mdi-share" color="info" @click="copy(item.words[0] + '.')" 
              size="small" variant="plain" density="compact"></v-btn>
          </div>
          <!-- </v-card-title>
          <v-card-text> -->
          <div class="meaning">
            <div v-for="(line, i) in item.lineParts" :key="i">
              <span v-for="part in line" :class="part.type">
                {{ part.text }}
                <v-tooltip v-if="part.tooltip" activator="parent" color="primary" offset="-10">{{ part.tooltip }}</v-tooltip>
              </span>
            </div>
          </div>
          <!-- </v-card-text> -->
        </v-card>
        </v-hover>
        <!-- </div> -->
      </v-col>
      </v-row>
      </v-container>
      <!-- </div> -->
    </div>
</template>

<style scoped>
.word { font-size: 1.2em; color: rgb(var(--v-theme-primary)) }
span.breakup {font-size: 1em; color: rgb(var(--v-theme-info)) }
span.sankhetha { font-size: 0.8em; color: rgb(var(--v-theme-success)) }
.breakup { font-size: 1em; }
.meaning { font-size: 1em; }
</style>