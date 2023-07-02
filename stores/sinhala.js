
export const dictionaryInfos = [
    { index: 0, id: 'sankshiptha', title: 'සංක්ෂිප්ත සිංහල ශබ්දකෝෂය අ-න', icon: 'mdi-alpha-s', color: 'star' },
    { index: 1, id: 'akshara-vinyasa', title: 'අක්ෂර වින්‍යාසය ශබ්දකෝෂය', icon: 'mdi-alpha-a', color: 'success' }
]

export function useSinhalaStore(dictionaryId) {
    return defineStore(dictionaryId, () => {
        const entries = [], sanketha = {} // not reactive but const
        const loaded = ref(false), searchCache = reactive({})
        
        async function loadData() {
            try {
                const config = useRuntimeConfig()
                // if called one after the other will cause an error
                // see here https://github.com/nuxt/nuxt/issues/18539
                const [{data: dictData}, {data: sankethaData}] = await Promise.all([
                    useFetch(dictionaryId + '-dict.txt', {baseURL: config.public.baseURL}),
                    useFetch(dictionaryId + '-sanketha.json', {baseURL: config.public.baseURL})
                ])
                entries.push(...parseDictionary(dictData.value))
                Object.assign(sanketha, sankethaData.value)
                console.log(`Dict ${dictionaryId} loaded. entries: ${entries.length}, sanketha: ${Object.keys(sanketha).length}.`)
                loaded.value = true
            } catch (error) {
                console.error(`Error loading dict ${dictionaryId}:`, error);
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
    
        return { search, loadData, loaded, entries, sanketha }
    })()
}