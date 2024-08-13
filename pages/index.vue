<script lang="js" setup>
import { useSettingsStore } from '@/stores/savedStore'
import { getSeoTags } from '@/stores/utils';
const settingsStore = useSettingsStore()

useSeoMeta(getSeoTags('අරුත.lk සිංහල ශබ්දකෝෂය', 'මුල් පිටුව Home Page - අරුත.lk සිංහල ශබ්දකෝෂය. වචනවල තේරුම් අර්ථයන් සොයන්න.'))

const examples = [
  ['alu.', 'අලු, අළු'],
  ['nuvana.', 'නුවණ, නුවන'],
  ['kala.', 'කල, කලා, කාල, කළ, කාළ, කළා'],
  ['naengu', 'නැඟු..., නැංගු...'],
  ['samkra', 'සංක්‍ර..., සංක්‍රා...'],
  ['krumiya', 'කෘමියා']
]
</script>

<template>
  <div class="ma-1" :style="settingsStore.fontSizeStyle">
    <v-sheet>
      <v-alert border variant="tonal" color="warning" icon="$warning">
        මෙම ශබ්දකෝෂයේ පාරිභාෂික වචන 5600 පමණ තිබෙන නමුත් ඉන් බොහොමයක් වචන වලට අදාළ ඉංග්‍රීසි වචන ඇතුළත් වී නොමැත. මේ වචන ඇතුළු කිරීමට ඔබට උපකාර කළ හැකි නම්
        <v-icon>mdi-email</v-icon> path.nirvana<v-icon>mdi-at</v-icon>gmail.com වෙත පණිවුඩයක් එවන්න.
      </v-alert>
      <div class="text-primary" style="font-size: 4em; text-align: center;">අරුත.lk</div>
      <ul class="mx-8">
        <li>සෙවීම සඳහා උඩ කොටුවේ සෙවුම් පද යොදන්න.</li>
        <li>ඉංග්‍රීසි අකුරු හෝ සිංහල අකුරු යොදා ගෙන සෙවීම සිදු කළ හැකිය. උදා. <NuxtLink to="/sinhala/janaka">janaka</NuxtLink>, <NuxtLink to="/sinhala/ජනක">ජනක</NuxtLink></li>
        <li>සෙවුම් පදයෙන් ආරම්භ වන සියලුම වචන පෙන්වන අතර සෙවුම් පදයෙන් අවසන් වීම ද සිදුවිය යුතු නම් අගට තිතක් යොදන්න. උදා <NuxtLink to="/sinhala/ජනක.">ජනක.</NuxtLink></li>
        <li>අක්ෂර වින්‍යාසය හෝ නණලළ භේදය නොසලකා සෙවීම කළ යුතු නම් ඉංග්‍රීසි අකුරු යොදාගන්න. උදා <NuxtLink to="/sinhala/naya.">naya.</NuxtLink> යන සෙවුම මගින් “නය” සහ “ණය” යන වචන දෙකටම අදාළ ප්‍රතිඵල ලැබේ.
          එමගින් යම් වචනයක නිවැරදි අක්ෂර වින්‍යාසය ඔබට සොයාගත හැකිය.</li>
      </ul>
  
      <v-table style="max-width: 600px;" density="compact" class="my-3">
        <thead>
          <tr>
            <th>ඉංග්‍රීසියෙන් සොයන අයුරු</th>
            <th>සිංහලෙන් ලැබෙන ප්‍රතිඵල</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="([first, second], i) in examples" :key="i">
            <th class="text-subtitle-1"><NuxtLink :to="'/sinhala/' + first" style="text-decoration: none;">{{ first }}</NuxtLink></th>
            <th>{{ second }}</th>
          </tr>
        </tbody>
      </v-table>
      </v-sheet>
  </div>
</template>

<style scoped></style>
