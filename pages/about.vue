<script lang="js" setup>
import { useSettingsStore } from '@/stores/savedStore'
const settingsStore = useSettingsStore()
</script>

<template>
  <v-sheet :style="settingsStore.fontSizeStyle">
    <v-alert icon="mdi-human-greeting" color="success" variant="outlined">
      තිබෙන වැරදි ගැන දැනුවත් කිරීමෙන්, අලුත් වචන සහ තේරුම් එකතු කිරීමෙන් සහ යෝජනා ඉදිරිපත් කිරීමෙන් මේ වෙබ් අඩවිය ඉදිරියට පවත්වාගෙන යාමට ඔබටත් උපකාර කළ හැකිය.
      <v-icon>mdi-email</v-icon> path.nirvana<v-icon>mdi-at</v-icon>gmail.com.
      <v-icon>mdi-github</v-icon> <a href="https://github.com/pnfo/arutha.lk">GitHub</a>
    </v-alert>
    <v-alert icon="mdi-human-male-female" color="primary" variant="tonal">
      සිංහල ශබ්දකෝෂ කාර්යාලය විසින් සකස්කල සංක්ෂිප්ත සිංහල ශබ්දකෝෂය මෙම වෙබ් අඩවිය සඳහා යොදාගෙන ඇත. ඒ ආයතනයේ සියලුම කාර්ය මණ්ඩලයට අපගේ කෘතඥතාවය ලැබිය යුතුය.
      <v-icon>mdi-hand-clap</v-icon>
    </v-alert>
  </v-sheet>
</template>

<style scoped></style>
