// The app's settings, all in one place: its name and tagline, its logo, and
// the addresses and keys it talks to. Change them here, and the rest of the
// app follows.
//
// Two files can't read this one, because they're plain files the browser
// fetches before the app runs. If the name changes, change it there too:
//   index.html                 the browser tab's title, and the home screen
//                              name on iPhones
//   public/manifest.webmanifest  the installed app's name, and its colours

import logo from './assets/unfold-logo.png'

export const APP_NAME = 'Unfold'
export const APP_TAGLINE = 'Curated. Authentic. Unforgettable.'
export const APP_LOGO = logo

// Google Maps Embed API, for the maps on the journey stops. It's visible to
// anyone using the app, as every embed key is, so it's locked in Google Cloud
// to this app's web address (see the checklist in the README).
export const MAPS_API_KEY = 'AIzaSyDZjr1gJKoiUhpzva9V5SBzekO-yqxXDbo'

// Where finished surveys go: the Google Apps Script web app attached to the
// survey's Google Sheet (its code is in google-apps-script/survey.gs).
export const SURVEY_URL =
  'https://script.google.com/macros/s/AKfycbzSH98EjBgXxcfZ13B5ruOcEZkJ56cR4moBZIMTF14QqAjrmSFqwtercNYgjBiHFICbOQ/exec'
