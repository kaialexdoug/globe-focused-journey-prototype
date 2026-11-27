# Unfold

Guided journeys in Japan. Two apps live here, each in its own folder:

| Folder | What it is |
| --- | --- |
| `main-app/` | Unfold itself: a phone-first web app (React + Vite) that can be installed on a phone's home screen |
| `studio/` | Unfold Studio: the Unfold team's tool for making and editing journeys (React + Vite). Only set up so far |

**Live:**

- App: https://kaialexdoug.github.io/globe-focused-journey-prototype/
- Studio: https://kaialexdoug.github.io/globe-focused-journey-prototype/studio/

"Working on it" and "Putting it live" cover both apps. The rest of this is
about the app.

## Working on it

Run these from inside the folder of the app you're working on. `npm install`
is needed once in each folder on each computer, and again after pulling if
that folder's `package.json` changed.

```bash
cd main-app
npm install
npm run dev
```

```bash
cd studio
npm install
npm run dev
```

The app opens at http://localhost:5173/globe-focused-journey-prototype/ and
the studio at http://localhost:5173/globe-focused-journey-prototype/studio/.
If both are running at once, the second one takes the next port, 5174.

The app's `npm run dev` doesn't use the service worker, so changes show up
straight away. To try the version that installs and works offline, build it and
run that instead, in `main-app`:

```bash
npm run build
npm run preview
```

then open http://localhost:4173/globe-focused-journey-prototype/.

## Settings

`main-app/src/config.js` has the app's name, tagline and logo, the Google Maps
key, and the survey's web app address. The name is also in
`main-app/index.html` and `main-app/public/manifest.webmanifest`, which can't
read that file.

The installable-app files, all in `main-app/`:

| File | What it's for |
| --- | --- |
| `public/manifest.webmanifest` | The installed app's name, colours and icons |
| `public/sw.js` | The service worker: saves the app so it opens fast and without a connection |
| `public/icons/` | Home screen icons (Android, iPhone, and "maskable" for Android's shaped icons) |
| `public/favicon.png` | The browser tab icon |
| `index.html` | Links them all, plus the iPhone settings |

## Putting it live

GitHub Pages builds both apps and publishes them together every time `main`
is pushed (`.github/workflows/deploy.yml`). The studio goes in a `studio/`
folder inside the app's site, which is why it has `/studio/` on the end of its
address. Pushing any other branch doesn't change the live site.

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

- **For everyone:** in `main-app/public/sw.js`, change `CACHE_VERSION` (`'1'` to
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
| [Hojo Soun memorial - Odawara, Japan - DSC06222](https://commons.wikimedia.org/wiki/File:Hojo_Soun_memorial_-_Odawara,_Japan_-_DSC06222.jpg) | `odawara/soun-statue.jpg` | Daderot | [Public domain](https://en.wikipedia.org/wiki/Public_domain) |
| [Odawara-Juku-Nariwai-Koryukan](https://commons.wikimedia.org/wiki/File:Odawara-Juku-Nariwai-Koryukan.jpg) | `odawara/nariwai.jpg` | 箱板 | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [161223 Hotoku-Ninomiya-jinja Odawara Japan02n](https://commons.wikimedia.org/wiki/File:161223_Hotoku-Ninomiya-jinja_Odawara_Japan02n.jpg) | `odawara/hotoku-ninomiya.jpg` | 663highland | [CC BY 2.5](https://creativecommons.org/licenses/by/2.5) |
| [Uirou-Honten](https://commons.wikimedia.org/wiki/File:Uirou-Honten.jpg) | `odawara/uiro.jpg` | のりまき | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Kamakura station east](https://commons.wikimedia.org/wiki/File:Kamakura_station_east.jpg) | `kamakura/station.jpg` | Douglaspperkins | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [Kamakura Komachi street 2024](https://commons.wikimedia.org/wiki/File:Kamakura_Komachi_street_2024.jpg) | `kamakura/komachi-dori.jpg` | ARandomName123 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Tsurugaoka Hachimangu 001](https://commons.wikimedia.org/wiki/File:Tsurugaoka_Hachimangu_001.jpg) | `kamakura/hachimangu.jpg` | Ocdp | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Hokokuji bamboo forest (5712271526)](https://commons.wikimedia.org/wiki/File:Hokokuji_bamboo_forest_(5712271526).jpg) | `kamakura/hokokuji.jpg` | KimonBerlin | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Great Buddha at Kōtoku-in 20190421 1](https://commons.wikimedia.org/wiki/File:Great_Buddha_at_K%C5%8Dtoku-in_20190421_1.jpg) | `kamakura/great-buddha.jpg` | DXR | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Yuigahama 02](https://commons.wikimedia.org/wiki/File:Yuigahama_02.jpg) | `kamakura/yuigahama.jpg` | akira yamada | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Zeniarai Benzaiten Kamakura](https://commons.wikimedia.org/wiki/File:Zeniarai_Benzaiten_Kamakura.jpg) | `kamakura/zeniarai-benten.jpg` | Tarourashima | [Public domain](https://en.wikipedia.org/wiki/Public_domain) |
| [Jōmyō-ji, Main Hall 001](https://commons.wikimedia.org/wiki/File:J%C5%8Dmy%C5%8D-ji,_Main_Hall_001.jpg) | `kamakura/jomyoji.jpg` | Naokijp | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Kenchoji Sanmon 2009](https://commons.wikimedia.org/wiki/File:Kenchoji_Sanmon_2009.jpg) | `kamakura/kenchoji.jpg` | Wiiii | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [HasederaKannondo20120716](https://commons.wikimedia.org/wiki/File:HasederaKannondo20120716.jpg) | `kamakura/hasedera.jpg` | 三人日 | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Canal Park, Duluth (6134339345)](https://commons.wikimedia.org/wiki/File:Canal_Park,_Duluth_(6134339345).jpg) | `duluth/canal-park.jpg` | Sharon Mollerus | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Aerial Lift Bridge centered](https://commons.wikimedia.org/wiki/File:Aerial_Lift_Bridge_centered.jpg) | `duluth/lift-bridge.jpg` | McGhiever | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Lakewalk, Duluth (33068803463)](https://commons.wikimedia.org/wiki/File:Lakewalk,_Duluth_(33068803463).jpg) | `duluth/lakewalk.jpg` | Sharon Mollerus | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Glensheen Historic Estate](https://commons.wikimedia.org/wiki/File:Glensheen_Historic_Estate.jpg) | `duluth/glensheen.jpg` | Robyn Richardson | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Enger Observation Tower 2014-10-06 - 3](https://commons.wikimedia.org/wiki/File:Enger_Observation_Tower_2014-10-06_-_3.jpg) | `duluth/enger-tower.jpg` | August Schwerdfeger | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Park Point Beach Duluth Minnesota 15187860634](https://commons.wikimedia.org/wiki/File:Park_Point_Beach_Duluth_Minnesota_15187860634.jpg) | `duluth/park-point.jpg` | Tony Webster | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Lake Superior Maritime Visitor Center](https://commons.wikimedia.org/wiki/File:Lake_Superior_Maritime_Visitor_Center.jpg) | `duluth/maritime-center.jpg` | McGhiever | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Duluth North Pier Lighthouse](https://commons.wikimedia.org/wiki/File:Duluth_North_Pier_Lighthouse.jpg) | `duluth/north-pier-light.jpg` | McGhiever | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Fitger's Brewery](https://commons.wikimedia.org/wiki/File:Fitger%27s_Brewery.jpg) | `duluth/fitgers.jpg` | McGhiever | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Hakone-Yumoto-Station-Front-entrance](https://commons.wikimedia.org/wiki/File:Hakone-Yumoto-Station-Front-entrance.jpg) | `hakone/yumoto.jpg` | Kansai-good | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Hakone Open-air Museum 20211202-5](https://commons.wikimedia.org/wiki/File:Hakone_Open-air_Museum_20211202-5.jpg) | `hakone/open-air-museum.jpg` | Suicasmo | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Owakudani Valley and Mount Kammurigatake near Owakudani Station 2](https://commons.wikimedia.org/wiki/File:Owakudani_Valley_and_Mount_Kammurigatake_near_Owakudani_Station_2.JPG) | `hakone/owakudani.jpg` | そらみみ | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Hakone Sekisho](https://commons.wikimedia.org/wiki/File:Hakone_Sekisho.jpg) | `hakone/checkpoint.jpg` | Steph Gray from London, United Kingdom | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Torii on Lake Ashi @ Hakone Shrine (13776878594)](https://commons.wikimedia.org/wiki/File:Torii_on_Lake_Ashi_@_Hakone_Shrine_(13776878594).jpg) | `hakone/hakone-shrine.jpg` | Guilhem Vellut from Annecy, France | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Old Tokaido - Hakone](https://commons.wikimedia.org/wiki/File:Old_Tokaido_-_Hakone.jpg) | `hakone/cedar-avenue.jpg` | Quercus acuta | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Gōra Park 20090818 02](https://commons.wikimedia.org/wiki/File:G%C5%8Dra_Park_20090818_02.jpg) | `hakone/gora-park.jpg` | 掬茶 | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [View of Mount HakoneKomagatake from Onshi-Hakone-Koen Park](https://commons.wikimedia.org/wiki/File:View_of_Mount_HakoneKomagatake_from_Onshi-Hakone-Koen_Park.jpg) | `hakone/onshi-hakone-park.jpg` | Quercus acuta | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [20250103 Motomachi, Yokohama 122408](https://commons.wikimedia.org/wiki/File:20250103_Motomachi,_Yokohama_122408.jpg) | `yokohama/motomachi.jpg` | Matthide127 | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Yokohama Chinatown 9](https://commons.wikimedia.org/wiki/File:Yokohama_Chinatown_9.jpg) | `yokohama/chinatown.jpg` | Syced | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [English Rose Park 2, Yokohama Harbor View Park](https://commons.wikimedia.org/wiki/File:English_Rose_Park_2,_Yokohama_Harbor_View_Park.jpg) | `yokohama/harbor-view-park.jpg` | Yoshi Canopus | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Yamashita Park Hikawa Maru (49820922166)](https://commons.wikimedia.org/wiki/File:Yamashita_Park_Hikawa_Maru_(49820922166).jpg) | `yokohama/hikawa-maru.jpg` | Steven Byles from Yokohama, Japan | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Osanbashi Pier @ Yokohama (9052350399)](https://commons.wikimedia.org/wiki/File:Osanbashi_Pier_@_Yokohama_(9052350399).jpg) | `yokohama/osanbashi.jpg` | Guilhem Vellut from Annecy, France | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Yokohama Red Brick Warehouse 2](https://commons.wikimedia.org/wiki/File:Yokohama_Red_Brick_Warehouse_2.jpg) | `yokohama/red-brick.jpg` | Syced | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [The Yokohama Foreign General Cemetery](https://commons.wikimedia.org/wiki/File:The_Yokohama_Foreign_General_Cemetery.jpg) | `yokohama/foreign-cemetery.jpg` | Kakidai | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Yokohama-Kanteibyo](https://commons.wikimedia.org/wiki/File:Yokohama-Kanteibyo.JPG) | `yokohama/kanteibyo.jpg` | Iokseng | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Yokohama Igirisukan](https://commons.wikimedia.org/wiki/File:Yokohama_Igirisukan.jpg) | `yokohama/british-house.jpg` | Kakidai | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Hotel New Grand Yokohama 2009](https://commons.wikimedia.org/wiki/File:Hotel_New_Grand_Yokohama_2009.jpg) | `yokohama/hotel-new-grand.jpg` | Wiiii | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Zounohana pier (Port of Yokohama)](https://commons.wikimedia.org/wiki/File:Zounohana_pier_(Port_of_Yokohama).JPG) | `yokohama/zo-no-hana.jpg` | 妖精書士 | [Public domain](https://en.wikipedia.org/wiki/Public_domain) |
| [Cupnoodles-Museum-Yokohama](https://commons.wikimedia.org/wiki/File:Cupnoodles-Museum-Yokohama.jpg) | `yokohama/cup-noodles-museum.jpg` | Rs1421 | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Keisei Nippori-STA Outside West](https://commons.wikimedia.org/wiki/File:Keisei_Nippori-STA_Outside_West.jpg) | `yanaka/nippori.jpg` | MaedaAkihiko | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Yanaka 20130326 155108](https://commons.wikimedia.org/wiki/File:Yanaka_20130326_155108.jpg) | `yanaka/cemetery.jpg` | Ka23 13 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Yanaka Ginza entrance](https://commons.wikimedia.org/wiki/File:Yanaka_Ginza_entrance.jpg) | `yanaka/yanaka-ginza.jpg` | 1904.CC | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Tokyo - Yanaka 064 - SCAI The Bathhouse (15187739194)](https://commons.wikimedia.org/wiki/File:Tokyo_-_Yanaka_064_-_SCAI_The_Bathhouse_(15187739194).jpg) | `yanaka/scai.jpg` | Joe Mabel on Flickr as Joe Mabel from Seattle, US | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Entrance to The Path of Torii in Nezu Shrine Tokyo](https://commons.wikimedia.org/wiki/File:Entrance_to_The_Path_of_Torii_in_Nezu_Shrine_Tokyo.jpg) | `yanaka/nezu-shrine.jpg` | Charlie fong | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Shinobazu Pond](https://commons.wikimedia.org/wiki/File:Shinobazu_Pond.jpg) | `yanaka/shinobazu.jpg` | Fred Cherrygarden | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Tenno-ji by kolshica in Yanaka, Tokyo 2](https://commons.wikimedia.org/wiki/File:Tenno-ji_by_kolshica_in_Yanaka,_Tokyo_2.jpg) | `yanaka/tennoji.jpg` | kolshica from Buddhist temple Tenno-ji in Yanaka, Taito, Tokyo | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Asakura Museum of Sculpture - 20161122](https://commons.wikimedia.org/wiki/File:Asakura_Museum_of_Sculpture_-_20161122.jpg) | `yanaka/asakura-museum.jpg` | Calton | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Kiyomizu Kannon-dō in Ueno Park (50786353997)](https://commons.wikimedia.org/wiki/File:Kiyomizu_Kannon-d%C5%8D_in_Ueno_Park_(50786353997).jpg) | `yanaka/kiyomizu-kannon-do.jpg` | Real Estate Japan from Tokyo, Japan | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Ueno 20241210 133139](https://commons.wikimedia.org/wiki/File:Ueno_20241210_133139.jpg) | `yanaka/ameyoko.jpg` | Ka23 13 | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Around Takaosanguchi station 4](https://commons.wikimedia.org/wiki/File:Around_Takaosanguchi_station_4.jpg) | `takao/station.jpg` | Syced | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Around Takaosanguchi station 5](https://commons.wikimedia.org/wiki/File:Around_Takaosanguchi_station_5.jpg) | `takao/cable-car.jpg` | Syced | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Yakuoin Temple @ Mount Takao (13778522205)](https://commons.wikimedia.org/wiki/File:Yakuoin_Temple_@_Mount_Takao_(13778522205).jpg) | `takao/yakuoin.jpg` | Guilhem Vellut from Annecy, France | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Japanese Macaque Monkeys, in Mt Takao Monkey Park, 2024](https://commons.wikimedia.org/wiki/File:Japanese_Macaque_Monkeys,_in_Mt_Takao_Monkey_Park,_2024.jpg) | `takao/monkey-park.jpg` | Klaasjeoranje | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Summit @ Mount Takao (9876506485)](https://commons.wikimedia.org/wiki/File:Summit_@_Mount_Takao_(9876506485).jpg) | `takao/summit.jpg` | Guilhem Vellut from Annecy, France | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Keio-Takaosan-Onsen-Gokurakuyu](https://commons.wikimedia.org/wiki/File:Keio-Takaosan-Onsen-Gokurakuyu.jpg) | `takao/gokurakuyu.jpg` | Thirteen-fri | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Takao 599 Museum-1](https://commons.wikimedia.org/wiki/File:Takao_599_Museum-1.jpg) | `takao/takao-599-museum.jpg` | 江戸村のとくぞう | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Momijidai @ Mount Takao (11094620276)](https://commons.wikimedia.org/wiki/File:Momijidai_@_Mount_Takao_(11094620276).jpg) | `takao/momijidai.jpg` | Guilhem Vellut from Annecy, France | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Tobu Nikko Station, ekisha](https://commons.wikimedia.org/wiki/File:Tobu_Nikko_Station,_ekisha.jpg) | `nikko/station.jpg` | Saigen Jiro | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Shinkyo Bridge over the Daiya River at Nikko, Japan3](https://commons.wikimedia.org/wiki/File:Shinkyo_Bridge_over_the_Daiya_River_at_Nikko,_Japan3.jpg) | `nikko/shinkyo.jpg` | Joli Rumi | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Nikkosan Rinnoji Temple, Nikko, Japan](https://commons.wikimedia.org/wiki/File:Nikkosan_Rinnoji_Temple,_Nikko,_Japan.jpg) | `nikko/rinnoji.jpg` | Joli Rumi | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Nikko Mausoleum Rin-no-ji Taiyuin Heiligtum Kara-mon 1](https://commons.wikimedia.org/wiki/File:Nikko_Mausoleum_Rin-no-ji_Taiyuin_Heiligtum_Kara-mon_1.jpg) | `nikko/taiyuin.jpg` | Zairon | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Nikko Toshogu Yomeimon Gate 2024](https://commons.wikimedia.org/wiki/File:Nikko_Toshogu_Yomeimon_Gate_2024.jpg) | `nikko/toshogu.jpg` | Jpatokal | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Bake-jizo, Kanmangafuchi abyss](https://commons.wikimedia.org/wiki/File:Bake-jizo,_Kanmangafuchi_abyss.jpg) | `nikko/kanmangafuchi.jpg` | Miyuki Meinaka | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [JRE Nikko-STA](https://commons.wikimedia.org/wiki/File:JRE_Nikko-STA.jpg) | `nikko/jr-nikko-station.jpg` | MaedaAkihiko | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Nikko Kanaya Hotel Main Building](https://commons.wikimedia.org/wiki/File:Nikko_Kanaya_Hotel_Main_Building.jpg) | `nikko/kanaya-hotel.jpg` | Miyuki Meinaka | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Nikko Futarasan Honden M3325](https://commons.wikimedia.org/wiki/File:Nikko_Futarasan_Honden_M3325.jpg) | `nikko/futarasan.jpg` | No machine-readable author provided. Fg2 assumed (based on copyright claims). | [Public domain](https://en.wikipedia.org/wiki/Public_domain) |
| [Nikko Rinno-ji (2497606621)](https://commons.wikimedia.org/wiki/File:Nikko_Rinno-ji_(2497606621).jpg) | `nikko/shoyoen.jpg` | KimonBerlin | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [JR成田駅20240503-P1041913](https://commons.wikimedia.org/wiki/File:JR%E6%88%90%E7%94%B0%E9%A7%8520240503-P1041913.jpg) | `narita/station.jpg` | くろふね | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Omotesando @ Evening @ Narita (15257653101)](https://commons.wikimedia.org/wiki/File:Omotesando_@_Evening_@_Narita_(15257653101).jpg) | `narita/omotesando.jpg` | Guilhem Vellut from Annecy, France | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Naritasan Shinshoji Temple](https://commons.wikimedia.org/wiki/File:Naritasan_Shinshoji_Temple.jpg) | `narita/shinshoji.jpg` | Manish Prabhune | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [NaritasanShodoBijutsukan20131012](https://commons.wikimedia.org/wiki/File:NaritasanShodoBijutsukan20131012.jpg) | `narita/calligraphy-museum.jpg` | 三人日 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Great Pagoda of Peace @ Naritasan Shinshoji Temple @ Narita (15262546051)](https://commons.wikimedia.org/wiki/File:Great_Pagoda_of_Peace_@_Naritasan_Shinshoji_Temple_@_Narita_(15262546051).jpg) | `narita/pagoda.jpg` | Guilhem Vellut from Annecy, France | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Kawatoyo Honten, eel restaurant in Narita 01](https://commons.wikimedia.org/wiki/File:Kawatoyo_Honten,_eel_restaurant_in_Narita_01.jpg) | `narita/kawatoyo.jpg` | Miyuki Meinaka | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Three story pagoda, Naritasan Shinshoji Temple](https://commons.wikimedia.org/wiki/File:Three_story_pagoda,_Naritasan_Shinshoji_Temple.JPG) | `narita/three-storied-pagoda.jpg` | John Hill | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Naritasan Park, Narita, Japan (5970814616)](https://commons.wikimedia.org/wiki/File:Naritasan_Park,_Narita,_Japan_(5970814616).jpg) | `narita/naritasan-park.jpg` | Peter Broster | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Seibu chichibu sta. 20180101](https://commons.wikimedia.org/wiki/File:Seibu_chichibu_sta._20180101.jpg) | `chichibu/station.jpg` | Kaze315 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Chichibu-jinja ac (10)](https://commons.wikimedia.org/wiki/File:Chichibu-jinja_ac_(10).jpg) | `chichibu/chichibu-shrine.jpg` | Asturio Cantabrio | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Chichibu Hitsujiyama Park Phlox Hill 2](https://commons.wikimedia.org/wiki/File:Chichibu_Hitsujiyama_Park_Phlox_Hill_2.JPG) | `chichibu/hitsujiyama.jpg` | 京浜にけ | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Chichibu Matsuri Kaikan](https://commons.wikimedia.org/wiki/File:Chichibu_Matsuri_Kaikan.JPG) | `chichibu/festival-hall.jpg` | あばさー | Public domain |
| [Nagatoro Iwadatami and Arakawa River (52698440642)](https://commons.wikimedia.org/wiki/File:Nagatoro_Iwadatami_and_Arakawa_River_(52698440642).jpg) | `chichibu/iwadatami.jpg` | Big Ben in Japan from Kawasaki, Japan | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Hodosan Shrine (Mt. Treasure-climb Shrine) - 宝登山神社 - panoramio (13)](https://commons.wikimedia.org/wiki/File:Hodosan_Shrine_(Mt._Treasure-climb_Shrine)_-_%E5%AE%9D%E7%99%BB%E5%B1%B1%E7%A5%9E%E7%A4%BE_-_panoramio_(13).jpg) | `chichibu/hodosan.jpg` | Carbonium | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [Hodo-Sanroku Station 01](https://commons.wikimedia.org/wiki/File:Hodo-Sanroku_Station_01.jpg) | `chichibu/hodosan-ropeway.jpg` | Suikotei | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [251128 Kusatsu Onsen Bus Terminal 01](https://commons.wikimedia.org/wiki/File:251128_Kusatsu_Onsen_Bus_Terminal_01.jpg) | `kusatsu/bus-terminal.jpg` | Aspere | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [草津・西の河原通り - panoramio](https://commons.wikimedia.org/wiki/File:%E8%8D%89%E6%B4%A5%E3%83%BB%E8%A5%BF%E3%81%AE%E6%B2%B3%E5%8E%9F%E9%80%9A%E3%82%8A_-_panoramio.jpg) | `kusatsu/sainokawara-dori.jpg` | KΛNΛTΛ | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [251129 Sainokawara Park 01](https://commons.wikimedia.org/wiki/File:251129_Sainokawara_Park_01.jpg) | `kusatsu/sainokawara-park.jpg` | Aspere | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Kusatsu Yumomi, Gunma 01](https://commons.wikimedia.org/wiki/File:Kusatsu_Yumomi,_Gunma_01.jpg) | `kusatsu/netsunoyu.jpg` | Σ64 | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [251130 Yubatake, Kusatsu 10](https://commons.wikimedia.org/wiki/File:251130_Yubatake,_Kusatsu_10.jpg) | `kusatsu/yubatake.jpg` | Aspere | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [251129 Otaki-no-yu 02](https://commons.wikimedia.org/wiki/File:251129_Otaki-no-yu_02.jpg) | `kusatsu/otakinoyu.jpg` | Aspere | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Entrance to Kosen-ji (Kusatsu)](https://commons.wikimedia.org/wiki/File:Entrance_to_Kosen-ji_(Kusatsu).JPG) | `kusatsu/kosenji.jpg` | Abasaa | [Public domain](https://en.wikipedia.org/wiki/Public_domain) |
| [西の河原露天風呂 - panoramio](https://commons.wikimedia.org/wiki/File:%E8%A5%BF%E3%81%AE%E6%B2%B3%E5%8E%9F%E9%9C%B2%E5%A4%A9%E9%A2%A8%E5%91%82_-_panoramio.jpg) | `kusatsu/sainokawara-rotenburo.jpg` | くろふね | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [Fujikyuko Shimoyoshida Sta 20161026](https://commons.wikimedia.org/wiki/File:Fujikyuko_Shimoyoshida_Sta_20161026.jpg) | `fujiyoshida/station.jpg` | Kounoichi | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Honcho Street with Mount Fuji in the daytime, Fujiyoshida, 2016](https://commons.wikimedia.org/wiki/File:Honcho_Street_with_Mount_Fuji_in_the_daytime,_Fujiyoshida,_2016.jpg) | `fujiyoshida/honcho-dori.jpg` | DimiTalen | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Torii, Arakura Fuji-sengen-jinja shrine - Dec 1, 2014](https://commons.wikimedia.org/wiki/File:Torii,_Arakura_Fuji-sengen-jinja_shrine_-_Dec_1,_2014.jpg) | `fujiyoshida/arakura-shrine.jpg` | bethom33 | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Kitaguchi Hongu Fuji Sengen jinja Torii](https://commons.wikimedia.org/wiki/File:Kitaguchi_Hongu_Fuji_Sengen_jinja_Torii.jpg) | `fujiyoshida/kitaguchi-hongu.jpg` | 江戸村のとくぞう | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Chureito Pagoda, Fujiyoshida (34126027751)](https://commons.wikimedia.org/wiki/File:Chureito_Pagoda,_Fujiyoshida_(34126027751).jpg) | `fujiyoshida/chureito.jpg` | Olivier Bruchez from Lausanne, Switzerland | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Lake Kawaguchi (Kawaguchi-ko)](https://commons.wikimedia.org/wiki/File:Lake_Kawaguchi_(Kawaguchi-ko).jpg) | `fujiyoshida/lake-kawaguchi.jpg` | ANA CARINA NOGUEIRA VASCONCELOS | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Mt Kachi Kachi Ropeway](https://commons.wikimedia.org/wiki/File:Mt_Kachi_Kachi_Ropeway.jpg) | `fujiyoshida/panoramic-ropeway.jpg` | yosshi | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Two Harbors Light Minnesota](https://commons.wikimedia.org/wiki/File:Two_Harbors_Light_Minnesota.jpg) | `north-shore/lighthouse.jpg` | pmarkham | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Edna G Tug Boat, Two Harbors -a](https://commons.wikimedia.org/wiki/File:Edna_G_Tug_Boat,_Two_Harbors_-a.jpg) | `north-shore/edna-g.jpg` | Deacon Steve Moses from Northfield, U.S.A. | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Goosberry Falls](https://commons.wikimedia.org/wiki/File:Goosberry_Falls.jpg) | `north-shore/gooseberry-falls.jpg` | ZMoreno387 | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Iona's Beach (14528338996)](https://commons.wikimedia.org/wiki/File:Iona%27s_Beach_(14528338996).jpg) | `north-shore/ionas-beach.jpg` | Justin Meissen from St Paul, United States | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Split Rock Light Station](https://commons.wikimedia.org/wiki/File:Split_Rock_Light_Station.jpg) | `north-shore/split-rock.jpg` | MichaelDPhotos | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Palisade, Shovel Point](https://commons.wikimedia.org/wiki/File:Palisade,_Shovel_Point.jpg) | `north-shore/palisade-head.jpg` | Kablammo | Public domain |
| [Two Harbors Breakwater Light](https://commons.wikimedia.org/wiki/File:Two_Harbors_Breakwater_Light.jpg) | `north-shore/breakwater-light.jpg` | Pete Markham from Loretto, USA | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [3M Museum in 2026, Two Harbors, Minnesota-02](https://commons.wikimedia.org/wiki/File:3M_Museum_in_2026,_Two_Harbors,_Minnesota-02.jpg) | `north-shore/3m-museum.jpg` | Myotus | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [DMIR Depot 004](https://commons.wikimedia.org/wiki/File:DMIR_Depot_004.JPG) | `north-shore/depot-museum.jpg` | Elkman | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Northern MN Spring 2005 099](https://commons.wikimedia.org/wiki/File:Northern_MN_Spring_2005_099.jpg) | `north-shore/tettegouche.jpg` | Desertson67 at English Wikipedia | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [U.S. Bank Stadium 2021-09-23](https://commons.wikimedia.org/wiki/File:U.S._Bank_Stadium_2021-09-23.jpg) | `minneapolis/stadium.jpg` | August Schwerdfeger | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Minneapolis April 2025 43 (Gold Medal Park)](https://commons.wikimedia.org/wiki/File:Minneapolis_April_2025_43_(Gold_Medal_Park).jpg) | `minneapolis/gold-medal-park.jpg` | Michael Barera | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Mill City Museum (22092582921)](https://commons.wikimedia.org/wiki/File:Mill_City_Museum_(22092582921).jpg) | `minneapolis/mill-city.jpg` | Greg Gjerdingen from Willmar, USA | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Guthrie Theater, 2nd Street, Mill District, Minneapolis, MN - 51780814756](https://commons.wikimedia.org/wiki/File:Guthrie_Theater,_2nd_Street,_Mill_District,_Minneapolis,_MN_-_51780814756.jpg) | `minneapolis/guthrie.jpg` | w_lemay | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Stone Arch Bridge as viewed from downriver 2019-08-08](https://commons.wikimedia.org/wiki/File:Stone_Arch_Bridge_as_viewed_from_downriver_2019-08-08.jpg) | `minneapolis/stone-arch-bridge.jpg` | August Schwerdfeger | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [St Anthony Main at night](https://commons.wikimedia.org/wiki/File:St_Anthony_Main_at_night.JPG) | `minneapolis/st-anthony-main.jpg` | Mark Vancleave (Mark.fenris at English Wikipedia) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Minneapolis-Mill Ruins Park-20070312-3](https://commons.wikimedia.org/wiki/File:Minneapolis-Mill_Ruins_Park-20070312-3.jpg) | `minneapolis/mill-ruins.jpg` | steve lyon from minneapolis, mn, usa | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Pillsbury A Mill](https://commons.wikimedia.org/wiki/File:Pillsbury_A_Mill.jpg) | `minneapolis/pillsbury-a-mill.jpg` | unknown | [Public domain](https://en.wikipedia.org/wiki/Public_domain) |
| [Nicollet Island Inn MN](https://commons.wikimedia.org/wiki/File:Nicollet_Island_Inn_MN.jpg) | `minneapolis/nicollet-island.jpg` | A.E. Crane, National Scenic Byways Online | [Public domain](https://en.wikipedia.org/wiki/Public_domain) |
| [Stillwater in September 2017 01 - riverfront](https://commons.wikimedia.org/wiki/File:Stillwater_in_September_2017_01_-_riverfront.jpg) | `stillwater/lowell-park.jpg` | Runner1928 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Stillwater in September 2017 16 - skyline from Teddy Bear Park](https://commons.wikimedia.org/wiki/File:Stillwater_in_September_2017_16_-_skyline_from_Teddy_Bear_Park.jpg) | `stillwater/main-street.jpg` | Runner1928 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Stillwater in September 2017 08 - Historic Courthouse from Veteran's Memorial](https://commons.wikimedia.org/wiki/File:Stillwater_in_September_2017_08_-_Historic_Courthouse_from_Veteran%27s_Memorial.jpg) | `stillwater/courthouse.jpg` | Runner1928 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Warden's House Museum-front](https://commons.wikimedia.org/wiki/File:Warden%27s_House_Museum-front.jpg) | `stillwater/wardens-house.jpg` | Myotus | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Stillwater Bridge (Minnesota) 1](https://commons.wikimedia.org/wiki/File:Stillwater_Bridge_(Minnesota)_1.jpg) | `stillwater/lift-bridge.jpg` | Kathleen Conklin from Falls Church, USA | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Stillwater Lift Bridge 6-23-17](https://commons.wikimedia.org/wiki/File:Stillwater_Lift_Bridge_6-23-17.jpg) | `stillwater/lift-bridge-night.jpg` | John Davis | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Isaac Staples Sawmill](https://commons.wikimedia.org/wiki/File:Isaac_Staples_Sawmill.jpg) | `stillwater/staples-sawmill.jpg` | McGhiever | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Nelson's Ice Cream](https://commons.wikimedia.org/wiki/File:Nelson%27s_Ice_Cream.jpg) | `stillwater/nelsons-ice-cream.jpg` | McGhiever | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Breadsmith, Grand Ave. St Paul 787](https://commons.wikimedia.org/wiki/File:Breadsmith,_Grand_Ave._St_Paul_787.jpg) | `st-paul/grand-avenue.jpg` | Dankarl | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [The Davidson Mansion, Summit Avenue, Cathedral Hill, Saint Paul, MN](https://commons.wikimedia.org/wiki/File:The_Davidson_Mansion,_Summit_Avenue,_Cathedral_Hill,_Saint_Paul,_MN.jpg) | `st-paul/summit-avenue.jpg` | w_lemay | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [James J. Hill House (1)](https://commons.wikimedia.org/wiki/File:James_J._Hill_House_(1).jpg) | `st-paul/hill-house.jpg` | Teemu008 | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Minnesota State Capitol - 54147672485](https://commons.wikimedia.org/wiki/File:Minnesota_State_Capitol_-_54147672485.jpg) | `st-paul/capitol.jpg` | xiquinhosilva | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Cathedral of Saint Paul (Minnesota) 5](https://commons.wikimedia.org/wiki/File:Cathedral_of_Saint_Paul_(Minnesota)_5.jpg) | `st-paul/cathedral.jpg` | AlexiusHoratius | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Saint Paul April 2025 16 (Rice Park and Landmark Center)](https://commons.wikimedia.org/wiki/File:Saint_Paul_April_2025_16_(Rice_Park_and_Landmark_Center).jpg) | `st-paul/rice-park.jpg` | Michael Barera | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Landmark Center and The Cathedral of Saint Paul from St. Paul Hotel, Saint Paul, MN](https://commons.wikimedia.org/wiki/File:Landmark_Center_and_The_Cathedral_of_Saint_Paul_from_St._Paul_Hotel,_Saint_Paul,_MN.jpg) | `st-paul/landmark-center.jpg` | w_lemay | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Mickey's Diner 5](https://commons.wikimedia.org/wiki/File:Mickey%27s_Diner_5.jpg) | `st-paul/mickeys-diner.jpg` | AlexiusHoratius | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Minnehaha Park in autumn 51](https://commons.wikimedia.org/wiki/File:Minnehaha_Park_in_autumn_51.jpg) | `minnehaha/park.jpg` | Runner1928 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Minnehaha Park in autumn 28](https://commons.wikimedia.org/wiki/File:Minnehaha_Park_in_autumn_28.jpg) | `minnehaha/depot.jpg` | Runner1928 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Longfellow House](https://commons.wikimedia.org/wiki/File:Longfellow_House.jpg) | `minnehaha/longfellow-house.jpg` | McGhiever | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Minnehaha Park in autumn 48](https://commons.wikimedia.org/wiki/File:Minnehaha_Park_in_autumn_48.jpg) | `minnehaha/statue.jpg` | Runner1928 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Minnehaha Falls, Minneapolis](https://commons.wikimedia.org/wiki/File:Minnehaha_Falls,_Minneapolis.jpg) | `minnehaha/falls.jpg` | Mikael Häggström | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Minnehaha Park in autumn 49](https://commons.wikimedia.org/wiki/File:Minnehaha_Park_in_autumn_49.jpg) | `minnehaha/glen.jpg` | Runner1928 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [John H. Stevens House](https://commons.wikimedia.org/wiki/File:John_H._Stevens_House.JPG) | `minnehaha/stevens-house.jpg` | McGhiever | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Red Wing Amtrak Depot](https://commons.wikimedia.org/wiki/File:Red_Wing_Amtrak_Depot.jpg) | `red-wing/depot.jpg` | McGhiever | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Red Wing Shoe Museum](https://commons.wikimedia.org/wiki/File:Red_Wing_Shoe_Museum.jpg) | `red-wing/shoe-store.jpg` | McGhiever | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Downtown Red Wing, Minnesota (38846021592)](https://commons.wikimedia.org/wiki/File:Downtown_Red_Wing,_Minnesota_(38846021592).jpg) | `red-wing/main-street.jpg` | Tony Webster from Minneapolis, Minnesota, United States | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Pottery Museum of Red Wing](https://commons.wikimedia.org/wiki/File:Pottery_Museum_of_Red_Wing.jpg) | `red-wing/pottery-place.jpg` | Myotus | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Red Wing, Minnesota](https://commons.wikimedia.org/wiki/File:Red_Wing,_Minnesota.jpg) | `red-wing/barn-bluff.jpg` | Nuqrat at English Wikipedia | Public domain |
| [Mississippi River - Red Wing, Minnesota (27163201529)](https://commons.wikimedia.org/wiki/File:Mississippi_River_-_Red_Wing,_Minnesota_(27163201529).jpg) | `red-wing/riverfront.jpg` | Tony Webster from Minneapolis, Minnesota, United States | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [St James Hotel E](https://commons.wikimedia.org/wiki/File:St_James_Hotel_E.jpg) | `red-wing/st-james-hotel.jpg` | McGhiever | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [T.B. Sheldon Memorial Auditorium](https://commons.wikimedia.org/wiki/File:T.B._Sheldon_Memorial_Auditorium.jpg) | `red-wing/sheldon-theatre.jpg` | McGhiever | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Douglas Lodge at Itasca State Park](https://commons.wikimedia.org/wiki/File:Douglas_Lodge_at_Itasca_State_Park.jpg) | `itasca/douglas-lodge.jpg` | Robbschultz69 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Preacher's Grove Trail - Itasca State Park, Minnesota (34527960794)](https://commons.wikimedia.org/wiki/File:Preacher%27s_Grove_Trail_-_Itasca_State_Park,_Minnesota_(34527960794).jpg) | `itasca/preachers-grove.jpg` | Tony Webster from Minneapolis, Minnesota, United States | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [2023-05-28 Minnesota - 86 - Itasca State Park - (27)](https://commons.wikimedia.org/wiki/File:2023-05-28_Minnesota_-_86_-_Itasca_State_Park_-_(27).jpg) | `itasca/headwaters-center.jpg` | TrevorFisher | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Aiton Heights Fire Tower](https://commons.wikimedia.org/wiki/File:Aiton_Heights_Fire_Tower.jpg) | `itasca/fire-tower.jpg` | Tlkremer | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Mississippi Headwaters at Lake Itasca](https://commons.wikimedia.org/wiki/File:Mississippi_Headwaters_at_Lake_Itasca.jpg) | `itasca/headwaters.jpg` | Greg Gjerdingen | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Lake Itasca - Summer Storms at Itasca State Park, Minnesota (47967322921)](https://commons.wikimedia.org/wiki/File:Lake_Itasca_-_Summer_Storms_at_Itasca_State_Park,_Minnesota_(47967322921).jpg) | `itasca/lake-itasca.jpg` | Tony Webster from Minneapolis, Minnesota, United States | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Forest Inn at Itasca State Park](https://commons.wikimedia.org/wiki/File:Forest_Inn_at_Itasca_State_Park.jpg) | `itasca/forest-inn.jpg` | Robbschultz69 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [The Old Timers Cabin at Itasca State Park](https://commons.wikimedia.org/wiki/File:The_Old_Timers_Cabin_at_Itasca_State_Park.jpg) | `itasca/old-timers-cabin.jpg` | Robbschultz69 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Grand Marais Lake Dusk](https://commons.wikimedia.org/wiki/File:Grand_Marais_Lake_Dusk.jpg) | `grand-marais/harbor.jpg` | Prosthetic Head | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Worlds Best Donuts in Grand Marais, Minnesota (53224171384)](https://commons.wikimedia.org/wiki/File:Worlds_Best_Donuts_in_Grand_Marais,_Minnesota_(53224171384).jpg) | `grand-marais/donuts.jpg` | Lorie Shaull from St Paul, United States | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Woodworking with Hand Tools at the North House Folk School in Grand Marais, MN](https://commons.wikimedia.org/wiki/File:Woodworking_with_Hand_Tools_at_the_North_House_Folk_School_in_Grand_Marais,_MN.jpg) | `grand-marais/north-house.jpg` | Terasaface | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Cascade River State Park Lookout](https://commons.wikimedia.org/wiki/File:Cascade_River_State_Park_Lookout.jpg) | `grand-marais/cascade-river.jpg` | James B. Bleeker | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Artist Point 1](https://commons.wikimedia.org/wiki/File:Artist_Point_1.jpg) | `grand-marais/artists-point.jpg` | Chris Light | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Lighthouse Of Grand Marais (231105321)](https://commons.wikimedia.org/wiki/File:Lighthouse_Of_Grand_Marais_(231105321).jpeg) | `grand-marais/lighthouse.jpg` | Robin Férand | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [Bally Blacksmith Shop](https://commons.wikimedia.org/wiki/File:Bally_Blacksmith_Shop.jpg) | `grand-marais/bally-blacksmith.jpg` | McGhiever | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Lightkeeper's House](https://commons.wikimedia.org/wiki/File:Lightkeeper%27s_House.jpg) | `grand-marais/lightkeepers-house.jpg` | McGhiever | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Jim Scott Fishhouse](https://commons.wikimedia.org/wiki/File:Jim_Scott_Fishhouse.jpg) | `grand-marais/jim-scott-fishhouse.jpg` | McGhiever | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [20240923 United Methodist Church, Taylors Falls, MN](https://commons.wikimedia.org/wiki/File:20240923_United_Methodist_Church,_Taylors_Falls,_MN.jpg) | `taylors-falls/angel-hill.jpg` | Myotus | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Taylors Falls Minnesota downtown looking north MN95 St Croix Scenic Byway](https://commons.wikimedia.org/wiki/File:Taylors_Falls_Minnesota_downtown_looking_north_MN95_St_Croix_Scenic_Byway.jpg) | `taylors-falls/bench-street.jpg` | Royalbroil | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [The Dalles of the St. Croix River - Interstate State Park - Taylors Falls, Minnesota - 6125948264](https://commons.wikimedia.org/wiki/File:The_Dalles_of_the_St._Croix_River_-_Interstate_State_Park_-_Taylors_Falls,_Minnesota_-_6125948264.jpg) | `taylors-falls/potholes.jpg` | Dougtone | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [St Croix River, MN](https://commons.wikimedia.org/wiki/File:St_Croix_River,_MN.jpg) | `taylors-falls/riverboat.jpg` | Kristinhovden | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Taylors Falls Fall Scenery - panoramio (1)](https://commons.wikimedia.org/wiki/File:Taylors_Falls_Fall_Scenery_-_panoramio_(1).jpg) | `taylors-falls/dalles.jpg` | mjdemay | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Franconia Sculpture Park in Shafer, Minnesota 04](https://commons.wikimedia.org/wiki/File:Franconia_Sculpture_Park_in_Shafer,_Minnesota_04.jpg) | `taylors-falls/franconia.jpg` | Lorie Shaull | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Folsom House 2015](https://commons.wikimedia.org/wiki/File:Folsom_House_2015.jpg) | `taylors-falls/folsom-house.jpg` | McGhiever | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Taylors Falls Public Library](https://commons.wikimedia.org/wiki/File:Taylors_Falls_Public_Library.jpg) | `taylors-falls/library.jpg` | McGhiever | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Morris Lapidus Shade Structure and Landscape (Lincoln Road Mall)](https://commons.wikimedia.org/wiki/File:Morris_Lapidus_Shade_Structure_and_Landscape_(Lincoln_Road_Mall).jpg) | `miami-beach/lincoln-road.jpg` | Tamanoeconomico | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Espanola Way South Beach, Miami Beach Florida January 2026 - 21](https://commons.wikimedia.org/wiki/File:Espanola_Way_South_Beach,_Miami_Beach_Florida_January_2026_-_21.jpg) | `miami-beach/espanola-way.jpg` | Phillip Pessar | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Wolfsonian FL1](https://commons.wikimedia.org/wiki/File:Wolfsonian_FL1.jpg) | `miami-beach/wolfsonian.jpg` | Acroterion | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Miami South Beach Art Deco Welcome Center by Don Ramey Logan](https://commons.wikimedia.org/wiki/File:Miami_South_Beach_Art_Deco_Welcome_Center_by_Don_Ramey_Logan.jpg) | `miami-beach/welcome-center.jpg` | Don Ramey Logan | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Art Deco Colony Hotel Boulevard Hotel (Miami Beach)](https://commons.wikimedia.org/wiki/File:Art_Deco_Colony_Hotel_Boulevard_Hotel_(Miami_Beach).jpg) | `miami-beach/colony-hotel.jpg` | Nestor Galina | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Miami Beach from South Pointe Park Pier](https://commons.wikimedia.org/wiki/File:Miami_Beach_from_South_Pointe_Park_Pier.jpeg) | `miami-beach/south-pointe.jpg` | Dough4872 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Parliament Square, Nassau, The Bahamas](https://commons.wikimedia.org/wiki/File:Parliament_Square,_Nassau,_The_Bahamas.jpg) | `nassau/parliament-square.jpg` | Larry Syverson from Richmond, VA, USA | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Queen's staircase, Nassau, Bahamas](https://commons.wikimedia.org/wiki/File:Queen%27s_staircase,_Nassau,_Bahamas.jpg) | `nassau/queens-staircase.jpg` | JERRYE AND ROY KLOTZ MD | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Downtown Nassau - 2025 - Government House (1)](https://commons.wikimedia.org/wiki/File:Downtown_Nassau_-_2025_-_Government_House_(1).jpg) | `nassau/government-house.jpg` | Bluerasberry | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Nassau - John Watling's Distillery (Buena Vista Estate)](https://commons.wikimedia.org/wiki/File:Nassau_-_John_Watling%27s_Distillery_(Buena_Vista_Estate).jpg) | `nassau/watlings.jpg` | P. Hughes | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [FORT CHARLOTTE, NASSAU, BAHAMAS](https://commons.wikimedia.org/wiki/File:FORT_CHARLOTTE,_NASSAU,_BAHAMAS.jpg) | `nassau/fort-charlotte.jpg` | JERRYE AND ROY KLOTZ MD | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Conch salad 2022 3](https://commons.wikimedia.org/wiki/File:Conch_salad_2022_3.jpg) | `nassau/fish-fry.jpg` | Hannah On The Go | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [Mizu Inari Shrine(Water Inari Shrine) - 水稲荷神社 - panoramio](https://commons.wikimedia.org/wiki/File:Mizu_Inari_Shrine(Water_Inari_Shrine)_-_%E6%B0%B4%E7%A8%B2%E8%8D%B7%E7%A5%9E%E7%A4%BE_-_panoramio.jpg) | `waseda/mizu-inari.jpg` | Carbonium | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [夏目漱石誕生之地碑](https://commons.wikimedia.org/wiki/File:%E5%A4%8F%E7%9B%AE%E6%BC%B1%E7%9F%B3%E8%AA%95%E7%94%9F%E4%B9%8B%E5%9C%B0%E7%A2%91.jpg) | `waseda/soseki-birthplace.jpg` | C2revenge | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Okuma1](https://commons.wikimedia.org/wiki/File:Okuma1.jpg) | `waseda/okuma-garden.jpg` | Irina Gelbukh | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Sekiguchi basyoan bunkyo tokyo 2009](https://commons.wikimedia.org/wiki/File:Sekiguchi_basyoan_bunkyo_tokyo_2009.JPG) | `waseda/basho-an.jpg` | Kentin | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Eisei Bunko Museum](https://commons.wikimedia.org/wiki/File:Eisei_Bunko_Museum.jpg) | `waseda/eisei-bunko.jpg` | Kakidai | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Toden Arakawa Line 7701 Arrives At Waseda Station](https://commons.wikimedia.org/wiki/File:Toden_Arakawa_Line_7701_Arrives_At_Waseda_Station.jpg) | `waseda/toden-waseda.jpg` | Charlie fong | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [New World Center (5604698536)](https://commons.wikimedia.org/wiki/File:New_World_Center_(5604698536).jpg) | `miami-beach/new-world-center.jpg` | JD Lasica from Pleasanton, CA, US | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Miami Beach - Lummus Park and hotels](https://commons.wikimedia.org/wiki/File:Miami_Beach_-_Lummus_Park_and_hotels.jpg) | `miami-beach/lummus-park.jpg` | P. Hughes | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [I Villa Casa Casuarina, Miami, FL, USA](https://commons.wikimedia.org/wiki/File:I_Villa_Casa_Casuarina,_Miami,_FL,_USA.jpg) | `miami-beach/casa-casuarina.jpg` | Elisa.rolle | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [1) Park Central (1937)](https://commons.wikimedia.org/wiki/File:1)_Park_Central_(1937).jpg) | `miami-beach/park-central.jpg` | Elisa.rolle | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Joe's Stone Crab entrance](https://commons.wikimedia.org/wiki/File:Joe%27s_Stone_Crab_entrance.jpg) | `miami-beach/joes-stone-crab.jpg` | Cullen328 | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Straw Market Nassau Bahamas 2024](https://commons.wikimedia.org/wiki/File:Straw_Market_Nassau_Bahamas_2024.jpg) | `nassau/straw-market.jpg` | Larry D. Moore | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Fort Fincastle, Nassau, Bahamas](https://commons.wikimedia.org/wiki/File:Fort_Fincastle,_Nassau,_Bahamas.jpg) | `nassau/fort-fincastle.jpg` | JERRYE & ROY KLOTZ MD | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Downtown Nassau - 2025 - Graycliff (1)](https://commons.wikimedia.org/wiki/File:Downtown_Nassau_-_2025_-_Graycliff_(1).jpg) | `nassau/graycliff.jpg` | Bluerasberry | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Kawagoe Kashiya Yokocho 2013-09](https://commons.wikimedia.org/wiki/File:Kawagoe_Kashiya_Yokocho_2013-09.JPG) | `kawagoe/kashiya-yokocho.jpg` | At by At | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Miyoshino Shrine-2006-02-12 1](https://commons.wikimedia.org/wiki/File:Miyoshino_Shrine-2006-02-12_1.jpg) | `kawagoe/miyoshino-shrine.jpg` | Syohei Arai | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Barron county WI Cumberland IMG 1662](https://commons.wikimedia.org/wiki/File:Barron_county_WI_Cumberland_IMG_1662.JPG) | `cumberland/beaver-dam-lake.jpg` | Bjoertvedt | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Barron county WI Cumberland IMG 1666 uecke's opera house](https://commons.wikimedia.org/wiki/File:Barron_county_WI_Cumberland_IMG_1666_uecke%27s_opera_house.JPG) | `cumberland/uecke-opera-house.jpg` | Bjoertvedt | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Barron county WI Cumberland IMG 1667](https://commons.wikimedia.org/wiki/File:Barron_county_WI_Cumberland_IMG_1667.JPG) | `cumberland/second-avenue-tower.jpg` | Bjoertvedt | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Barron county WI Cumberland IMG 1668](https://commons.wikimedia.org/wiki/File:Barron_county_WI_Cumberland_IMG_1668.JPG) | `cumberland/second-avenue-shops.jpg` | Bjoertvedt | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Cumberland Public Library](https://commons.wikimedia.org/wiki/File:Cumberland_Public_Library.JPG) | `cumberland/library.jpg` | Appraiser | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Cumberland Wisconsin Downtown US63](https://commons.wikimedia.org/wiki/File:Cumberland_Wisconsin_Downtown_US63.jpg) | `cumberland/second-avenue-autumn.jpg` | Royalbroil | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [St. Mary's Rectory, Cumberland, WI 01](https://commons.wikimedia.org/wiki/File:St._Mary%27s_Rectory,_Cumberland,_WI_01.jpg) | `cumberland/rectory.jpg` | Nancy Bentz | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [St. Mary's Rectory, Cumberland, WI 02](https://commons.wikimedia.org/wiki/File:St._Mary%27s_Rectory,_Cumberland,_WI_02.jpg) | `cumberland/rectory-and-church.jpg` | Nancy Bentz | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Cumberland WI intersection US63 WIS48](https://commons.wikimedia.org/wiki/File:Cumberland_WI_intersection_US63_WIS48.jpg) | `cumberland/elm-street.jpg` | Royalbroil | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Cumberland Wisconsin Sign US63](https://commons.wikimedia.org/wiki/File:Cumberland_Wisconsin_Sign_US63.jpg) | `cumberland/town-sign.jpg` | Royalbroil | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Sanborn Fire Insurance Map from Cumberland, Barron County, Wisconsin. LOC sanborn09525 003-2](https://commons.wikimedia.org/wiki/File:Sanborn_Fire_Insurance_Map_from_Cumberland,_Barron_County,_Wisconsin._LOC_sanborn09525_003-2.jpg) | `cumberland/map-1909-north.jpg` | Sanborn Map Company (Library of Congress) | [Public domain](https://en.wikipedia.org/wiki/Public_domain) |
| [Sanborn Fire Insurance Map from Cumberland, Barron County, Wisconsin. LOC sanborn09525 003-3](https://commons.wikimedia.org/wiki/File:Sanborn_Fire_Insurance_Map_from_Cumberland,_Barron_County,_Wisconsin._LOC_sanborn09525_003-3.jpg) | `cumberland/map-1909-downtown.jpg` | Sanborn Map Company (Library of Congress) | [Public domain](https://en.wikipedia.org/wiki/Public_domain) |
| [Sanborn Fire Insurance Map from Cumberland, Barron County, Wisconsin. LOC sanborn09525 003-4](https://commons.wikimedia.org/wiki/File:Sanborn_Fire_Insurance_Map_from_Cumberland,_Barron_County,_Wisconsin._LOC_sanborn09525_003-4.jpg) | `cumberland/map-1909-lumber.jpg` | Sanborn Map Company (Library of Congress) | [Public domain](https://en.wikipedia.org/wiki/Public_domain) |
| [Sanborn Fire Insurance Map from Cumberland, Barron County, Wisconsin. LOC sanborn09525 003-1](https://commons.wikimedia.org/wiki/File:Sanborn_Fire_Insurance_Map_from_Cumberland,_Barron_County,_Wisconsin._LOC_sanborn09525_003-1.jpg) | `cumberland/map-1909-key.jpg` | Sanborn Map Company (Library of Congress) | [Public domain](https://en.wikipedia.org/wiki/Public_domain) |
| [Tokyo Station Marunouchi Building P5228775](https://commons.wikimedia.org/wiki/File:Tokyo_Station_Marunouchi_Building_P5228775.jpg) | `marunouchi/hero.jpg` | Kestrel | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Ginkgo biloba - Hibiya Park](https://commons.wikimedia.org/wiki/File:Ginkgo_biloba_-_Hibiya_Park.jpg) | `marunouchi/ginkgo.jpg` | Kakidai | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Hibiya Park in autumn](https://commons.wikimedia.org/wiki/File:Hibiya_Park_in_autumn.jpg) | `marunouchi/crane-fountain.jpg` | Kakidai | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Ginkgo biloba - Hibiya Park 2](https://commons.wikimedia.org/wiki/File:Ginkgo_biloba_-_Hibiya_Park_2.jpg) | `marunouchi/matsumotoro.jpg` | Kakidai | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Seimon Ishibashi Bridge, Imperial Palace, Tokyo](https://commons.wikimedia.org/wiki/File:Seimon_Ishibashi_Bridge,_Imperial_Palace,_Tokyo.jpg) | `marunouchi/nijubashi.jpg` | Ray in Manila | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Wadakura Fountain Park](https://commons.wikimedia.org/wiki/File:Wadakura_Fountain_Park.jpg) | `marunouchi/wadakura.jpg` | Kakidai | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [KITTE Marunouchi Rooftop garden night view 201912](https://commons.wikimedia.org/wiki/File:KITTE_Marunouchi_Rooftop_garden_night_view_201912.jpg) | `marunouchi/kitte-garden.jpg` | Wpcpey | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Animal skeletal specimens](https://commons.wikimedia.org/wiki/File:Animal_skeletal_specimens.jpg) | `marunouchi/intermediatheque.jpg` | Souka Kinmei | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Tokyo sta DOME](https://commons.wikimedia.org/wiki/File:Tokyo_sta_DOME.jpg) | `marunouchi/station-dome.jpg` | Kei365 | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Christmas light of the Marunouchi Nakadori Street Dec 2019](https://commons.wikimedia.org/wiki/File:Christmas_light_of_the_Marunouchi_Nakadori_Street_Dec_2019.jpg) | `marunouchi/nakadori.jpg` | 掬茶 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [View From Hawk Ridge, photograph by Randen Pederson](https://commons.wikimedia.org/wiki/File:View_From_Hawk_Ridge,_photograph_by_Randen_Pederson.jpg) | `duluth-romantic/hero.jpg` | Randen Pederson | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Hawk Ridge, Duluth, MN (29994576171)](https://commons.wikimedia.org/wiki/File:Hawk_Ridge,_Duluth,_MN_%2829994576171%29.jpg) | `duluth-romantic/hawk-ridge.jpg` | Northfielder | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Lester River bridge](https://commons.wikimedia.org/wiki/File:Lester_River_bridge.jpg) | `duluth-romantic/lester-river.jpg` | Elkman | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Lester River & Japp Hole Falls (Lester Park, Minnesota, USA) (22294211225)](https://commons.wikimedia.org/wiki/File:Lester_River_&_Japp_Hole_Falls_%28Lester_Park,_Minnesota,_USA%29_%2822294211225%29.jpg) | `duluth-romantic/lester-park.jpg` | James St. John | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [7BridgesDuluthMN](https://commons.wikimedia.org/wiki/File:7BridgesDuluthMN.jpg) | `duluth-romantic/seven-bridges.jpg` | Jonathunder | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Brighton Beach, Duluth (9697879320)](https://commons.wikimedia.org/wiki/File:Brighton_Beach,_Duluth_%289697879320%29.jpg) | `duluth-romantic/brighton-beach.jpg` | Sharon Mollerus | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Swinging bridge - 44279430334](https://commons.wikimedia.org/wiki/File:Swinging_bridge_-_44279430334.jpg) | `duluth-adventurous/hero.jpg` | Joe Passe | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Swinging bridge at Jay Cooke State Park](https://commons.wikimedia.org/wiki/File:Swinging_bridge_at_Jay_Cooke_State_Park.jpg) | `duluth-adventurous/swinging-bridge.jpg` | Joe Passe | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [DWP Trail, Ely's Peak MN Aug 2023 1](https://commons.wikimedia.org/wiki/File:DWP_Trail,_Ely%27s_Peak_MN_Aug_2023_1.jpg) | `duluth-adventurous/trailhead.jpg` | Thomson200 | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Ely's Peak DWP Trail Tunnel, Aug 2023 1](https://commons.wikimedia.org/wiki/File:Ely%27s_Peak_DWP_Trail_Tunnel,_Aug_2023_1.jpg) | `duluth-adventurous/tunnel.jpg` | Thomson200 | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [View from DWP Trail near Ely's Peak, Aug 2023](https://commons.wikimedia.org/wiki/File:View_from_DWP_Trail_near_Ely%27s_Peak,_Aug_2023.jpg) | `duluth-adventurous/summit.jpg` | Thomson200 | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Oldenburg Point](https://commons.wikimedia.org/wiki/File:Oldenburg_Point.jpg) | `duluth-adventurous/oldenburg-point.jpg` | Joe Passe | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Duluth Armory SW](https://commons.wikimedia.org/wiki/File:Duluth_Armory_SW.jpg) | `duluth-curious/hero.jpg`, `duluth-curious/armory.jpg` | McGhiever | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Duluth Depot](https://commons.wikimedia.org/wiki/File:Duluth_Depot.jpg) | `duluth-curious/depot.jpg` | McGhiever | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Clayton Jackson McGhie Memorial site 01](https://commons.wikimedia.org/wiki/File:Clayton_Jackson_McGhie_Memorial_site_01.jpg) | `duluth-curious/memorial.jpg` | Myotus | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Boyhood home of Bob Dylan in Duluth, Minnesota](https://commons.wikimedia.org/wiki/File:Boyhood_home_of_Bob_Dylan_in_Duluth,_Minnesota.jpg) | `duluth-curious/dylan-home.jpg` | Lorie Shaull | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Duluth Rose Garden, Duluth, Minnesota](https://commons.wikimedia.org/wiki/File:Duluth_Rose_Garden,_Duluth,_Minnesota.jpg) | `duluth-curious/rose-garden.jpg` | Sharon Mollerus | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Mustang 1751D - Sierra Sue II - Wings of the North Pancake Breakfast (17462855154)](https://commons.wikimedia.org/wiki/File:Mustang_1751D_-_Sierra_Sue_II_-_Wings_of_the_North_Pancake_Breakfast_%2817462855154%29.jpg) | `eden-prairie/hero.jpg` | Pete Markham | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Wings of the North Air Museum interior-03](https://commons.wikimedia.org/wiki/File:Wings_of_the_North_Air_Museum_interior-03.jpg) | `eden-prairie/wings-of-the-north.jpg` | Myotus | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Purgatory Creek Park, Eden Prairie, MN Aug 2023 02](https://commons.wikimedia.org/wiki/File:Purgatory_Creek_Park,_Eden_Prairie,_MN_Aug_2023_02.jpg) | `eden-prairie/purgatory-creek.jpg` | Thomson200 | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Mayor Jean Harris Bridge](https://commons.wikimedia.org/wiki/File:Mayor_Jean_Harris_Bridge.jpg) | `eden-prairie/jean-harris-bridge.jpg` | Kevin Rofidal | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [John R. Cummins Farmhouse](https://commons.wikimedia.org/wiki/File:John_R._Cummins_Farmhouse.jpg) | `eden-prairie/cummins-farm.jpg` | McGhiever | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [MN 240720095090 bryant lake](https://commons.wikimedia.org/wiki/File:MN_240720095090_bryant_lake.jpg) | `eden-prairie/bryant-lake.jpg` | Bjoertvedt | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [宝泉院 01](https://commons.wikimedia.org/wiki/File:宝泉院_01.JPG) | `ohara/hero.jpg`, `ohara/hosen-in.jpg` | Maechan0360 | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [京都・大原にて 三千院門前 Street in front of Sanzen-in 2011.8.28 - panoramio](https://commons.wikimedia.org/wiki/File:京都・大原にて_三千院門前_Street_in_front_of_Sanzen-in_2011.8.28_-_panoramio.jpg) | `ohara/approach.jpg` | Nankou Oronain (as36…) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Japanese garden, Sanzen-in 01](https://commons.wikimedia.org/wiki/File:Japanese_garden,_Sanzen-in_01.jpg) | `ohara/sanzen-in.jpg` | Motokoka | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [京都・大原にて 来迎院 Raigō-in 2011.8.28 - panoramio](https://commons.wikimedia.org/wiki/File:京都・大原にて_来迎院_Raigō-in_2011.8.28_-_panoramio.jpg) | `ohara/raigo-in.jpg` | Nankou Oronain (as36…) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [JyakkouinHondo](https://commons.wikimedia.org/wiki/File:JyakkouinHondo.jpg) | `ohara/jakko-in.jpg` | PlusMinus | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Deer in front of Nandaimon at Todaiji](https://commons.wikimedia.org/wiki/File:Deer_in_front_of_Nandaimon_at_Todaiji.jpg) | `nara/hero.jpg` | Christophe95 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Statue of Gyoki in Nara DSCN8896 20100404](https://commons.wikimedia.org/wiki/File:Statue_of_Gyoki_in_Nara_DSCN8896_20100404.JPG) | `nara/gyoki.jpg` | Ogiyoshisan | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Nara deer lounging at Todaiji](https://commons.wikimedia.org/wiki/File:Nara_deer_lounging_at_Todaiji.jpg) | `nara/deer.jpg` | Photos of Japan | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Todaiji niozo ungyo](https://commons.wikimedia.org/wiki/File:Todaiji_niozo_ungyo.jpg) | `nara/nandaimon.jpg` | Tsuyoshi chiba | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Daibutsu Grand bouddha - Tōdai-ji - Nara](https://commons.wikimedia.org/wiki/File:Daibutsu_Grand_bouddha_-_Tōdai-ji_-_Nara.jpg) | `nara/daibutsu.jpg` | Gilles Desjardins | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Nigatsu-do - panoramio (1)](https://commons.wikimedia.org/wiki/File:Nigatsu-do_-_panoramio_%281%29.jpg) | `nara/nigatsudo.jpg` | Tomi Mäkitalo | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Japam - Miyajima - The Mount Misen mountaintop view(1) 2015](https://commons.wikimedia.org/wiki/File:Japam_-_Miyajima_-_The_Mount_Misen_mountaintop_view%281%29_2015.JPG) | `miyajima/hero.jpg` | HKT3012 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Corridors, Itsukushima Shinto Shrine - DSC01945](https://commons.wikimedia.org/wiki/File:Corridors,_Itsukushima_Shinto_Shrine_-_DSC01945.JPG) | `miyajima/shrine.jpg` | Daderot | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [500 Rakan statues, view from above, Daisho-in, Miyajima, Hatsukaichi, 2016](https://commons.wikimedia.org/wiki/File:500_Rakan_statues,_view_from_above,_Daisho-in,_Miyajima,_Hatsukaichi,_2016.jpg) | `miyajima/daisho-in.jpg` | DimiTalen | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Kuguri-iwa](https://commons.wikimedia.org/wiki/File:Kuguri-iwa.jpg) | `miyajima/kuguri-iwa.jpg` | Prue Simmons | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Miyajima, Mount Misen, Japan (48949127661)](https://commons.wikimedia.org/wiki/File:Miyajima,_Mount_Misen,_Japan_%2848949127661%29.jpg) | `miyajima/summit.jpg` | dconvertini | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Miyajima Itsukushima shrine floating tori gate](https://commons.wikimedia.org/wiki/File:Miyajima_Itsukushima_shrine_floating_tori_gate.jpg) | `miyajima/torii.jpg` | Ian G Shingler | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Ishikawa Higashi Chaya gai at night xl](https://commons.wikimedia.org/wiki/File:Ishikawa_Higashi_Chaya_gai_at_night_xl.jpg) | `kanazawa/hero.jpg`, `kanazawa/higashi-chaya.jpg` | Yasuyuki_Kawano | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Onosho Waterway in Nagamachi Samurai District Apr 10, 2009](https://commons.wikimedia.org/wiki/File:Onosho_Waterway_in_Nagamachi_Samurai_District_Apr_10,_2009.jpg) | `kanazawa/nagamachi.jpg` | Douglas Perkins | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Oyama jinja shrine gate](https://commons.wikimedia.org/wiki/File:Oyama_jinja_shrine_gate.jpg) | `kanazawa/oyama.jpg` | Motokoka | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Kotojitoro lantern in Kenrokuen (Kanazawa, Japan) (2443616689)](https://commons.wikimedia.org/wiki/File:Kotojitoro_lantern_in_Kenrokuen_%28Kanazawa,_Japan%29_%282443616689%29.jpg) | `kanazawa/kenroku-en.jpg` | KimonBerlin | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Kazuemachi - Kanazawa, Japan - DSC01094](https://commons.wikimedia.org/wiki/File:Kazuemachi_-_Kanazawa,_Japan_-_DSC01094.jpg) | `kanazawa/kazuemachi.jpg` | Daderot | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Gold Rock Beach Grand Bahama Island](https://commons.wikimedia.org/wiki/File:Gold_Rock_Beach_Grand_Bahama_Island.jpg) | `grand-bahama/hero.jpg`, `grand-bahama/gold-rock-beach.jpg` | Averette | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [Grand Bahama Bahamian Pineyards Lucayan National Park of the Bahamas](https://commons.wikimedia.org/wiki/File:Grand_Bahama_Bahamian_Pineyards_Lucayan_National_Park_of_the_Bahamas.jpg) | `grand-bahama/pineyards.jpg` | EgorovaSvetlana | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Burial Mound cave Inland Blue Hole within The Lucayan National Park of the Bahamas in Grand Bahama](https://commons.wikimedia.org/wiki/File:Burial_Mound_cave_Inland_Blue_Hole_within_The_Lucayan_National_Park_of_the_Bahamas_in_Grand_Bahama.jpg) | `grand-bahama/burial-mound.jpg` | EgorovaSvetlana | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Ben’s Cave inland Blue Hole Lucayan National Park of the Bahamas in Grand Bahama](https://commons.wikimedia.org/wiki/File:Ben’s_Cave_inland_Blue_Hole_Lucayan_National_Park_of_the_Bahamas_in_Grand_Bahama.jpg) | `grand-bahama/bens-cave.jpg` | EgorovaSvetlana | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [LucayanNationalParkBoardwalk](https://commons.wikimedia.org/wiki/File:LucayanNationalParkBoardwalk.JPG) | `grand-bahama/boardwalk.jpg` | Pietro | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Sunset Dock - panoramio](https://commons.wikimedia.org/wiki/File:Sunset_Dock_-_panoramio.jpg) | `harbour-island/hero.jpg`, `harbour-island/sunset-dock.jpg` | Oscar Flowers | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Briland Dock - panoramio](https://commons.wikimedia.org/wiki/File:Briland_Dock_-_panoramio.jpg) | `harbour-island/harbour.jpg` | Oscar Flowers | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Pink Sands Beach - panoramio](https://commons.wikimedia.org/wiki/File:Pink_Sands_Beach_-_panoramio.jpg) | `harbour-island/pink-sands.jpg` | Oscar Flowers | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Resting on da Bay - panoramio](https://commons.wikimedia.org/wiki/File:Resting_on_da_Bay_-_panoramio.jpg) | `harbour-island/bay-street.jpg` | Oscar Flowers | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Disney Wish at Castaway Cay far](https://commons.wikimedia.org/wiki/File:Disney_Wish_at_Castaway_Cay_far.jpg) | `castaway-cay/hero.jpg`, `castaway-cay/pier.jpg` | Declan M. Martin | [Public domain](https://en.wikipedia.org/wiki/Public_domain) |
| [Castaway Cay lagoon](https://commons.wikimedia.org/wiki/File:Castaway_Cay_lagoon.jpg) | `castaway-cay/lagoon.jpg` | Matt from Orlando | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Disney Fantasy at Castaway Cay (34702733835)](https://commons.wikimedia.org/wiki/File:Disney_Fantasy_at_Castaway_Cay_%2834702733835%29.jpg) | `castaway-cay/family-beach.jpg` | Chad Sparkes | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Fort Lauderdale-Stranahan House-waterside](https://commons.wikimedia.org/wiki/File:Fort_Lauderdale-Stranahan_House-waterside.jpg) | `ftl-river/hero.jpg` | Kolossos | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [View from the Broward Center For Performing Arts, Riverwalk, Fort-Lauderdale, Florida - panoramio](https://commons.wikimedia.org/wiki/File:View_from_the_Broward_Center_For_Performing_Arts,_Riverwalk,_Fort-Lauderdale,_Florida_-_panoramio.jpg) | `ftl-river/esplanade.jpg` | Richard Mc Neil | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [New River Inn (Fort Lauderdale, Florida)](https://commons.wikimedia.org/wiki/File:New_River_Inn_%28Fort_Lauderdale,_Florida%29.jpg) | `ftl-river/new-river-inn.jpg` | Tamanoeconomico | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Along RiverWalk ,New River, Fort Lauderdale, Florida, USA - panoramio](https://commons.wikimedia.org/wiki/File:Along_RiverWalk_,New_River,_Fort_Lauderdale,_Florida,_USA_-_panoramio.jpg) | `ftl-river/riverwalk.jpg` | Richard Mc Neil | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [Stranahan House (Fort Lauderdale, Florida)](https://commons.wikimedia.org/wiki/File:Stranahan_House_%28Fort_Lauderdale,_Florida%29.jpg) | `ftl-river/stranahan-house.jpg` | Tamanoeconomico | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Las Olas Boulevard, Fort Lauderdale, Florida 03](https://commons.wikimedia.org/wiki/File:Las_Olas_Boulevard,_Fort_Lauderdale,_Florida_03.jpg) | `ftl-river/las-olas.jpg` | Infrogmation | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Bonnet House (Fort Lauderdale, Florida)](https://commons.wikimedia.org/wiki/File:Bonnet_House_%28Fort_Lauderdale,_Florida%29.jpg) | `bonnet-house/hero.jpg` | Tamanoeconomico | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Hugh Taylor Birch State Park (3)](https://commons.wikimedia.org/wiki/File:Hugh_Taylor_Birch_State_Park_%283%29.jpg) | `bonnet-house/terramar.jpg` | Tamanoeconomico | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Ardea Alba in Hugh Taylor Birch State Park](https://commons.wikimedia.org/wiki/File:Ardea_Alba_in_Hugh_Taylor_Birch_State_Park.JPG) | `bonnet-house/egret.jpg` | Korall | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [Squirrel monkey- Bonnet House, Florida (4233058083)](https://commons.wikimedia.org/wiki/File:Squirrel_monkey-_Bonnet_House,_Florida_%284233058083%29.jpg) | `bonnet-house/monkey.jpg` | Mike's Birds | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Florida-Fort Lauderdale-Bonnet House-1900-8](https://commons.wikimedia.org/wiki/File:Florida-Fort_Lauderdale-Bonnet_House-1900-8.jpg) | `bonnet-house/house.jpg` | Marine 69-71 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [John U. Lloyd Beach State Park, Florida](https://commons.wikimedia.org/wiki/File:John_U._Lloyd_Beach_State_Park,_Florida.JPG) | `wade-ins/hero.jpg`, `wade-ins/park-beach.jpg` | Georgialh | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Las Olas Beach, South Fort Lauderdale Beach Boulevard](https://commons.wikimedia.org/wiki/File:Las_Olas_Beach,_South_Fort_Lauderdale_Beach_Boulevard.jpg) | `wade-ins/las-olas-beach.jpg` | Tamanoeconomico | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Sign at Dr. Von D. Mizell-Eula Johnson State Park](https://commons.wikimedia.org/wiki/File:Sign_at_Dr._Von_D._Mizell-Eula_Johnson_State_Park.jpg) | `wade-ins/park-sign.jpg` | Rscooli | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Dania Beach FL John U. Lloyd SP beach south01](https://commons.wikimedia.org/wiki/File:Dania_Beach_FL_John_U._Lloyd_SP_beach_south01.jpg) | `wade-ins/beach-south.jpg` | Ebyabe | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Hillsboro Inlet Light Florida ](https://commons.wikimedia.org/wiki/File:Hillsboro_Inlet_Light_Florida_.jpg) | `barefoot-mailman/hero.jpg`, `barefoot-mailman/lighthouse.jpg` | MrBill3 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Pompano Pier - panoramio](https://commons.wikimedia.org/wiki/File:Pompano_Pier_-_panoramio.jpg) | `barefoot-mailman/pier.jpg` | DaSpader | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Pompano Beach, Florida](https://commons.wikimedia.org/wiki/File:Pompano_Beach,_Florida.jpg) | `barefoot-mailman/beach.jpg` | Quintin Soloviev | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Aerial Shot of Hillsboro Inlet Lighthouse](https://commons.wikimedia.org/wiki/File:Aerial_Shot_of_Hillsboro_Inlet_Lighthouse.jpg) | `barefoot-mailman/inlet.jpg` | Yanjipy | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Hollywood Beach (2)](https://commons.wikimedia.org/wiki/File:Hollywood_Beach_%282%29.jpg) | `hollywood-beach/hero.jpg`, `hollywood-beach/beach-2.jpg` | Tamanoeconomico | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Hollywood Beach Theatre (1)](https://commons.wikimedia.org/wiki/File:Hollywood_Beach_Theatre_%281%29.jpg) | `hollywood-beach/theatre.jpg` | Tamanoeconomico | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Hollywood Beach (7)](https://commons.wikimedia.org/wiki/File:Hollywood_Beach_%287%29.jpg) | `hollywood-beach/broadwalk.jpg` | Tamanoeconomico | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Anne Kolb Nature Center observation tower view - panoramio](https://commons.wikimedia.org/wiki/File:Anne_Kolb_Nature_Center_observation_tower_view_-_panoramio.jpg) | `hollywood-beach/tower-view.jpg` | quyentr | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [Anne Kolb Nature Center observation tower boardwalk view - panoramio](https://commons.wikimedia.org/wiki/File:Anne_Kolb_Nature_Center_observation_tower_boardwalk_view_-_panoramio.jpg) | `hollywood-beach/boardwalk.jpg` | quyentr | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [Mount Otemanu Bora Bora](https://commons.wikimedia.org/wiki/File:Mount_Otemanu_Bora_Bora.jpg) | `bora-bora/hero.jpg` | Athos33320 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [FP-bora-vaitape-strasse](https://commons.wikimedia.org/wiki/File:FP-bora-vaitape-strasse.jpg) | `bora-bora/vaitape.jpg` | Balou46 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [BoraBora Marae2](https://commons.wikimedia.org/wiki/File:BoraBora_Marae2.jpg) | `bora-bora/marae.jpg` | Makemake | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Faanuibay](https://commons.wikimedia.org/wiki/File:Faanuibay.jpg) | `bora-bora/faanui.jpg` | Makemake | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Matira Beach, Bora Bora, French Polynesia](https://commons.wikimedia.org/wiki/File:Matira_Beach,_Bora_Bora,_French_Polynesia.jpg) | `bora-bora/matira.jpg` | Sba2 | [CC BY 2.5](https://creativecommons.org/licenses/by/2.5) |
| [Randonneurs traversée baie Mont Saint-Michel](https://commons.wikimedia.org/wiki/File:Randonneurs_traversée_baie_Mont_Saint-Michel.jpg) | `mont-saint-michel/hero.jpg` | Alexandre D. | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Mont Saint-Michel et Tombelaine depuis le bec d'Andaine 1](https://commons.wikimedia.org/wiki/File:Mont_Saint-Michel_et_Tombelaine_depuis_le_bec_d%27Andaine_1.jpg) | `mont-saint-michel/bec-dandaine.jpg` | Tangopaso | [Public domain](https://en.wikipedia.org/wiki/Public_domain) |
| [Traversée grève dans la baie du Mont-Saint-Michel-2009-10-30 02](https://commons.wikimedia.org/wiki/File:Traversée_grève_dans_la_baie_du_Mont-Saint-Michel-2009-10-30_02.JPG) | `mont-saint-michel/sands.jpg` | Crochet.david | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Tombelaine-mont-saint-michel-depuis-la-baie](https://commons.wikimedia.org/wiki/File:Tombelaine-mont-saint-michel-depuis-la-baie.jpg) | `mont-saint-michel/tombelaine.jpg` | Nitot | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Le Mont-Saint-Michel Grande Rue 1](https://commons.wikimedia.org/wiki/File:Le_Mont-Saint-Michel_Grande_Rue_1.jpg) | `mont-saint-michel/grande-rue.jpg` | Zairon | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Tombelaine - view from Mont St Michel](https://commons.wikimedia.org/wiki/File:Tombelaine_-_view_from_Mont_St_Michel.jpg) | `mont-saint-michel/terrace.jpg` | Lynx1211 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Florence Cathedral seen from Piazzale Michelangelo dllu](https://commons.wikimedia.org/wiki/File:Florence_Cathedral_seen_from_Piazzale_Michelangelo_dllu.jpg) | `florence/hero.jpg` | Dllu | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Florence, Italy, Brunelleschi's Dome of Florence Cathedral](https://commons.wikimedia.org/wiki/File:Florence,_Italy,_Brunelleschi%27s_Dome_of_Florence_Cathedral.jpg) | `florence/duomo.jpg` | Vyacheslav Argenberg | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Ponte Vecchio at dusk 1](https://commons.wikimedia.org/wiki/File:Ponte_Vecchio_at_dusk_1.JPG) | `florence/ponte-vecchio.jpg` | Martin Falbisoner | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Firenze Giardino delle Rose Vista su Firenze 1](https://commons.wikimedia.org/wiki/File:Firenze_Giardino_delle_Rose_Vista_su_Firenze_1.jpg) | `florence/roses.jpg` | Zairon | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Firenze Basilica di San Miniato al Monte Esterno Facciata 7](https://commons.wikimedia.org/wiki/File:Firenze_Basilica_di_San_Miniato_al_Monte_Esterno_Facciata_7.jpg) | `florence/san-miniato.jpg` | Zairon | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Ponte Vecchio at sunset from Piazzale Michelangelo Florence 2023 dllu](https://commons.wikimedia.org/wiki/File:Ponte_Vecchio_at_sunset_from_Piazzale_Michelangelo_Florence_2023_dllu.jpg) | `florence/piazzale.jpg` | Daniel Lu | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [2018 01 (Blue) - Chaouen](https://commons.wikimedia.org/wiki/File:2018_01_%28Blue%29_-_Chaouen.jpg) | `chefchaouen/hero.jpg` | Fbrandao.1963 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Kasbah-de-chefchaouen-with-rif-mountains-in-chefchaouen](https://commons.wikimedia.org/wiki/File:Kasbah-de-chefchaouen-with-rif-mountains-in-chefchaouen.jpg) | `chefchaouen/kasbah.jpg` | Badr Rachadi | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Chefchaouen Street B](https://commons.wikimedia.org/wiki/File:Chefchaouen_Street_B.jpg) | `chefchaouen/lanes.jpg` | Mark Fischer | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Ras El Ma 2024](https://commons.wikimedia.org/wiki/File:Ras_El_Ma_2024.jpg) | `chefchaouen/ras-el-maa.jpg` | Canondorf | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Spanish Mosque in Chefchaouen (52189127604)](https://commons.wikimedia.org/wiki/File:Spanish_Mosque_in_Chefchaouen_%2852189127604%29.jpg) | `chefchaouen/mosque.jpg` | William John Gauthier | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Place Outa el Hammam & Kasbah ساحة وطاء الحمام - Chefchaouen](https://commons.wikimedia.org/wiki/File:Place_Outa_el_Hammam_&_Kasbah_ساحة_وطاء_الحمام_-_Chefchaouen.jpg) | `chefchaouen/plaza.jpg` | Ritahouari | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Whispering Gallery](https://commons.wikimedia.org/wiki/File:Whispering_Gallery.jpg) | `new-york/hero.jpg`, `new-york/whispering-gallery.jpg` | Ɱ | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Lion and facade - N.Y. Public Library - Schwarzman Bldg. - exterior](https://commons.wikimedia.org/wiki/File:Lion_and_facade_-_N.Y._Public_Library_-_Schwarzman_Bldg._-_exterior.jpg) | `new-york/lions.jpg` | Bestbudbrian | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [2011-NYC-Bryant-Park-Library](https://commons.wikimedia.org/wiki/File:2011-NYC-Bryant-Park-Library.JPG) | `new-york/bryant-park.jpg` | Elmschrat | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Grand Central Terminal ceiling and spot](https://commons.wikimedia.org/wiki/File:Grand_Central_Terminal_ceiling_and_spot.jpg) | `new-york/ceiling.jpg` | TheCatalyst31 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Chrysler Building from 42nd St (1628489539)](https://commons.wikimedia.org/wiki/File:Chrysler_Building_from_42nd_St_%281628489539%29.jpg) | `new-york/chrysler.jpg` | Casper Moller | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [San Francisco Cable Car on Hyde Street](https://commons.wikimedia.org/wiki/File:San_Francisco_Cable_Car_on_Hyde_Street.jpg) | `san-francisco/hero.jpg` | Frank Schulenburg | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [San Francisco Cable Car 13](https://commons.wikimedia.org/wiki/File:San_Francisco_Cable_Car_13.jpg) | `san-francisco/powell.jpg` | Dllu | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [San Francisco (CA, USA), Lombard Street -- 2022 -- 3077](https://commons.wikimedia.org/wiki/File:San_Francisco_%28CA,_USA%29,_Lombard_Street_--_2022_--_3077.jpg) | `san-francisco/lombard.jpg` | Dietmar Rabich | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Cable Car No. 1 and Alcatraz Island](https://commons.wikimedia.org/wiki/File:Cable_Car_No._1_and_Alcatraz_Island.jpg) | `san-francisco/alcatraz.jpg` | Thomas Wolf | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Musée Mécanique 002](https://commons.wikimedia.org/wiki/File:Musée_Mécanique_002.jpg) | `san-francisco/musee.jpg` | Schorle | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Pier 39 190424 Sea Lions 03](https://commons.wikimedia.org/wiki/File:Pier_39_190424_Sea_Lions_03.jpg) | `san-francisco/sea-lions.jpg` | Oren Rozen | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Sunny Jim Cave Store - La Jolla Cave (12096823596)](https://commons.wikimedia.org/wiki/File:Sunny_Jim_Cave_Store_-_La_Jolla_Cave_%2812096823596%29.jpg) | `la-jolla/hero.jpg` | Tomás Del Coro | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Children's Pool La Jolla, San Diego, United States (Unsplash)](https://commons.wikimedia.org/wiki/File:Children%27s_Pool_La_Jolla,_San_Diego,_United_States_%28Unsplash%29.jpg) | `la-jolla/pool.jpg` | Matt Howard | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Harbor seal hauled out on the rocks, Children's Pool Beach, San Diego, California](https://commons.wikimedia.org/wiki/File:Harbor_seal_hauled_out_on_the_rocks,_Children%27s_Pool_Beach,_San_Diego,_California.jpg) | `la-jolla/seal.jpg` | Christian David | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [California sea lions in La Jolla (70431)](https://commons.wikimedia.org/wiki/File:California_sea_lions_in_La_Jolla_%2870431%29.jpg) | `la-jolla/sea-lions.jpg` | Rhododendrites | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Sunny Jim Cave in La Jolla - 1](https://commons.wikimedia.org/wiki/File:Sunny_Jim_Cave_in_La_Jolla_-_1.jpg) | `la-jolla/cave.jpg` | Jarek Tuszyński | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [California sea lion nap time in La Jolla (70474)](https://commons.wikimedia.org/wiki/File:California_sea_lion_nap_time_in_La_Jolla_%2870474%29.jpg) | `la-jolla/nap.jpg` | Rhododendrites | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Lake Louise seen from the Big Beehive, Banff National Park, Canada (54881218746)](https://commons.wikimedia.org/wiki/File:Lake_Louise_seen_from_the_Big_Beehive,_Banff_National_Park,_Canada_%2854881218746%29.jpg) | `banff/hero.jpg` | Christoph Strässler | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Panoramic picture of Lake Louise from northern shoreline](https://commons.wikimedia.org/wiki/File:Panoramic_picture_of_Lake_Louise_from_northern_shoreline.jpg) | `banff/lake-louise.jpg` | Ethan Sahagun | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Mirror Lake with Big Beehive - Banff (33183188493)](https://commons.wikimedia.org/wiki/File:Mirror_Lake_with_Big_Beehive_-_Banff_%2833183188493%29.jpg) | `banff/mirror-lake.jpg` | m01229 | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Lake Agnes Tea House (15464773570)](https://commons.wikimedia.org/wiki/File:Lake_Agnes_Tea_House_%2815464773570%29.jpg) | `banff/tea-house.jpg` | Wilson Hui | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [View of Lake Louise from the Big Beehive Hike (33866197851)](https://commons.wikimedia.org/wiki/File:View_of_Lake_Louise_from_the_Big_Beehive_Hike_%2833866197851%29.jpg) | `banff/beehive.jpg` | m01229 | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Alberta - Lake Louise - Lake view 01](https://commons.wikimedia.org/wiki/File:Alberta_-_Lake_Louise_-_Lake_view_01.jpg) | `banff/back.jpg` | Benefactor123 | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [Evening Ganga Aarti at Dashashwamedh Ghat](https://commons.wikimedia.org/wiki/File:Evening_Ganga_Aarti_at_Dashashwamedh_Ghat.JPG) | `varanasi/hero.jpg` | AKS.9955 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Assi ghat banaras mandiro ka seher](https://commons.wikimedia.org/wiki/File:Assi_ghat_banaras_mandiro_ka_seher.jpg) | `varanasi/assi.jpg` | Akshay8090 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Kedar Ghat-Varanasi India-Andres Larin](https://commons.wikimedia.org/wiki/File:Kedar_Ghat-Varanasi_India-Andres_Larin.jpg) | `varanasi/kedar.jpg` | Saaremees | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Ganga Aarti at Dashashwamedh Ghat, Varanasi](https://commons.wikimedia.org/wiki/File:Ganga_Aarti_at_Dashashwamedh_Ghat,_Varanasi.jpg) | `varanasi/aarti.jpg` | Chetanbtc | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Diya Pujan at Ganga Aarti at Dashashwamedh Ghat, Varanasi](https://commons.wikimedia.org/wiki/File:Diya_Pujan_at_Ganga_Aarti_at_Dashashwamedh_Ghat,_Varanasi.jpg) | `varanasi/diya.jpg` | Chetanbtc | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Wat Pha Lat, Chiang Mai 20250116](https://commons.wikimedia.org/wiki/File:Wat_Pha_Lat,_Chiang_Mai_20250116.jpg) | `chiang-mai/hero.jpg` | Supanut Arunoprayote | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Doi Suthep Monk Trail 1](https://commons.wikimedia.org/wiki/File:Doi_Suthep_Monk_Trail_1.jpg) | `chiang-mai/trail-1.jpg` | Christophe95 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Doi Suthep Monk Trail 3](https://commons.wikimedia.org/wiki/File:Doi_Suthep_Monk_Trail_3.jpg) | `chiang-mai/trail-3.jpg` | Christophe95 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Doi Suthep Monk Trail 2](https://commons.wikimedia.org/wiki/File:Doi_Suthep_Monk_Trail_2.jpg) | `chiang-mai/trail-2.jpg` | Christophe95 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Chiang Mai - Wat Pha Lat - 0001](https://commons.wikimedia.org/wiki/File:Chiang_Mai_-_Wat_Pha_Lat_-_0001.jpg) | `chiang-mai/pha-lat.jpg` | Stefan Fussan | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Chiang Mai - Wat Pha Lat - วัดผาลาด เชียงใหม่ (2026) - IMG 20](https://commons.wikimedia.org/wiki/File:Chiang_Mai_-_Wat_Pha_Lat_-_วัดผาลาด_เชียงใหม่_%282026%29_-_IMG_20.jpg) | `chiang-mai/terrace.jpg` | Chainwit. | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Wale Street houses and Lion's Head, Bo-Kaap, Cape Town](https://commons.wikimedia.org/wiki/File:Wale_Street_houses_and_Lion%27s_Head,_Bo-Kaap,_Cape_Town.jpg) | `cape-town/hero.jpg` | Daniel Case | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Cape Town (ZA), Company's Garden -- 2024 -- 3457](https://commons.wikimedia.org/wiki/File:Cape_Town_%28ZA%29,_Company%27s_Garden_--_2024_--_3457.jpg) | `cape-town/garden.jpg` | Dietmar Rabich | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Iziko Slave Lodge photo4](https://commons.wikimedia.org/wiki/File:Iziko_Slave_Lodge_photo4.jpg) | `cape-town/slave-lodge.jpg` | Sami Mlouhi | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Cape Town (ZA), Wale Street -- 2024 -- 3536](https://commons.wikimedia.org/wiki/File:Cape_Town_%28ZA%29,_Wale_Street_--_2024_--_3536.jpg) | `cape-town/wale-street.jpg` | Dietmar Rabich | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Dorp Street, Bo-Kaap, Cape Town](https://commons.wikimedia.org/wiki/File:Dorp_Street,_Bo-Kaap,_Cape_Town.JPG) | `cape-town/dorp-street.jpg` | Martinvl | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Sunset from Signal Hill 2019](https://commons.wikimedia.org/wiki/File:Sunset_from_Signal_Hill_2019.jpg) | `cape-town/signal-hill.jpg` | kallerna | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Pavo cristatus (Indian Peafowl) 32](https://commons.wikimedia.org/wiki/File:Pavo_cristatus_%28Indian_Peafowl%29_32.jpg) | `key-biscayne/hero.jpg` | gary_leavens | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Miami skyline from rusty pelican 1](https://commons.wikimedia.org/wiki/File:Miami_skyline_from_rusty_pelican_1.JPG) | `key-biscayne/skyline.jpg` | Captain-tucker | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Miami skyline from rusty pelican 2](https://commons.wikimedia.org/wiki/File:Miami_skyline_from_rusty_pelican_2.JPG) | `key-biscayne/rusty-pelican.jpg` | Captain-tucker | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Crandon Beach](https://commons.wikimedia.org/wiki/File:Crandon_Beach.jpg) | `key-biscayne/beach.jpg` | Mathieu Plourde | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Crandon Park Modified](https://commons.wikimedia.org/wiki/File:Crandon_Park_Modified.jpg) | `key-biscayne/palms.jpg` | Paulkondratuk3194 | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Pavo cristatus (Indian Peafowl) 31](https://commons.wikimedia.org/wiki/File:Pavo_cristatus_%28Indian_Peafowl%29_31.jpg) | `key-biscayne/peacock.jpg` | gary_leavens | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [SUNSET AT BISCAYNE BAY, MIAMI, FLORIDA. - panoramio](https://commons.wikimedia.org/wiki/File:SUNSET_AT_BISCAYNE_BAY,_MIAMI,_FLORIDA._-_panoramio.jpg) | `key-biscayne/sunset.jpg` | Rodolfo L. Hernandez | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [SUNSET AT BOATER'S GRILL - panoramio](https://commons.wikimedia.org/wiki/File:SUNSET_AT_BOATER%27S_GRILL_-_panoramio.jpg) | `key-biscayne/boaters-grill.jpg` | Rodolfo L. Hernandez | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Cape Florida Lighthouse from the beach](https://commons.wikimedia.org/wiki/File:Cape_Florida_Lighthouse_from_the_beach.JPG) | `key-biscayne/lighthouse.jpg` | Bradleyjs34 | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [20170829 Miami 1881 Frost Science Museum sRGB](https://commons.wikimedia.org/wiki/File:20170829_Miami_1881_Frost_Science_Museum_sRGB.jpg) | `miami-downtown/hero.jpg` | Dan Lundberg | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Miami Circle 20110307](https://commons.wikimedia.org/wiki/File:Miami_Circle_20110307.jpg) | `miami-downtown/miami-circle.jpg` | Averette | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [Miami FL Miami Circle from Brickell Ave Bridge01](https://commons.wikimedia.org/wiki/File:Miami_FL_Miami_Circle_from_Brickell_Ave_Bridge01.jpg) | `miami-downtown/bridge-view.jpg` | Ebyabe | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Metromover Miami river bridge 2012-04](https://commons.wikimedia.org/wiki/File:Metromover_Miami_river_bridge_2012-04.jpg) | `miami-downtown/metromover.jpg` | Ed Webster | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Bayfront Park - panoramio (5)](https://commons.wikimedia.org/wiki/File:Bayfront_Park_-_panoramio_%285%29.jpg) | `miami-downtown/bayfront.jpg` | Pietro Valocchi | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [Bayside Miami](https://commons.wikimedia.org/wiki/File:Bayside_Miami.JPG) | `miami-downtown/bayside.jpg` | Jorfer | [Public domain](https://en.wikipedia.org/wiki/Public_domain) |
| [Perez museum, Miami, Florida, Usa (51015332721)](https://commons.wikimedia.org/wiki/File:Perez_museum,_Miami,_Florida,_Usa_%2851015332721%29.jpg) | `miami-downtown/pamm-terrace.jpg` | Paolo Gamba | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Perez Museum, Maimi, Florida, USA (51019280686)](https://commons.wikimedia.org/wiki/File:Perez_Museum,_Maimi,_Florida,_USA_%2851019280686%29.jpg) | `miami-downtown/verde.jpg` | Paolo Gamba | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Domino Park Little Havana, Miami FL, Feb 2024](https://commons.wikimedia.org/wiki/File:Domino_Park_Little_Havana,_Miami_FL,_Feb_2024.jpg) | `little-havana/hero.jpg` | Phillip Pessar | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Cubanmemorialplaza](https://commons.wikimedia.org/wiki/File:Cubanmemorialplaza.jpg) | `little-havana/memorial.jpg` | Averette | [Public domain](https://en.wikipedia.org/wiki/Public_domain) |
| [Islandofcubamonument](https://commons.wikimedia.org/wiki/File:Islandofcubamonument.jpg) | `little-havana/cuba-map.jpg` | Averette | [Public domain](https://en.wikipedia.org/wiki/Public_domain) |
| [Thalia Star Little Havana Latin Walk Of Fame](https://commons.wikimedia.org/wiki/File:Thalia_Star_Little_Havana_Latin_Walk_Of_Fame.jpg) | `little-havana/star.jpg` | Phillip Pessar | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Welcome To Calle Ocho Rooster](https://commons.wikimedia.org/wiki/File:Welcome_To_Calle_Ocho_Rooster.jpg) | `little-havana/rooster.jpg` | Phillip Pessar | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Tower Theater (Miami, Florida)](https://commons.wikimedia.org/wiki/File:Tower_Theater_%28Miami,_Florida%29.jpg) | `little-havana/tower-theater.jpg` | Tamanoeconomico | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Domino Park (Miami, Florida)](https://commons.wikimedia.org/wiki/File:Domino_Park_%28Miami,_Florida%29.jpg) | `little-havana/domino-park.jpg` | Tamanoeconomico | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Versailles Restaurant - Little Havana, Miami, October 2010](https://commons.wikimedia.org/wiki/File:Versailles_Restaurant_-_Little_Havana,_Miami,_October_2010.jpg) | `little-havana/versailles.jpg` | Eugene Kim | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Miccosukee airboat tour](https://commons.wikimedia.org/wiki/File:Miccosukee_airboat_tour.JPG) | `miccosukee/hero.jpg` | Palmtreeshadows | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Miccosukee Indian Village, Miccosukee Indian Reservation, Florida. - panoramio](https://commons.wikimedia.org/wiki/File:Miccosukee_Indian_Village,_Miccosukee_Indian_Reservation,_Florida._-_panoramio.jpg) | `miccosukee/village.jpg` | olekinderhook | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [Miccosukee guide & baby A. mississippiensis](https://commons.wikimedia.org/wiki/File:Miccosukee_guide_%26_baby_A._mississippiensis.jpg) | `miccosukee/baby-gator.jpg` | Ianaré Sévi | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Bobcat Boardwalk Opening with Sign (30810716888)](https://commons.wikimedia.org/wiki/File:Bobcat_Boardwalk_Opening_with_Sign_%2830810716888%29.jpg) | `miccosukee/boardwalk.jpg` | National Park Service (evergladesnps) | [Public domain](https://en.wikipedia.org/wiki/Public_domain) |
| [Watching Sunset Over Marshes](https://commons.wikimedia.org/wiki/File:Watching_Sunset_Over_Marshes.jpg) | `miccosukee/marsh-sunset.jpg` | Wing-Chi Poon | [CC BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5) |
| [Watchful Alligator (6743023761)](https://commons.wikimedia.org/wiki/File:Watchful_Alligator_%286743023761%29.jpg) | `miccosukee/gator.jpg` | KimonBerlin | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |

Stops with no licensed photo yet show `journey/no-image.svg`, a plain
"No image available" card made for the app (no credit needed): Dunmore Town on
Harbour Island, the Observation Tower and post office on Castaway Cay, the
beach at the end of the Bonnet House journey, the Alphonso Giles Boat Ramp, the
evening stop at Matira on Bora Bora, Harishchandra Ghat in Varanasi (a
cremation ghat, left without a photo on purpose), the nature center and fossil
reef on Key Biscayne, and the Miccosukee museum and the Miccosukee Restaurant
(a nearby spot) on the Tamiami Trail.
Real photos can replace it later.

These five Cumberland photos were found in a web search in November 2026,
for the Cumberland test. Who took them, where the sunset and the pond were
taken, and their licences aren’t confirmed yet, so check them, and get
permission or replace them, before the app goes public.

| Photo | Used for |
| --- | --- |
| St. Anthony the Abbot Church, from the front | `cumberland/st-anthony-church.webp` |
| The St. Anthony Abbot Catholic Cemetery sign | `cumberland/st-anthony-cemetery.jpg` |
| The Thomas St. Angelo Public Library, from the corner | `cumberland/library-front.webp` |
| Autumn woods reflected in still water | `cumberland/autumn-pond.jpg` |
| A lake sunset with a dock (cropped to remove a car hood) | `cumberland/lake-sunset-dock.jpg` |

### Photo treatment (Journey Engine V2)

The journeys made to the V2 handoff (so far `marunouchi/`, `duluth-romantic/`,
`duluth-adventurous/`, `duluth-curious/`, `eden-prairie/`, `ohara/`,
`nara/`, `miyajima/`, `kanazawa/`, `grand-bahama/`,
`harbour-island/`, `castaway-cay/`, `ftl-river/`, `bonnet-house/`,
`wade-ins/`, `barefoot-mailman/`, `hollywood-beach/` and the eleven flagship
folders: `bora-bora/`, `mont-saint-michel/`, `florence/`, `chefchaouen/`, `new-york/`,
`san-francisco/`, `la-jolla/`, `banff/`, `varanasi/`, `chiang-mai/`, `cape-town/`, and the four
Miami family journeys' `key-biscayne/`, `miami-downtown/`, `little-havana/` and `miccosukee/`) keep their
untouched downloads in `main-app/photo-originals/` (on the computer that made
them, not in git: `npm run photos -- --fetch` downloads any that are missing,
from exactly where they came from), and the app uses treated copies: Unfold's base look plus the journey's mood on top, at full strength
for its main photo and half for the rest. The looks are in
`photo-originals/looks.json` (starting recipes, to be approved), and every
photo's source, licence, treatment and check results are in
`photo-originals/manifest.json`. `npm run photos` (in `main-app`) remakes
the treated copies from the originals, so changing a look and running it
again updates every photo. A treated copy of a CC BY-SA photo is an
adaptation, so it stays under CC BY-SA, credited as above.
