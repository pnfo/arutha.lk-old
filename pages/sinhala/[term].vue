<script setup>
const route = useRoute()
import { useSinhalaStore } from '@/stores/sinhala'
import { useSettingsStore } from '@/stores/settings'
const store = useSinhalaStore(), settingsStore = useSettingsStore()

const items = computed(() => {
  const pattern = /(^\d+\. ?|\[.*?\]|\(.*?\.\))/g, sankhethaPatttern = /\[.*?\]|\(.*?\.\)/
  return store.search(route.params.term)
    .map(prop => ({...prop, meaning: prop.meaning.map(l => l.split(pattern)
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
    <div v-if="store.loaded" :style="settingsStore.fontSizeStyle" class="ml-2">
      <div class="search-info">{{ `search term ${route.params.term} has ${items.length} results` }}</div>

      <div class="list">
        <div class="row ma-2" v-for="item in items" :key="item.title">
          <div class="title">
            <span class="word">{{ item.words.join(', ') }}</span>
            <span v-if="item.breakup" class="breakup pl-2">{{ item.breakup }}</span>
          </div>
          <div class="meaning">
            <div v-for="(line, i) in item.meaning" :key="i">
              <span v-for="part in line" :class="part.type">
                {{ part.text }}
                <v-tooltip v-if="part.tooltip" activator="parent" color="primary" offset="-10">{{ part.tooltip }}</v-tooltip>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.word { font-size: 1.2em; color: rgb(var(--v-theme-primary)) }
span.breakup {font-size: 1em; color: rgb(var(--v-theme-info)) }
span.sankhetha { font-size: 0.8em; color: rgb(var(--v-theme-success)) }
.breakup { font-size: 1em; }
.meaning { font-size: 1em; }
</style>