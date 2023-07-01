<script setup>
const route = useRoute()
import { useSinhalaStore } from '@/stores/sinhala'
import { useSettingsStore } from '@/stores/savedStore'
import { getSeoTags, copyClipboard } from '@/stores/utils';
const sinhalaStore = useSinhalaStore(), settingsStore = useSettingsStore()

const paramNum = parseInt(route.params.pageNum.trim(), 10);
const resultsPerPage = 24, pageNumber = ref(isNaN(paramNum) ? 1 : paramNum)
useSeoMeta(getSeoTags(`පොතේ ${pageNumber.value} පිටුවේ වචන`, `පොතේ ${pageNumber.value} පිටුවේ වචන - අරුත.lk සිංහල ශබ්දකෝෂය.`))

const router = useRouter()
watch(pageNumber, (pageNum, previous) => {
  if (parseInt(pageNum) && pageNum) {
    router.replace('/bookpage/' + pageNum) // this will change the addressbar without refreshing the whole page
  }
})

const numberOfPages = computed(() => Math.ceil(sinhalaStore.entries.length / resultsPerPage))
const items = computed(() => {
  const pageNum = pageNumber.value - 1
  return sinhalaStore.entries.slice(pageNum * resultsPerPage, (pageNum + 1) * resultsPerPage)
})

const pageStatus = computed(() => {
  if (items.value.length) {
    return `පොතේ ${pageNumber.value} පිටුවේ “${items.value[0].word}” වචනයේ සිට “${items.value.slice(-1)[0].word}” වචනය දක්වා වචන ${items.value.length} ක තේරුම් පහතින් බලන්න.`
  } else {
    return `පිටු අංකයේ වරදක් ඇත. 1 සිට ${numberOfPages.value} අතර විය යුතුය.`
  }
})

</script>

<template>
  <div v-if="sinhalaStore.loaded" :style="settingsStore.fontSizeStyle">
    <v-card class="ma-2">
      <v-banner icon="mdi-book-open-page-variant-outline" density="compact">
        <v-banner-text :style="settingsStore.fontSizeStyle">{{ pageStatus }}</v-banner-text>
      </v-banner>
      <v-card-actions>
        <v-slider v-model="pageNumber" color="primary" variant="compact" :min="1" :max="numberOfPages" step="10" >
            <template v-slot:prepend>
              <v-btn variant="tonal" icon="mdi-minus" color="success"
                @click="pageNumber = Math.max(1, pageNumber - 1)"></v-btn>
            </template>

            <template v-slot:append>
              <v-btn variant="tonal" icon="mdi-plus" color="success"
                @click="pageNumber = Math.min(numberOfPages, pageNumber + 1)"></v-btn>
              <v-text-field v-model="pageNumber" type="number"
                style="width: 70px" density="compact" hide-details variant="outlined"></v-text-field>
            </template>
        </v-slider>
      </v-card-actions>
    </v-card>

    <v-container fluid>
    <v-row dense>
      <v-col cols="12" sm="6" xl="4" v-for="(item, i) in items" :key="i">
        <DictionaryEntry :entry="item"></DictionaryEntry>
      </v-col>
      <v-col cols="12" sm="6" xl="4" v-if="pageNumber < numberOfPages">
        <v-btn :to="'/bookpage/' + (pageNumber + 1)" variant="tonal" size="large" append-icon="mdi-chevron-right">ඊළඟ පිටුවට</v-btn></v-col>
    </v-row>
    </v-container>
  </div>
</template>

<style scoped>

</style>