<script lang="js" setup>
import { useSettingsStore } from '@/stores/savedStore'
import { getSeoTags } from '@/stores/utils';
const settingsStore = useSettingsStore()

useSeoMeta(getSeoTags('අරුත.lk සිංහල ශබ්දකෝෂය', 'මුල් පිටුව Home Page - අරුත.lk සිංහල ශබ්දකෝෂය. වචනවල තේරුම් අර්ථයන් සොයන්න.'))
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
        <li>ඉංග්‍රීසි අකුරු හෝ සිංහල අකුරු යොදා ගෙන සෙවීම සිදු කළ හැකිය. උදා. <NuxtLink to="/sinhala/janaka">janaka</NuxtLink>, <NuxtLink to="/sinhala/ජනක">ජනක</NuxtLink></li>
        <li>සෙවුම් පදයෙන් ආරම්භ වන සියලුම වචන පෙන්වන අතර සෙවුම් පදයෙන් අවසන් වීම ද සිදුවිය යුතු නම් අගට තිතක් යොදන්න. උදා <NuxtLink to="/sinhala/ජනක.">ජනක.</NuxtLink></li>
      </ul>
      </v-sheet>
  </div>
</template>

<style scoped></style>
