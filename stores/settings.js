// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
import { useTheme } from 'vuetify'
export const useSettingsStore = defineStore('settings', () => {
    const count = ref(0)
    const name = ref('Eduardo')
    
    const doubleCount = computed(() => settings.count * 2)
    function increment() {
        setSetting('count', settings.count + 1)
    }

    const settings = reactive({ 
        darkMode: true,
        fontSize: 0, // use as fontSize: 16 + state.fontSize + 'px'
        count: 0,
    })
    const fontSizeStyle = computed(() => ({fontSize: 16 + settings.fontSize + 'px'}))
    function loadSettings() {
        if (process.server) return // only call this from client
        const settingStr = localStorage.getItem('settings')
        if (settingStr) Object.assign(settings, JSON.parse(settingStr))
        console.log(`settings loaded ${settingStr}`)
    }

    function setSetting(name, value) {
        settings[name] = value
        if (process.client) localStorage.setItem('settings', JSON.stringify(settings))
    }
    function updateDarkMode() {
        if (process.server) return // only call this from client
        const theme = useTheme()
        console.log(`settings dark mode = ${settings.darkMode}`)
        theme.global.name.value = settings.darkMode ? 'dark' : 'light'
    }
  
    return { doubleCount, increment, loadSettings, setSetting, settings, fontSizeStyle }
})