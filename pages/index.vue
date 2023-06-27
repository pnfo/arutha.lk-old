<script lang="js" setup>
useSeoMeta({
    title: 'Sinhala Dictionary Home',
    description: 'Arutha Sinhala Dictionary of Sri Lanka. Find meanings of Sinhala words.',
    ogImage: 'https://arutha.lk/ogimage.png'
})
import { useSettingsStore } from '@/stores/savedStore'
const settingsStore = useSettingsStore()
</script>

<template>
  <div class="ma-1" :style="settingsStore.fontSizeStyle">
    <v-sheet>
      <v-alert border variant="tonal" color="warning" icon="$warning">
        මෙම වෙබ් අඩවියේ වැඩ කටයුතු තවම අවසන් කර නැති අතර දැනට එකතු කර ඇත්තේ පළවෙනි පොතේ අ සිට න දක්වා වචන පමණක් බව කරුණාවෙන් සලකන්න.
      </v-alert>
      <div class="text-primary" style="font-size: 4em; text-align: center;">අරුත.lk</div>
      <ul class="mx-8">
        <li>සෙවීම සඳහා උඩ කොටුවේ සෙවුම් පද යොදන්න.</li>
        <li>ඉංග්‍රීසි අකුරු හෝ සිංහල අකුරු යොදා ගෙන සෙවීම සිදු කළ හැකිය. උදා. <a href="/sinhala/janaka">janaka</a>, <a href="/sinhala/ජනක">ජනක</a></li>
        <li>සෙවුම් පදයෙන් ආරම්භ වන සියලුම වචන පෙන්වන අතර සෙවුම් පදයෙන් අවසන් වීම ද සිදුවිය යුතු නම්  අගට තිත යොදන්න. උදා <a href="/sinhala/ජනක.">ජනක.</a></li>
      </ul>
      </v-sheet>
  </div>
</template>

<style scoped></style>
