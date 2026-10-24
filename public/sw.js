// Unfold's service worker: what lets the app be installed on a phone, open
// quickly, and still open with a weak signal.
//
// - Pages (the app itself) come from the internet first, so a new version
//   shows up as soon as it's live. The saved copy is only for when there's no
//   connection.
// - Everything else of the app's own (scripts, styles, photos, icons) comes
//   from the saved copy first, since it's fast, and is saved the first time
//   it's loaded. Vite gives scripts, styles and photos a new name whenever
//   they change, so a saved one is never out of date.
// - Anything from somewhere else is left alone, never saved: the Google Maps
//   embeds and the survey's Google Sheet, most of all. So is anything that
//   isn't just fetching (like the survey being sent, which is a POST).

// Change this (to "2", "3"...) to throw away everything saved on people's
// phones and start again, like after changing an icon or the manifest, which
// keep their names.
const CACHE_VERSION = '2'
const CACHE_NAME = `unfold-${CACHE_VERSION}`

// Where the app lives: "/globe-focused-journey-prototype/" on GitHub Pages,
// or "/" when it's run somewhere else. It's wherever this file is.
const BASE = new URL('./', self.location).pathname

// Saved as soon as the app's installed, so it opens with no connection.
const SHELL = [
  BASE,
  `${BASE}manifest.webmanifest`,
  `${BASE}favicon.png`,
  `${BASE}icons/icon-192.png`,
  `${BASE}icons/icon-512.png`,
  `${BASE}icons/maskable-512.png`,
  `${BASE}icons/apple-touch-icon.png`,
]

// The survey's Google Sheet, which must never be saved or answered from a
// saved copy. (It's on another site, so it's skipped anyway; this is in case
// that ever changes.)
const NEVER_CACHE_HOSTS = ['script.google.com', 'script.googleusercontent.com']

// GitHub Pages tells browsers they can reuse a file for 10 minutes without
// asking again. This asks again anyway, so a new version is picked up as soon
// as it's live, not up to 10 minutes later.
function fresh(url) {
  return new Request(url, { cache: 'no-cache' })
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      await cache.addAll(SHELL.map(fresh))
      // The page's own script and styles too, which it names in its HTML.
      const page = await (await cache.match(BASE)).text()
      const files = [...page.matchAll(/(?:src|href)="([^"]+\.(?:js|css))"/g)].map((match) => match[1])
      await cache.addAll(files.map(fresh))
      // A new version takes over straight away, rather than waiting until
      // every Unfold tab has been closed.
      await self.skipWaiting()
    })(),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Throw away what older versions saved.
      const names = await caches.keys()
      await Promise.all(
        names.filter((name) => name.startsWith('unfold-') && name !== CACHE_NAME).map((name) => caches.delete(name)),
      )
      // And look after pages that are already open.
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)

  if (request.method !== 'GET') {
    return
  }
  if (url.origin !== self.location.origin || NEVER_CACHE_HOSTS.includes(url.hostname)) {
    return
  }
  if (!url.pathname.startsWith(BASE)) {
    return
  }

  if (request.mode === 'navigate') {
    event.respondWith(fromNetworkFirst(request))
  } else {
    event.respondWith(fromCacheFirst(request))
  }
})

// The app itself: the latest from the internet, saved over the old copy, or
// the saved copy if there's no connection.
async function fromNetworkFirst(request) {
  const cache = await caches.open(CACHE_NAME)
  try {
    const response = await fetch(fresh(request.url))
    if (response.ok) {
      // The app's only page, whatever's after it in the address.
      cache.put(BASE, response.clone())
    }
    return response
  } catch (error) {
    const saved = await cache.match(BASE)
    if (saved) {
      return saved
    }
    throw error
  }
}

// Scripts, styles, photos and icons: the saved copy, or else from the
// internet, saved for next time.
async function fromCacheFirst(request) {
  const cache = await caches.open(CACHE_NAME)
  const saved = await cache.match(request)
  if (saved) {
    return saved
  }
  const response = await fetch(request)
  if (response.ok && response.type === 'basic') {
    cache.put(request, response.clone())
  }
  return response
}
