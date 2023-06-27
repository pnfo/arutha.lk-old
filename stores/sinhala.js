
export const useSinhalaStore = defineStore('sinhala', () => {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++
    }


    const entries = [], sankhetha = {} // not reactive but const
    const loaded = ref(false), searchCache = reactive({})
    
    async function loadStrings() {
        try {
            const config = useRuntimeConfig()
            // if called one after the other will cause an error
            // see here https://github.com/nuxt/nuxt/issues/18539
            const [{data: dictData}, {data: sankhethaData}] = await Promise.all([
                useFetch('sankshiptha-1.txt', {baseURL: config.public.baseURL}),
                useFetch('sankhetha.json', {baseURL: config.public.baseURL})
            ])
            entries.push(...parseDictionary(dictData.value))
            Object.assign(sankhetha, sankhethaData.value)
            console.log(`loaded ${entries.length} dict entries, ${Object.keys(sankhetha).length} sankhetha`)
            loaded.value = true
        } catch (error) {
            console.error('Error loading strings:', error);
        }
    }
    const search = computed(() => (regexpStr, maxResults = 50) => {
        if (searchCache[regexpStr]) return searchCache[regexpStr]

        const results = [], regexp = new RegExp(regexpStr)
        if (!loaded.value) return results
        loop: for (const entry of entries) {
            if (entry.words.some(w => regexp.test(w))) {
                results.push(entry)
                if (results.length >= maxResults) break loop
            }
        }
        searchCache[regexpStr] = results
        return results
    })
    function parseDictionary(text) {
        return text.split('\n\n').map(g => g.split('\n').map(l => l.trim()))
            .map(g => {
                const breakup = /^\[.+?\+.+?\]$/.test(g[1]) ? g[1] : ''
                const meaning = breakup ? g.slice(2) : g.slice(1)
                return {word: g[0], words: g[0].split(', '), meaning, breakup}
            })
    }
  
    return { count, doubleCount, increment, search, loadStrings, loaded, sankhetha }
})