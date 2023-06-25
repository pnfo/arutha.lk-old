<script setup>
import { useSettingsStore } from '@/stores/savedStore'
import { useTheme } from 'vuetify'
const theme = useTheme()
const settingsStore = useSettingsStore()
const darkMode = computed({
  get() { return settingsStore.settings.darkMode },
  set(val) { 
    settingsStore.setSetting('darkMode', val)
    theme.global.name.value = val ? 'dark' : 'light'
  }
}), fontSize = computed({
  get() { return settingsStore.settings.fontSize },
  set(val) { settingsStore.setSetting('fontSize', val) },
})
</script>

<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12" sm="6" xl="4">
        <v-card>
          <v-card-title v-if="!darkMode"><v-icon class="mr-3">mdi-moon-waning-crescent</v-icon>රාත්‍රී අඳුරු තිරය</v-card-title>
          <v-card-title v-else><v-icon class="mr-3">mdi-white-balance-sunny</v-icon>දහවල් ආලෝකමත් තිරය</v-card-title>
          <v-card-text>රාත්‍රී අඳුරු තිරය සහ දහවල් ආලෝකමත් තිරය අතර මාරු වෙන්න. අඳුරු තිරය රාත්‍රියේදී ඇසට පහසුය.</v-card-text>
          <v-card-actions>
            <v-btn v-if="darkMode" @click="darkMode = false" color="primary" variant="outlined">
              <v-icon class="mr-2">mdi-white-balance-sunny</v-icon>ආලෝකමත් තිරය
            </v-btn>
            <v-btn v-else @click="darkMode = true" color="primary" variant="outlined">
              <v-icon class="mr-2">mdi-moon-waning-crescent</v-icon>අඳුරු තිරය
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" xl="4">
        <v-card>
          <v-card-title><v-icon class="mr-3">mdi-format-size</v-icon>අකුරු විශාලත්වය</v-card-title>
          <v-card-text color="info">
            <span :style="settingsStore.fontSizeStyle">නමො තස‍්ස භගවතො අරහතො</span>
          </v-card-text>
          <v-card-actions>
            <v-slider v-model="fontSize" color="primary"
              prepend-icon="mdi-minus" step="1" show-ticks="always" tick-size="6" append-icon="mdi-plus"
              thumb-label="always" :min="-5" :max="5"></v-slider>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
