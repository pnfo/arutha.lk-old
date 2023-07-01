<script setup>
const route = useRoute()
import { getPossibleMatches, isSinglishQuery } from '@pnfo/singlish-search'
import { useSinhalaStore } from '@/stores/sinhala'
import { useSavedStore, useSettingsStore } from '@/stores/savedStore'
import { getSeoTags, copyClipboard } from '@/stores/utils';
const sinhalaStore = useSinhalaStore(), settingsStore = useSettingsStore(), 
  historyStore = useSavedStore('history')

const searchTerm = computed(() => route.params.term.trim().toLowerCase().replace(/[^a-zA-Z\u0D80-\u0DFF \.]/g, ''))
useSeoMeta(getSeoTags(`“${searchTerm.value}” සෙවුමේ ප්‍රතිඵල`, `“${searchTerm.value}” යන සෙවුම සඳහා ගැළපෙන වචන - අරුත.lk සිංහල ශබ්දකෝෂය.`))
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
  return sinhalaStore.search(regexpStr, maxResults)
  //historyStore.setState(term, results.length)
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

onMounted(() => {
  //console.log('page is mounted hook')
})
</script>

<template>
  <div v-if="sinhalaStore.loaded" :style="settingsStore.fontSizeStyle">
    <div class="ma-2">
      <v-banner :icon="'$' + searchStatus.type" :color="searchStatus.type" density="compact">
        <v-banner-text :style="settingsStore.fontSizeStyle">{{ searchStatus.text }}</v-banner-text>
        <template v-slot:actions>
          <v-btn v-if="!searchError" prepend-icon="mdi-share" @click="copyClipboard(searchTerm)">බෙදාගන්න</v-btn>
          <v-btn v-else prepend-icon="mdi-lightbulb-question" to="/about">උදව්</v-btn>
          <v-btn prepend-icon="mdi-filter">තෝරන්න</v-btn>
        </template>
      </v-banner>
    </div>

    <v-container fluid>
    <v-row dense>
    <v-col cols="12" sm="6" xl="4" v-for="(item, i) in items" :key="i">
      <DictionaryEntry :entry="item"></DictionaryEntry>
    </v-col>
    </v-row>
    </v-container>
  </div>
</template>

<style scoped>

</style>