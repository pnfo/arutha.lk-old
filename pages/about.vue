<script lang="js" setup>
import { useSettingsStore } from '@/stores/savedStore'
import { useSinhalaStore, dictionaryInfos } from '@/stores/sinhala'
import { singlish_vowels, singlish_consonants, singlish_specials } from '@pnfo/singlish-search'
const settingsStore = useSettingsStore()
</script>

<template>
  <v-container fluid :style="settingsStore.fontSizeStyle">
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-alert icon="mdi-human-greeting" color="success" variant="outlined">
          තිබෙන වැරදි ගැන දැනුවත් කිරීමෙන්, අලුත් වචන සහ තේරුම් එකතු කිරීමෙන් සහ යෝජනා ඉදිරිපත් කිරීමෙන් මේ වෙබ් අඩවිය ඉදිරියට පවත්වාගෙන යාමට ඔබටත් උපකාර කළ හැකිය.
          <v-icon>mdi-email</v-icon> path.nirvana<v-icon>mdi-at</v-icon>gmail.com.
          <v-icon>mdi-github</v-icon> <a href="https://github.com/pnfo/arutha.lk">GitHub</a>
        </v-alert>
      </v-col>
      <v-col cols="12" sm="6">
        <v-alert icon="mdi-human-male-female" color="primary" variant="tonal">
          සිංහල ශබ්දකෝෂ කාර්යාලය විසින් සකස්කල සිංහල ශබ්දකෝෂ මෙම වෙබ් අඩවිය සඳහා යොදාගෙන ඇත. ඒ ආයතනයේ සියලුම කාර්ය මණ්ඩලයට අපගේ කෘතඥතාවය ලැබිය යුතුය.
          <v-icon>mdi-hand-clap</v-icon>
        </v-alert>
      </v-col>
    </v-row>
    <v-row dense>

      <v-col cols="12" sm="6" xl="4">
        <v-card>
          <v-card-title class="text-success">ස්වරාක්ෂර</v-card-title>
          <v-card-text>
            <div class="mb-2">ස්වාධීනව යෙදෙන ස්වරාක්ෂර සහ ව්‍යාංජනාක්ෂර සමග යෙදෙන ස්වරාක්ෂර ඉංග්‍රීසි අකුරෙන් ලිවිය යුතු ආකාරය.</div>
            <v-table density="compact" style="font-size: 1.1em;">
              <thead>
                <tr>
                  <th class="text-primary">ස්වරාක්ෂරය</th>
                  <th class="text-primary">ඉංග්‍රීසි අකුර</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="([first, second], i) in [...singlish_vowels, ...singlish_specials]" :key="i">
                  <td>{{ first }}</td>
                  <td class="text-body-2">{{ second }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" xl="4">
        <v-card>
          <v-card-title class="text-success">ව්‍යාංජනාක්ෂර</v-card-title>
          <v-card-text>
            <div class="mb-2">ව්‍යාංජනාක්ෂර ඉංග්‍රීසි අකුරෙන් ලිවිය යුතු ආකාරය.</div>
            <v-table density="compact" style="font-size: 1.1em;">
              <thead>
                <tr>
                  <th class="text-primary">ව්‍යාංජනාක්ෂර</th>
                  <th class="text-primary">ඉංග්‍රීසි අකුර</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="([first, second], i) in singlish_consonants" :key="i">
                  <td>{{ first }}</td>
                  <td class="text-body-2">{{ second }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" xl="4" v-for="info in dictionaryInfos" :key="info.id" class="my-2">
        <v-card>
          <v-card-title class="text-success">{{ info.title + ' කෙටි යෙදුම් සූචිය' }}</v-card-title>
          <v-card-text>
            <div class="mb-2">{{ `මෙම ශබ්දකෝෂයේ වචන ${useSinhalaStore(info.id).entries.length} ක තේරුම් අන්තර්ගතව ඇත.` }}</div>
            <v-table density="compact" style="font-size: 1.1em;">
              <thead>
                <tr>
                  <th class="text-left text-primary">කෙටි යෙදුම</th>
                  <th class="text-left text-primary">විස්තරය</th>
                  <th class="text-right text-primary">යෙදුනු වාරගණන</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="({title, count}, name, i) in useSinhalaStore(info.id).sanketha" :key="i">
                  <td>{{ name }}</td>
                  <td>{{ title }}</td>
                  <td class="text-right">{{ count }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<style scoped>
table thead tr th { color: rgb(var(--v-theme-info)) }
</style>
