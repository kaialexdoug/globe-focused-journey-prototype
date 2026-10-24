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
    `https://kaialexdoug.github.io/*`, `http://localhost:5173/*` and
    `http://localhost:4173/*` (the last two for working on it).
    The whole `kaialexdoug.github.io` address is needed, not just this app's
    folder, because the map only tells Google the site's address, not the page.
  - API restrictions: **Restrict key** → only **Maps Embed API**.
- [ ] **Put a cap on it.** The Maps Embed API is free at the time of writing, but
      in case that changes or the key gets used for something else:
  - Billing → Budgets & alerts: a small budget (like $5) with email alerts.
  - APIs & Services → Maps Embed API → Quotas: a daily request limit
    (like 2,000).
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
- [ ] **Light mode on an iPhone:** the clock and battery at the top are white,
      so check they're readable on the light screens.

## When a phone shows an old version

The app itself is always fetched fresh when there's a connection, so a new
version normally shows up the next time it's opened. (GitHub Pages can take
up to 10 minutes to stop handing out the old one; close it and open it again.)

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
