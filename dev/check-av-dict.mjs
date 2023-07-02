/**
 * this script simply checks the data file for possible errors which need to be fixed
 * the text file needs to be read and parsed by the website directly
 */
import fs from 'fs'

const sanketha = JSON.parse(fs.readFileSync('public/akshara-vinyasa-sanketha.json'))
const entries = fs.readFileSync('public/akshara-vinyasa-dict.txt', 'utf-8').split('\n\n')
    .map(g => g.split('\n').map(l => l.trim())).map(g => ({word: g[0], meaning: g.slice(1)}))

console.log(`found ${entries.length} entries`)
const sankethaCounts = {}

const json = entries.forEach(({word, meaning}) => {
    if (word.includes('[') || word.includes(' (')) console.log(`brackets in word ${word}`)
    const subWords = word.split(', ')
    if (subWords.length != word.split(',').length) console.log(`does not have space after comma in ${word}`)
    if (subWords.length > 1 && subWords.filter(w => w.length <= 2).length) console.log(`short word part in ${word}`)
    if (!meaning.length) console.log(`empty meaning for word ${word}`)
    if (meaning.length != 1) console.log(`meaning too many lines in word ${word}, ${meaning.length}`)
    if (!meaning[0].startsWith('[')) console.log(`meaning does not start with [ for ${word}`)
    
    meaning.forEach(line => {
        [...line.matchAll(/\[([^\]\+]+)\]/g)].map(m => m[1]).forEach(san => {
            if (!sanketha[san]) console.log(`sanketha ${san} not found. in word ${word}`)
            sankethaCounts[san] = (sankethaCounts[san] || 0) + 1
        })
    })
    meaning.forEach(line => {
        [...line.matchAll(/\([^\)]*?(\S+?\.) .*?\)/g)].map(m => m[1]).forEach(san => {
            if (!sanketha[san]) console.log(`sanketha ${san} not found. in word ${word}`)
            sankethaCounts[san] = (sankethaCounts[san] || 0) + 1
        })
    })
    
    return [word, meaning]
})

fs.writeFileSync(`dev/sanketha-counts-av.csv`, Object.entries(sankethaCounts)
    .sort((a, b) => a[0].localeCompare(b[0])).map(pair => pair.join(',')).join('\n'), 'utf-8')
// fs.writeFileSync(`dev/sanketha-counts-round.csv`, Object.entries(sankethaCountsRound)
//     .sort((a, b) => a[0].localeCompare(b[0])).map(pair => pair.join(',')).join('\n'), 'utf-8')

// write sitemap file
const numEntriesPerPage = 24, numPages = Math.ceil(entries.length / numEntriesPerPage), sitemapLines = []
for (let i = 1; i <= numPages; i++) sitemapLines.push(`https://arutha.lk/bookpage/akshara-vinyasa/${i}`)
fs.writeFileSync('public/sitemap-akshara-vinyasa.txt', sitemapLines.join('\n'), 'utf-8')