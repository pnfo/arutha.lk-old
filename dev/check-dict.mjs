/**
 * this script simply checks the data file for possible errors which need to be fixed
 * the text file needs to be read and parsed by the website directly
 */
import fs from 'fs'

const sankhetha = JSON.parse(fs.readFileSync('public/sankhetha.json'))
const entries = fs.readFileSync('public/sankshiptha-1.txt', 'utf-8').split('\n\n')
    .map(g => g.split('\n').map(l => l.trim())).map(g => ({word: g[0], meaning: g.slice(1)}))

console.log(`found ${entries.length} entries`)
const sankhethaCountsSquare = {}, sankhethaCountsRound = {}

const json = entries.forEach(({word, meaning}) => {
    if (word.includes('[') || word.includes(' (')) console.log(`brackets in word ${word}`)
    const subWords = word.split(',')
    if (subWords.length > 1 && subWords.filter(w => w.length <= 2).length) console.log(`short word part in ${word}`)
    if (!meaning.length) console.log(`empty meaning for word ${word}`)
    const shortMeaning = meaning.filter(l => l.length < 10 && !l.includes('['))
    if (shortMeaning.length) console.log(`short line in meaning of word ${word}`)
    if (meaning.length > 20) console.log(`meaning too many lines in word ${word}, ${meaning.length}`)
    if (meaning.findIndex(l => l.includes('+')) > 0) console.log(`+ found on a later line ${word}`)
    
    meaning.forEach(line => {
        [...line.matchAll(/\[([^\]\+]+)\]/g)].map(m => m[1]).forEach(san => {
            if (!sankhetha[san]) console.log(`sankhetha ${san} not found. in word ${word}`)
            sankhethaCountsSquare[san] = (sankhethaCountsSquare[san] || 0) + 1
        })
    })
    meaning.forEach(line => {
        [...line.matchAll(/\(([^\)= ]+\.)\)/g)].map(m => m[1]).forEach(san => {
            if (!sankhetha[san]) console.log(`sankhetha ${san} not found. in word ${word}`)
            sankhethaCountsRound[san] = (sankhethaCountsRound[san] || 0) + 1
        })
    })
    
    return [word, meaning]
})

fs.writeFileSync(`dev/sankhetha-counts-square.csv`, Object.entries(sankhethaCountsSquare)
    .sort((a, b) => a[0].localeCompare(b[0])).map(pair => pair.join(',')).join('\n'), 'utf-8')
fs.writeFileSync(`dev/sankhetha-counts-round.csv`, Object.entries(sankhethaCountsRound)
    .sort((a, b) => a[0].localeCompare(b[0])).map(pair => pair.join(',')).join('\n'), 'utf-8')