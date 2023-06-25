<script setup>
const route = useRoute()
import { getPossibleMatches, isSinglishQuery } from '@pnfo/singlish-search'
import { useSinhalaStore } from '@/stores/sinhala'
import { useSavedStore, useSettingsStore } from '@/stores/savedStore'
const store = useSinhalaStore(), settingsStore = useSettingsStore(), historyStore = useSavedStore('history')

const searchTerm = computed(() => route.params.term.trim())

const items = computed(() => {
  const term = searchTerm.value
  const matches = isSinglishQuery(term) ? getPossibleMatches(term) : [term]
  const regexpStr = `^(${matches.join('|')})`

  const pattern = /(^\d+\. ?|\[.*?\]|\(.*?\.\))/g, sankhethaPatttern = /\[.*?\]|\(.*?\.\)/
  const results = store.search(regexpStr, 50)
  historyStore.setState(term, results.length)

  return results.map(prop => ({...prop, meaning: prop.meaning.map(l => l.split(pattern)
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

onMounted(() => {
  console.log('page is mounted hook')
})
</script>

<template>
    <div v-if="store.loaded" :style="settingsStore.fontSizeStyle">
      <div class="ma-2">
        <v-alert v-if="items.length == 0" color="error" icon="$error" density="compact"
          :text="`“${searchTerm}” යන සෙවුම සඳහා ගැළපෙන වචන ශබ්දකෝෂ වල අඩංගු නොවේ.`"></v-alert>
        <v-alert v-else-if="items.length < 50" color="success" icon="$success" density="compact"
          :text="`“${searchTerm}” යන සෙවුම සඳහා ගැළපෙන වචන ${items.length} ක් හමුවිය.`"></v-alert>
        <v-alert v-else color="warning" icon="$warning" density="compact"
          :text="`“${searchTerm}” යන සෙවුම සඳහා ගැළපෙන වචන ${items.length} ක් හමුවිය.`"></v-alert>
      </div>

      <!-- <div class="list"> -->
      <v-container fluid>
      <v-row dense>
      <v-col cols="12" sm="6" xl="4" v-for="item in items" :key="item.title">
        <!-- <div class="row ma-2" v-for="item in items" :key="item.title"> -->
        <v-card class="pa-2">
          <!-- <v-card-title> -->
          <div class="title">
            <span class="word">{{ item.words.join(', ') }}</span>
            <span v-if="item.breakup" class="breakup pl-2">{{ item.breakup }}</span>
          </div>
          <!-- </v-card-title>
          <v-card-text> -->
          <div class="meaning">
            <div v-for="(line, i) in item.meaning" :key="i">
              <span v-for="part in line" :class="part.type">
                {{ part.text }}
                <v-tooltip v-if="part.tooltip" activator="parent" color="primary" offset="-10">{{ part.tooltip }}</v-tooltip>
              </span>
            </div>
          </div>
          <!-- </v-card-text> -->
        </v-card>
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