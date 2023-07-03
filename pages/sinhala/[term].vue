<script setup>
const route = useRoute()
import { getPossibleMatches, isSinglishQuery } from '@pnfo/singlish-search'
import { dictionaryInfos, useSinhalaStore } from '@/stores/sinhala'
import { useSavedStore, useSettingsStore } from '@/stores/savedStore'
import { getSeoTags, copyClipboard } from '@/stores/utils';
const settingsStore = useSettingsStore(), historyStore = useSavedStore('history')

const searchTerm = computed(() => route.params.term.trim().toLowerCase().replace(/[^a-zA-Z\u0D80-\u0DFF \.]/g, ''))
useSeoMeta(getSeoTags(`“${searchTerm.value}” සෙවුමේ ප්‍රතිඵල`, `“${searchTerm.value}” යන සෙවුම සඳහා ගැළපෙන වචන - අරුත.lk සිංහල ශබ්දකෝෂය.`))
const searchError = ref('')
const maxResults = 24

const selectedDicts = computed({
  get() { return settingsStore.settings.dicts },
  set(val) { settingsStore.setSetting('dicts', val) },
})

const items = computed(() => {
  const exact = searchTerm.value.endsWith('.')  ///^'.*'$/.test(searchTerm.value)
  const term = exact ? searchTerm.value.slice(0, -1) : searchTerm.value // replace(/^'?(.*?)'?$/, '$1')
  const matches = isSinglishQuery(term) ? getPossibleMatches(term) : [term]
  if (!term.length || !matches.length || matches.length > 300) {
    console.log(matches.length)
    searchError.value = 'input-error'
    return []
  }
  const regexpStr = `^(${matches.join('|')})${exact ? '$' : ''}`, results = []
  // combine results from multiple dicts, sort and slice
  const selectedDictIds = selectedDicts.value.map(i => [dictionaryInfos[i].id, i])
  return selectedDictIds.map(([dictId, dict]) => useSinhalaStore(dictId).search(regexpStr, maxResults).map(entry => ({...entry, dict})))
    .flat().sort((a, b) => a.word.localeCompare(b.word)).slice(0, maxResults)
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
  <div :style="settingsStore.fontSizeStyle">
    <div class="ma-2">
      <v-banner :icon="'$' + searchStatus.type" :color="searchStatus.type" density="compact">
        <v-banner-text :style="settingsStore.fontSizeStyle">{{ searchStatus.text }}</v-banner-text>
        <template v-slot:actions>
          <v-btn v-if="!searchError" prepend-icon="mdi-share" @click="copyClipboard(searchTerm)" color="info">බෙදාගන්න</v-btn>
          <v-btn v-else prepend-icon="mdi-lightbulb-question" to="/about" color="warning">උදව්</v-btn>

          <v-btn prepend-icon="mdi-book-plus-multiple" color="success">ශබ්දකෝෂ
            <v-menu activator="parent" :close-on-content-click="false">
              <v-card >
                <v-card-subtitle>සෙවුම් ප්‍රතිඵල ලැබිය යුතු ශබ්දකෝෂ තෝරන්න</v-card-subtitle>
                <v-card-actions>
              <v-chip-group v-model="selectedDicts" mandatory multiple selected-class="text-primary">
                <v-chip v-for="info in dictionaryInfos" :key="info.id" filter>
                  {{ info.title }}<v-icon end :color="info.color">{{ info.icon }}</v-icon>
                </v-chip>
              </v-chip-group>
            </v-card-actions>
          </v-card>
            </v-menu>
          </v-btn>
<!--           
          <v-select label="" multiple density="compact" prepend-icon="mdi-filter" style="max-width: 200px;"
            :items="dictionaryInfos" v-model="selectedDicts" item-value="id"></v-select> -->
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