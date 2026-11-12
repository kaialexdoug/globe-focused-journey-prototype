// Fetching pictures before they're needed, so a screen opens with its
// picture already there rather than it appearing a moment later (like Find
// My Journey's, which used to take half a second). It waits until the app has
// had its first look in, so it never slows down the screen you open on, and
// fetches each picture once. They're kept, decoded and ready to draw, for as
// long as the app is open; after that the service worker has them saved.

const kept = new Map()

// When the phone isn't busy, or a moment from now where it can't say.
const whenIdle = window.requestIdleCallback ?? ((then) => setTimeout(then, 300))

export function preloadImages(urls) {
  whenIdle(() => {
    for (const url of urls) {
      if (!kept.has(url)) {
        const image = new Image()
        image.src = url
        // A picture that can't be fetched just loads as usual later.
        image.decode().catch(() => {})
        kept.set(url, image)
      }
    }
  })
}
