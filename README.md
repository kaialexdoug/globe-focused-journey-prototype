# Unfold

Guided journeys in Japan, starting with a day in Kawagoe. It's a phone-first
web app (React + Vite) that can be installed on a phone's home screen.

**Live:** https://kaialexdoug.github.io/globe-focused-journey-prototype/

## Working on it

```bash
npm install
npm run dev
```

`npm run dev` doesn't use the service worker, so changes show up straight
away. To try the version that installs and works offline, build it and run
that instead:

```bash
npm run build
npm run preview
```

then open http://localhost:4173/globe-focused-journey-prototype/.

## Settings

`src/config.js` has the app's name, tagline and logo, the Google Maps key, and
the survey's web app address. The name is also in `index.html` and
`public/manifest.webmanifest`, which can't read that file.

The installable-app files:

| File | What it's for |
| --- | --- |
| `public/manifest.webmanifest` | The installed app's name, colours and icons |
| `public/sw.js` | The service worker: saves the app so it opens fast and without a connection |
| `public/icons/` | Home screen icons (Android, iPhone, and "maskable" for Android's shaped icons) |
| `public/favicon.png` | The browser tab icon |
| `index.html` | Links them all, plus the iPhone settings |

## Putting it live

GitHub Pages builds and publishes the site every time `main` is pushed
(`.github/workflows/deploy.yml`). Pushing any other branch doesn't change the
live site.

1. Commit the work on its branch.
2. Switch to `main`, merge the branch in, and push `main`.
3. Watch the **Actions** tab on GitHub until "Deploy to GitHub Pages" goes
   green (a minute or two), then open the live link.

## After it's live

- [ ] **Lock the Maps key to this site.** Google Cloud Console → APIs & Services
      → Credentials → the key:
  - Application restrictions: **Websites**, and add
    `https://kaialexdoug.github.io/*`, plus `http://localhost:5173/*`,
    `http://localhost:5174/*` and `http://localhost:4173/*` for working on it.
    The whole `kaialexdoug.github.io` address is needed, not just this app's
    folder, because the map only tells Google the site's address, not the page.
  - API restrictions: only **Maps Embed API** (the simple map), **Maps
    JavaScript API** (the live map) and **Routes API** (its routes).
- [ ] **Put a cap on it.** The embedded map is free. The live map's map loads
      and routes are free up to 10,000 a month each, then charged:
  - APIs & Services → Maps JavaScript API → Quotas: map loads per day, 300.
  - The same for Routes API's route requests: 300 a day.
  - 300 a day can't reach 10,000 in a month, so it stays free. Past the limit,
    the live map shows Google's error for the rest of the day; OPEN IN GOOGLE
    MAPS still works.
  - Billing → Budgets & alerts: a small budget with email alerts, too.
- [ ] **The survey still saves.** Go through to the end on the live site, finish
      the survey, and check the new row in the Google Sheet. Delete that row
      afterwards.
- [ ] **Install it on an iPhone.** In Safari (it has to be Safari): Share →
      Add to Home Screen. Open it from the home screen: there should be no Safari
      bars, and the Unfold icon and name.
- [ ] **Install it on an Android phone.** In Chrome: ⋮ → Install app (or Add to
      Home screen).
- [ ] **On a real phone, from the live site:** start the journey, allow location
      when asked, pull up SEE DIRECTIONS and check the map shows the route,
      then tap I'M HERE. Play a narration too. (The installed app asks for
      location again, separately from the browser.)
- [ ] **On an iPhone, from the home screen:** the clock and battery sit on a
      black bar above the app, with no blur over the header and no gap under
      the navbar.

## When a phone shows an old version

The bottom of Profile → Settings says when the version on that phone was
built. Compare it with when you pushed.

The app checks for a new version every time it's opened, but phones don't
really reopen an app when you go back to it; they carry on where they left
off. To open it fresh:

- **iPhone (installed):** swipe up from the bottom and hold to see your open
  apps, swipe Unfold away, then open it again.
- **Android (installed):** the same, from the recent apps button.
- **In a browser tab:** pull down to reload.

If an old photo, icon or style hangs on:

- **For everyone:** in `public/sw.js`, change `CACHE_VERSION` (`'1'` to
  `'2'`, and so on) and push to `main`. Every phone throws away what it saved
  the next time it opens the app. Do this after changing an icon or the
  manifest.
- **On a computer:** Ctrl+Shift+R, or DevTools → Application → Storage →
  Clear site data.
- **On Android:** Chrome → Settings → Site settings → All sites →
  kaialexdoug.github.io → Delete data.
- **On an iPhone:** Settings → Safari (under Apps on newer iPhones) →
  Advanced → Website Data → remove github.io. If it's installed, delete it
  from the home screen and add it again.

## Photo credits

These photos are from Wikimedia Commons, used under their Creative Commons
licences, which ask for the photographer to be credited. They've been resized
for the app. Before a public launch, these credits should be shown in the app
too.

| Photo | Used for | Photographer | Licence |
| --- | --- | --- | --- |
| [Odawara Station - 2025 Dec 22 various 04](https://commons.wikimedia.org/wiki/File:Odawara_Station_-_2025_Dec_22_various_04.jpg) | `odawarastation-new.jpg` | Nesnad | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Odawara castle - 2025 July 23 various 02](https://commons.wikimedia.org/wiki/File:Odawara_castle_-_2025_July_23_various_02.jpg) | `odawaracastle-new.jpg` | Nesnad | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [小田原市郷土文化館2](https://commons.wikimedia.org/wiki/File:%E5%B0%8F%E7%94%B0%E5%8E%9F%E5%B8%82%E9%83%B7%E5%9C%9F%E6%96%87%E5%8C%96%E9%A4%A82.jpg) | `culturemuseum-new.jpg` | Felice Beato II | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
