<script lang="js" setup>
import { copyClipboard, toggleBookmark } from '@/stores/utils';
import { useSavedStore } from '@/stores/savedStore';
import { dictionaryInfos, useSinhalaStore } from '@/stores/sinhala';

const props = defineProps({
  entry: Object,
})
const dictInfo = computed(() => dictionaryInfos[props.entry.dict])
const bookmarksStore = useSavedStore('bookmarks')

const item = computed(() => {
  const entry = props.entry
  // TODO patterns need to be changed for the akshaya vinyasa dict. currently does not show sankheta within round brackets
  const pattern = /(^\d+\. ?|\[.*?\]|\(.*?\.\))/g, sankethaPatttern = /\[.*?\]|\(.*?\.\)/
  return {...entry, starred: bookmarksStore.state[entry.word], 
    lineParts: entry.meaning.map(l => l.split(pattern)
      .filter(pt => pt.length).map(text => {
        let type = 'normal', tooltip
        if (sankethaPatttern.test(text)) {
          const upart = text.slice(1, -1)
          tooltip = useSinhalaStore(dictInfo.value.id).sanketha[upart].title
          if (tooltip) type = 'sanketha'
        }
        return {type, text, tooltip}
    }))}
})
</script>

<template>
<div>
  <v-hover v-slot="{ isHovering, props }">
    <v-card class="pa-2" v-bind="props">

      <div class="title">
        <v-icon size="small" :color="dictInfo.color">{{ dictInfo.icon }}</v-icon>
        <span class="word">{{ item.word }}</span>
        <span v-if="item.breakup" class="breakup pl-2">{{ item.breakup }}</span>
        <v-btn v-if="isHovering || item.starred" icon="mdi-star" color="star" @click="toggleBookmark(item.word, item.starred)" 
          size="small" variant="plain" density="compact" class="ml-1"></v-btn>
        <v-btn v-if="isHovering" icon="mdi-share" color="info" @click="copyClipboard(item.words[0] + '.')" 
          size="small" variant="plain" density="compact"></v-btn>
      </div>

      <div class="meaning">
        <div v-for="(line, i) in item.lineParts" :key="i">
          <span v-for="part in line" :class="part.type">
            {{ part.text }}
            <v-tooltip v-if="part.tooltip" activator="parent" color="primary" offset="-10">{{ part.tooltip }}</v-tooltip>
          </span>
        </div>
      </div>

    </v-card>
  </v-hover>
</div>
</template>

<style scoped>
.word { font-size: 1.2em; color: rgb(var(--v-theme-primary)) }
span.breakup {font-size: 1em; color: rgb(var(--v-theme-info)) }
span.sanketha { font-size: 0.8em; color: rgb(var(--v-theme-success)) }
.breakup { font-size: 1em; }
.meaning { font-size: 1em; }
</style>
