// Light or dark, for the whole app. It's picked in Settings and kept on this
// device (profileStore.js), with or without a profile, as how the app looks
// is down to the phone it's on. Light unless dark has been picked.
//
// It goes on the page as <html data-theme="dark">, and index.css has a dark
// value for every colour, under that. main.jsx puts it on before anything's
// drawn, so the app doesn't flash light before going dark. The maps read it
// when they're made (isDark), so a dark app gets a dark map.

// The choices, in the order Settings shows them, and what each one means.
export const THEME_CHOICES = [
  { value: 'light', label: 'Light', means: 'Dark words on a light page' },
  { value: 'dark', label: 'Dark', means: 'Light words on a dark page' },
]

// The colour the phone gives its own bars around the app, where it follows
// the page's (Android, and Safari's tabs), the same as the page's.
const BAR_COLOURS = { light: '#ffffff', dark: '#10131a' }

export function showTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', BAR_COLOURS[theme])
}

export function isDark() {
  return document.documentElement.dataset.theme === 'dark'
}
