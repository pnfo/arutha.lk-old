// just a helper function to keep the meta tags in one place
export function getSeoTags(title, description) {
    return {
        title, description, ogTitle: title, ogDescription: description, 
        ogImage: 'https://arutha.lk/og-image.jpg'
    }
}

import { useSavedStore, useSettingsStore } from '@/stores/savedStore'

export function toggleBookmark(word, isStarred) {
    const settingsStore = useSettingsStore(), bookmarksStore = useSavedStore('bookmarks')
    if (isStarred) {
        bookmarksStore.unsetState(word)
        settingsStore.setSnackbar({ param: word, type: 'bookmark-removed' })
    } else {
        bookmarksStore.setState(word, {time: Date.now(), coll: 'dict'})
        settingsStore.setSnackbar({ param: word, type: 'bookmark-added' })
    }
}

// note package.json of vue-clipboard3 need to be changed to "main": "dist/esm/index.js",
import useClipboard from 'vue-clipboard3'
export async function copyClipboard(word) {
  await useClipboard().toClipboard(`https://arutha.lk/sinhala/${word}`)
  useSettingsStore().setSnackbar({ type: 'link-copied' })
}