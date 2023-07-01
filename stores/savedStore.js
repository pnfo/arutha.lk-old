

// export factory function for creating dynamic stores
export function useSavedStore(storeId, initialObject = {}) {
    return defineStore(storeId, () => {
        const state = reactive({}), isLoaded = ref(false)
        
        function loadState() {
            if (process.server || isLoaded.value) return // only call this from client and once
            const stateStr = localStorage.getItem(storeId)
            Object.assign(state, stateStr ? JSON.parse(stateStr) : initialObject)
            console.log(`${storeId} state loaded from ${stateStr || 'initial object'}`)
            isLoaded.value = true
        }
    
        function setState(name, value) {
            state[name] = value
            // do not save if not already read from storage
            if (process.client && isLoaded.value) localStorage.setItem(storeId, JSON.stringify(state))
        }
        function unsetState(name) {
            delete state[name]
            if (process.client && isLoaded.value) localStorage.setItem(storeId, JSON.stringify(state))
        }
      
        return { loadState, setState, unsetState, state }
    })()
}

const snackbarTypeToMsg = {
    'link-copied': 'සබැඳිය පිටපත් විය. ඔබට අවශ්‍ය තැනක අලවන්න.',
    'content-copied': 'ඡේදයේ අන්තර්ගතය පිටපත් විය. අවශ්‍ය තැනක අලවන්න.',
    'bookmark-added': '“param” යන වචනයට තරු ලකුණක් එක් කළා.',
    'bookmark-removed': '“param” යන වචනයෙන් තරු ලකුණ ඉවත් කළා.',
}
export const useSettingsStore = defineStore('settings-parent', () => {
    const savedStore = useSavedStore('settings', {
        darkMode: true,
        fontSize: 0, // use as fontSize: 18 + state.fontSize + 'px'
        count: 0,
    }), snackbar = reactive({model: false})

    const doubleCount = computed(() => savedStore.state.count * 2)
    function increment() {
        savedStore.setState('count', savedStore.state.count + 1)
    }

    const fontSizeStyle = computed(() => ({fontSize: 18 + savedStore.state.fontSize + 'px'}))
    function loadSettings() {
        savedStore.loadState()
    }

    function setSetting(name, value) {
        savedStore.setState(name, value)
    }

    function setSnackbar({ timeout, message, type, param }) {
        if (!message && type) message = snackbarTypeToMsg[type]
        if (param && message) message = message.replace(/param/g, param)
        if (message) {
            Object.assign(snackbar, { model: true, timeout: timeout || 2000, message })
        }
    }

    return { doubleCount, increment, 
        loadSettings, setSetting, settings: savedStore.state, fontSizeStyle, 
        setSnackbar, snackbar }
})