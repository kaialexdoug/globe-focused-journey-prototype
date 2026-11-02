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
| [Kamakura station east](https://commons.wikimedia.org/wiki/File:Kamakura_station_east.jpg) | `kamakura/station.jpg` | Douglaspperkins | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [Kamakura Komachi street 2024](https://commons.wikimedia.org/wiki/File:Kamakura_Komachi_street_2024.jpg) | `kamakura/komachi-dori.jpg` | ARandomName123 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Tsurugaoka Hachimangu 001](https://commons.wikimedia.org/wiki/File:Tsurugaoka_Hachimangu_001.jpg) | `kamakura/hachimangu.jpg` | Ocdp | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Hokokuji bamboo forest (5712271526)](https://commons.wikimedia.org/wiki/File:Hokokuji_bamboo_forest_(5712271526).jpg) | `kamakura/hokokuji.jpg` | KimonBerlin | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Great Buddha at Kōtoku-in 20190421 1](https://commons.wikimedia.org/wiki/File:Great_Buddha_at_K%C5%8Dtoku-in_20190421_1.jpg) | `kamakura/great-buddha.jpg` | DXR | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Yuigahama 02](https://commons.wikimedia.org/wiki/File:Yuigahama_02.jpg) | `kamakura/yuigahama.jpg` | akira yamada | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Canal Park, Duluth (6134339345)](https://commons.wikimedia.org/wiki/File:Canal_Park,_Duluth_(6134339345).jpg) | `duluth/canal-park.jpg` | Sharon Mollerus | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Aerial Lift Bridge centered](https://commons.wikimedia.org/wiki/File:Aerial_Lift_Bridge_centered.jpg) | `duluth/lift-bridge.jpg` | McGhiever | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Lakewalk, Duluth (33068803463)](https://commons.wikimedia.org/wiki/File:Lakewalk,_Duluth_(33068803463).jpg) | `duluth/lakewalk.jpg` | Sharon Mollerus | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Glensheen Historic Estate](https://commons.wikimedia.org/wiki/File:Glensheen_Historic_Estate.jpg) | `duluth/glensheen.jpg` | Robyn Richardson | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Enger Observation Tower 2014-10-06 - 3](https://commons.wikimedia.org/wiki/File:Enger_Observation_Tower_2014-10-06_-_3.jpg) | `duluth/enger-tower.jpg` | August Schwerdfeger | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Park Point Beach Duluth Minnesota 15187860634](https://commons.wikimedia.org/wiki/File:Park_Point_Beach_Duluth_Minnesota_15187860634.jpg) | `duluth/park-point.jpg` | Tony Webster | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Hakone-Yumoto-Station-Front-entrance](https://commons.wikimedia.org/wiki/File:Hakone-Yumoto-Station-Front-entrance.jpg) | `hakone/yumoto.jpg` | Kansai-good | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Hakone Open-air Museum 20211202-5](https://commons.wikimedia.org/wiki/File:Hakone_Open-air_Museum_20211202-5.jpg) | `hakone/open-air-museum.jpg` | Suicasmo | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Owakudani Valley and Mount Kammurigatake near Owakudani Station 2](https://commons.wikimedia.org/wiki/File:Owakudani_Valley_and_Mount_Kammurigatake_near_Owakudani_Station_2.JPG) | `hakone/owakudani.jpg` | そらみみ | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Hakone Sekisho](https://commons.wikimedia.org/wiki/File:Hakone_Sekisho.jpg) | `hakone/checkpoint.jpg` | Steph Gray from London, United Kingdom | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Torii on Lake Ashi @ Hakone Shrine (13776878594)](https://commons.wikimedia.org/wiki/File:Torii_on_Lake_Ashi_@_Hakone_Shrine_(13776878594).jpg) | `hakone/hakone-shrine.jpg` | Guilhem Vellut from Annecy, France | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Old Tokaido - Hakone](https://commons.wikimedia.org/wiki/File:Old_Tokaido_-_Hakone.jpg) | `hakone/cedar-avenue.jpg` | Quercus acuta | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [20250103 Motomachi, Yokohama 122408](https://commons.wikimedia.org/wiki/File:20250103_Motomachi,_Yokohama_122408.jpg) | `yokohama/motomachi.jpg` | Matthide127 | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Yokohama Chinatown 9](https://commons.wikimedia.org/wiki/File:Yokohama_Chinatown_9.jpg) | `yokohama/chinatown.jpg` | Syced | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [English Rose Park 2, Yokohama Harbor View Park](https://commons.wikimedia.org/wiki/File:English_Rose_Park_2,_Yokohama_Harbor_View_Park.jpg) | `yokohama/harbor-view-park.jpg` | Yoshi Canopus | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Yamashita Park Hikawa Maru (49820922166)](https://commons.wikimedia.org/wiki/File:Yamashita_Park_Hikawa_Maru_(49820922166).jpg) | `yokohama/hikawa-maru.jpg` | Steven Byles from Yokohama, Japan | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Osanbashi Pier @ Yokohama (9052350399)](https://commons.wikimedia.org/wiki/File:Osanbashi_Pier_@_Yokohama_(9052350399).jpg) | `yokohama/osanbashi.jpg` | Guilhem Vellut from Annecy, France | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Yokohama Red Brick Warehouse 2](https://commons.wikimedia.org/wiki/File:Yokohama_Red_Brick_Warehouse_2.jpg) | `yokohama/red-brick.jpg` | Syced | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Keisei Nippori-STA Outside West](https://commons.wikimedia.org/wiki/File:Keisei_Nippori-STA_Outside_West.jpg) | `yanaka/nippori.jpg` | MaedaAkihiko | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Yanaka 20130326 155108](https://commons.wikimedia.org/wiki/File:Yanaka_20130326_155108.jpg) | `yanaka/cemetery.jpg` | Ka23 13 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Yanaka Ginza entrance](https://commons.wikimedia.org/wiki/File:Yanaka_Ginza_entrance.jpg) | `yanaka/yanaka-ginza.jpg` | 1904.CC | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Tokyo - Yanaka 064 - SCAI The Bathhouse (15187739194)](https://commons.wikimedia.org/wiki/File:Tokyo_-_Yanaka_064_-_SCAI_The_Bathhouse_(15187739194).jpg) | `yanaka/scai.jpg` | Joe Mabel on Flickr as Joe Mabel from Seattle, US | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Entrance to The Path of Torii in Nezu Shrine Tokyo](https://commons.wikimedia.org/wiki/File:Entrance_to_The_Path_of_Torii_in_Nezu_Shrine_Tokyo.jpg) | `yanaka/nezu-shrine.jpg` | Charlie fong | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Shinobazu Pond](https://commons.wikimedia.org/wiki/File:Shinobazu_Pond.jpg) | `yanaka/shinobazu.jpg` | Fred Cherrygarden | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Around Takaosanguchi station 4](https://commons.wikimedia.org/wiki/File:Around_Takaosanguchi_station_4.jpg) | `takao/station.jpg` | Syced | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Around Takaosanguchi station 5](https://commons.wikimedia.org/wiki/File:Around_Takaosanguchi_station_5.jpg) | `takao/cable-car.jpg` | Syced | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Yakuoin Temple @ Mount Takao (13778522205)](https://commons.wikimedia.org/wiki/File:Yakuoin_Temple_@_Mount_Takao_(13778522205).jpg) | `takao/yakuoin.jpg` | Guilhem Vellut from Annecy, France | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Japanese Macaque Monkeys, in Mt Takao Monkey Park, 2024](https://commons.wikimedia.org/wiki/File:Japanese_Macaque_Monkeys,_in_Mt_Takao_Monkey_Park,_2024.jpg) | `takao/monkey-park.jpg` | Klaasjeoranje | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Summit @ Mount Takao (9876506485)](https://commons.wikimedia.org/wiki/File:Summit_@_Mount_Takao_(9876506485).jpg) | `takao/summit.jpg` | Guilhem Vellut from Annecy, France | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Keio-Takaosan-Onsen-Gokurakuyu](https://commons.wikimedia.org/wiki/File:Keio-Takaosan-Onsen-Gokurakuyu.jpg) | `takao/gokurakuyu.jpg` | Thirteen-fri | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Tobu Nikko Station, ekisha](https://commons.wikimedia.org/wiki/File:Tobu_Nikko_Station,_ekisha.jpg) | `nikko/station.jpg` | Saigen Jiro | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Shinkyo Bridge over the Daiya River at Nikko, Japan3](https://commons.wikimedia.org/wiki/File:Shinkyo_Bridge_over_the_Daiya_River_at_Nikko,_Japan3.jpg) | `nikko/shinkyo.jpg` | Joli Rumi | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Nikkosan Rinnoji Temple, Nikko, Japan](https://commons.wikimedia.org/wiki/File:Nikkosan_Rinnoji_Temple,_Nikko,_Japan.jpg) | `nikko/rinnoji.jpg` | Joli Rumi | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Nikko Mausoleum Rin-no-ji Taiyuin Heiligtum Kara-mon 1](https://commons.wikimedia.org/wiki/File:Nikko_Mausoleum_Rin-no-ji_Taiyuin_Heiligtum_Kara-mon_1.jpg) | `nikko/taiyuin.jpg` | Zairon | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Nikko Toshogu Yomeimon Gate 2024](https://commons.wikimedia.org/wiki/File:Nikko_Toshogu_Yomeimon_Gate_2024.jpg) | `nikko/toshogu.jpg` | Jpatokal | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Bake-jizo, Kanmangafuchi abyss](https://commons.wikimedia.org/wiki/File:Bake-jizo,_Kanmangafuchi_abyss.jpg) | `nikko/kanmangafuchi.jpg` | Miyuki Meinaka | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [JR成田駅20240503-P1041913](https://commons.wikimedia.org/wiki/File:JR%E6%88%90%E7%94%B0%E9%A7%8520240503-P1041913.jpg) | `narita/station.jpg` | くろふね | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Omotesando @ Evening @ Narita (15257653101)](https://commons.wikimedia.org/wiki/File:Omotesando_@_Evening_@_Narita_(15257653101).jpg) | `narita/omotesando.jpg` | Guilhem Vellut from Annecy, France | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Naritasan Shinshoji Temple](https://commons.wikimedia.org/wiki/File:Naritasan_Shinshoji_Temple.jpg) | `narita/shinshoji.jpg` | Manish Prabhune | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [NaritasanShodoBijutsukan20131012](https://commons.wikimedia.org/wiki/File:NaritasanShodoBijutsukan20131012.jpg) | `narita/calligraphy-museum.jpg` | 三人日 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Great Pagoda of Peace @ Naritasan Shinshoji Temple @ Narita (15262546051)](https://commons.wikimedia.org/wiki/File:Great_Pagoda_of_Peace_@_Naritasan_Shinshoji_Temple_@_Narita_(15262546051).jpg) | `narita/pagoda.jpg` | Guilhem Vellut from Annecy, France | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Kawatoyo Honten, eel restaurant in Narita 01](https://commons.wikimedia.org/wiki/File:Kawatoyo_Honten,_eel_restaurant_in_Narita_01.jpg) | `narita/kawatoyo.jpg` | Miyuki Meinaka | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Seibu chichibu sta. 20180101](https://commons.wikimedia.org/wiki/File:Seibu_chichibu_sta._20180101.jpg) | `chichibu/station.jpg` | Kaze315 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Chichibu-jinja ac (10)](https://commons.wikimedia.org/wiki/File:Chichibu-jinja_ac_(10).jpg) | `chichibu/chichibu-shrine.jpg` | Asturio Cantabrio | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Chichibu Hitsujiyama Park Phlox Hill 2](https://commons.wikimedia.org/wiki/File:Chichibu_Hitsujiyama_Park_Phlox_Hill_2.JPG) | `chichibu/hitsujiyama.jpg` | 京浜にけ | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Chichibu Matsuri Kaikan](https://commons.wikimedia.org/wiki/File:Chichibu_Matsuri_Kaikan.JPG) | `chichibu/festival-hall.jpg` | あばさー | Public domain |
| [Nagatoro Iwadatami and Arakawa River (52698440642)](https://commons.wikimedia.org/wiki/File:Nagatoro_Iwadatami_and_Arakawa_River_(52698440642).jpg) | `chichibu/iwadatami.jpg` | Big Ben in Japan from Kawasaki, Japan | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Hodosan Shrine (Mt. Treasure-climb Shrine) - 宝登山神社 - panoramio (13)](https://commons.wikimedia.org/wiki/File:Hodosan_Shrine_(Mt._Treasure-climb_Shrine)_-_%E5%AE%9D%E7%99%BB%E5%B1%B1%E7%A5%9E%E7%A4%BE_-_panoramio_(13).jpg) | `chichibu/hodosan.jpg` | Carbonium | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [251128 Kusatsu Onsen Bus Terminal 01](https://commons.wikimedia.org/wiki/File:251128_Kusatsu_Onsen_Bus_Terminal_01.jpg) | `kusatsu/bus-terminal.jpg` | Aspere | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [草津・西の河原通り - panoramio](https://commons.wikimedia.org/wiki/File:%E8%8D%89%E6%B4%A5%E3%83%BB%E8%A5%BF%E3%81%AE%E6%B2%B3%E5%8E%9F%E9%80%9A%E3%82%8A_-_panoramio.jpg) | `kusatsu/sainokawara-dori.jpg` | KΛNΛTΛ | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [251129 Sainokawara Park 01](https://commons.wikimedia.org/wiki/File:251129_Sainokawara_Park_01.jpg) | `kusatsu/sainokawara-park.jpg` | Aspere | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Kusatsu Yumomi, Gunma 01](https://commons.wikimedia.org/wiki/File:Kusatsu_Yumomi,_Gunma_01.jpg) | `kusatsu/netsunoyu.jpg` | Σ64 | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [251130 Yubatake, Kusatsu 10](https://commons.wikimedia.org/wiki/File:251130_Yubatake,_Kusatsu_10.jpg) | `kusatsu/yubatake.jpg` | Aspere | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [251129 Otaki-no-yu 02](https://commons.wikimedia.org/wiki/File:251129_Otaki-no-yu_02.jpg) | `kusatsu/otakinoyu.jpg` | Aspere | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Fujikyuko Shimoyoshida Sta 20161026](https://commons.wikimedia.org/wiki/File:Fujikyuko_Shimoyoshida_Sta_20161026.jpg) | `fujiyoshida/station.jpg` | Kounoichi | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Honcho Street with Mount Fuji in the daytime, Fujiyoshida, 2016](https://commons.wikimedia.org/wiki/File:Honcho_Street_with_Mount_Fuji_in_the_daytime,_Fujiyoshida,_2016.jpg) | `fujiyoshida/honcho-dori.jpg` | DimiTalen | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Torii, Arakura Fuji-sengen-jinja shrine - Dec 1, 2014](https://commons.wikimedia.org/wiki/File:Torii,_Arakura_Fuji-sengen-jinja_shrine_-_Dec_1,_2014.jpg) | `fujiyoshida/arakura-shrine.jpg` | bethom33 | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Kitaguchi Hongu Fuji Sengen jinja Torii](https://commons.wikimedia.org/wiki/File:Kitaguchi_Hongu_Fuji_Sengen_jinja_Torii.jpg) | `fujiyoshida/kitaguchi-hongu.jpg` | 江戸村のとくぞう | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Chureito Pagoda, Fujiyoshida (34126027751)](https://commons.wikimedia.org/wiki/File:Chureito_Pagoda,_Fujiyoshida_(34126027751).jpg) | `fujiyoshida/chureito.jpg` | Olivier Bruchez from Lausanne, Switzerland | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Lake Kawaguchi (Kawaguchi-ko)](https://commons.wikimedia.org/wiki/File:Lake_Kawaguchi_(Kawaguchi-ko).jpg) | `fujiyoshida/lake-kawaguchi.jpg` | ANA CARINA NOGUEIRA VASCONCELOS | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Two Harbors Light Minnesota](https://commons.wikimedia.org/wiki/File:Two_Harbors_Light_Minnesota.jpg) | `north-shore/lighthouse.jpg` | pmarkham | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Edna G Tug Boat, Two Harbors -a](https://commons.wikimedia.org/wiki/File:Edna_G_Tug_Boat,_Two_Harbors_-a.jpg) | `north-shore/edna-g.jpg` | Deacon Steve Moses from Northfield, U.S.A. | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Goosberry Falls](https://commons.wikimedia.org/wiki/File:Goosberry_Falls.jpg) | `north-shore/gooseberry-falls.jpg` | ZMoreno387 | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Iona's Beach (14528338996)](https://commons.wikimedia.org/wiki/File:Iona%27s_Beach_(14528338996).jpg) | `north-shore/ionas-beach.jpg` | Justin Meissen from St Paul, United States | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Split Rock Light Station](https://commons.wikimedia.org/wiki/File:Split_Rock_Light_Station.jpg) | `north-shore/split-rock.jpg` | MichaelDPhotos | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Palisade, Shovel Point](https://commons.wikimedia.org/wiki/File:Palisade,_Shovel_Point.jpg) | `north-shore/palisade-head.jpg` | Kablammo | Public domain |
| [U.S. Bank Stadium 2021-09-23](https://commons.wikimedia.org/wiki/File:U.S._Bank_Stadium_2021-09-23.jpg) | `minneapolis/stadium.jpg` | August Schwerdfeger | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Minneapolis April 2025 43 (Gold Medal Park)](https://commons.wikimedia.org/wiki/File:Minneapolis_April_2025_43_(Gold_Medal_Park).jpg) | `minneapolis/gold-medal-park.jpg` | Michael Barera | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Mill City Museum (22092582921)](https://commons.wikimedia.org/wiki/File:Mill_City_Museum_(22092582921).jpg) | `minneapolis/mill-city.jpg` | Greg Gjerdingen from Willmar, USA | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Guthrie Theater, 2nd Street, Mill District, Minneapolis, MN - 51780814756](https://commons.wikimedia.org/wiki/File:Guthrie_Theater,_2nd_Street,_Mill_District,_Minneapolis,_MN_-_51780814756.jpg) | `minneapolis/guthrie.jpg` | w_lemay | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Stone Arch Bridge as viewed from downriver 2019-08-08](https://commons.wikimedia.org/wiki/File:Stone_Arch_Bridge_as_viewed_from_downriver_2019-08-08.jpg) | `minneapolis/stone-arch-bridge.jpg` | August Schwerdfeger | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [St Anthony Main at night](https://commons.wikimedia.org/wiki/File:St_Anthony_Main_at_night.JPG) | `minneapolis/st-anthony-main.jpg` | Mark Vancleave (Mark.fenris at English Wikipedia) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Stillwater in September 2017 01 - riverfront](https://commons.wikimedia.org/wiki/File:Stillwater_in_September_2017_01_-_riverfront.jpg) | `stillwater/lowell-park.jpg` | Runner1928 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Stillwater in September 2017 16 - skyline from Teddy Bear Park](https://commons.wikimedia.org/wiki/File:Stillwater_in_September_2017_16_-_skyline_from_Teddy_Bear_Park.jpg) | `stillwater/main-street.jpg` | Runner1928 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Stillwater in September 2017 08 - Historic Courthouse from Veteran's Memorial](https://commons.wikimedia.org/wiki/File:Stillwater_in_September_2017_08_-_Historic_Courthouse_from_Veteran%27s_Memorial.jpg) | `stillwater/courthouse.jpg` | Runner1928 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Warden's House Museum-front](https://commons.wikimedia.org/wiki/File:Warden%27s_House_Museum-front.jpg) | `stillwater/wardens-house.jpg` | Myotus | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Stillwater Bridge (Minnesota) 1](https://commons.wikimedia.org/wiki/File:Stillwater_Bridge_(Minnesota)_1.jpg) | `stillwater/lift-bridge.jpg` | Kathleen Conklin from Falls Church, USA | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Stillwater Lift Bridge 6-23-17](https://commons.wikimedia.org/wiki/File:Stillwater_Lift_Bridge_6-23-17.jpg) | `stillwater/lift-bridge-night.jpg` | John Davis | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Breadsmith, Grand Ave. St Paul 787](https://commons.wikimedia.org/wiki/File:Breadsmith,_Grand_Ave._St_Paul_787.jpg) | `st-paul/grand-avenue.jpg` | Dankarl | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [The Davidson Mansion, Summit Avenue, Cathedral Hill, Saint Paul, MN](https://commons.wikimedia.org/wiki/File:The_Davidson_Mansion,_Summit_Avenue,_Cathedral_Hill,_Saint_Paul,_MN.jpg) | `st-paul/summit-avenue.jpg` | w_lemay | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [James J. Hill House (1)](https://commons.wikimedia.org/wiki/File:James_J._Hill_House_(1).jpg) | `st-paul/hill-house.jpg` | Teemu008 | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Minnesota State Capitol - 54147672485](https://commons.wikimedia.org/wiki/File:Minnesota_State_Capitol_-_54147672485.jpg) | `st-paul/capitol.jpg` | xiquinhosilva | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Cathedral of Saint Paul (Minnesota) 5](https://commons.wikimedia.org/wiki/File:Cathedral_of_Saint_Paul_(Minnesota)_5.jpg) | `st-paul/cathedral.jpg` | AlexiusHoratius | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Saint Paul April 2025 16 (Rice Park and Landmark Center)](https://commons.wikimedia.org/wiki/File:Saint_Paul_April_2025_16_(Rice_Park_and_Landmark_Center).jpg) | `st-paul/rice-park.jpg` | Michael Barera | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Minnehaha Park in autumn 51](https://commons.wikimedia.org/wiki/File:Minnehaha_Park_in_autumn_51.jpg) | `minnehaha/park.jpg` | Runner1928 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Minnehaha Park in autumn 28](https://commons.wikimedia.org/wiki/File:Minnehaha_Park_in_autumn_28.jpg) | `minnehaha/depot.jpg` | Runner1928 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Longfellow House](https://commons.wikimedia.org/wiki/File:Longfellow_House.jpg) | `minnehaha/longfellow-house.jpg` | McGhiever | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Minnehaha Park in autumn 48](https://commons.wikimedia.org/wiki/File:Minnehaha_Park_in_autumn_48.jpg) | `minnehaha/statue.jpg` | Runner1928 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Minnehaha Falls, Minneapolis](https://commons.wikimedia.org/wiki/File:Minnehaha_Falls,_Minneapolis.jpg) | `minnehaha/falls.jpg` | Mikael Häggström | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Minnehaha Park in autumn 49](https://commons.wikimedia.org/wiki/File:Minnehaha_Park_in_autumn_49.jpg) | `minnehaha/glen.jpg` | Runner1928 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Red Wing Amtrak Depot](https://commons.wikimedia.org/wiki/File:Red_Wing_Amtrak_Depot.jpg) | `red-wing/depot.jpg` | McGhiever | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Red Wing Shoe Museum](https://commons.wikimedia.org/wiki/File:Red_Wing_Shoe_Museum.jpg) | `red-wing/shoe-store.jpg` | McGhiever | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| [Downtown Red Wing, Minnesota (38846021592)](https://commons.wikimedia.org/wiki/File:Downtown_Red_Wing,_Minnesota_(38846021592).jpg) | `red-wing/main-street.jpg` | Tony Webster from Minneapolis, Minnesota, United States | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Pottery Museum of Red Wing](https://commons.wikimedia.org/wiki/File:Pottery_Museum_of_Red_Wing.jpg) | `red-wing/pottery-place.jpg` | Myotus | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Red Wing, Minnesota](https://commons.wikimedia.org/wiki/File:Red_Wing,_Minnesota.jpg) | `red-wing/barn-bluff.jpg` | Nuqrat at English Wikipedia | Public domain |
| [Mississippi River - Red Wing, Minnesota (27163201529)](https://commons.wikimedia.org/wiki/File:Mississippi_River_-_Red_Wing,_Minnesota_(27163201529).jpg) | `red-wing/riverfront.jpg` | Tony Webster from Minneapolis, Minnesota, United States | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [Douglas Lodge at Itasca State Park](https://commons.wikimedia.org/wiki/File:Douglas_Lodge_at_Itasca_State_Park.jpg) | `itasca/douglas-lodge.jpg` | Robbschultz69 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Preacher's Grove Trail - Itasca State Park, Minnesota (34527960794)](https://commons.wikimedia.org/wiki/File:Preacher%27s_Grove_Trail_-_Itasca_State_Park,_Minnesota_(34527960794).jpg) | `itasca/preachers-grove.jpg` | Tony Webster from Minneapolis, Minnesota, United States | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [2023-05-28 Minnesota - 86 - Itasca State Park - (27)](https://commons.wikimedia.org/wiki/File:2023-05-28_Minnesota_-_86_-_Itasca_State_Park_-_(27).jpg) | `itasca/headwaters-center.jpg` | TrevorFisher | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Aiton Heights Fire Tower](https://commons.wikimedia.org/wiki/File:Aiton_Heights_Fire_Tower.jpg) | `itasca/fire-tower.jpg` | Tlkremer | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Mississippi Headwaters at Lake Itasca](https://commons.wikimedia.org/wiki/File:Mississippi_Headwaters_at_Lake_Itasca.jpg) | `itasca/headwaters.jpg` | Greg Gjerdingen | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Lake Itasca - Summer Storms at Itasca State Park, Minnesota (47967322921)](https://commons.wikimedia.org/wiki/File:Lake_Itasca_-_Summer_Storms_at_Itasca_State_Park,_Minnesota_(47967322921).jpg) | `itasca/lake-itasca.jpg` | Tony Webster from Minneapolis, Minnesota, United States | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Grand Marais Lake Dusk](https://commons.wikimedia.org/wiki/File:Grand_Marais_Lake_Dusk.jpg) | `grand-marais/harbor.jpg` | Prosthetic Head | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Worlds Best Donuts in Grand Marais, Minnesota (53224171384)](https://commons.wikimedia.org/wiki/File:Worlds_Best_Donuts_in_Grand_Marais,_Minnesota_(53224171384).jpg) | `grand-marais/donuts.jpg` | Lorie Shaull from St Paul, United States | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| [Woodworking with Hand Tools at the North House Folk School in Grand Marais, MN](https://commons.wikimedia.org/wiki/File:Woodworking_with_Hand_Tools_at_the_North_House_Folk_School_in_Grand_Marais,_MN.jpg) | `grand-marais/north-house.jpg` | Terasaface | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Cascade River State Park Lookout](https://commons.wikimedia.org/wiki/File:Cascade_River_State_Park_Lookout.jpg) | `grand-marais/cascade-river.jpg` | James B. Bleeker | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Artist Point 1](https://commons.wikimedia.org/wiki/File:Artist_Point_1.jpg) | `grand-marais/artists-point.jpg` | Chris Light | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Lighthouse Of Grand Marais (231105321)](https://commons.wikimedia.org/wiki/File:Lighthouse_Of_Grand_Marais_(231105321).jpeg) | `grand-marais/lighthouse.jpg` | Robin Férand | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) |
| [20240923 United Methodist Church, Taylors Falls, MN](https://commons.wikimedia.org/wiki/File:20240923_United_Methodist_Church,_Taylors_Falls,_MN.jpg) | `taylors-falls/angel-hill.jpg` | Myotus | [CC0](https://creativecommons.org/publicdomain/zero/1.0) |
| [Taylors Falls Minnesota downtown looking north MN95 St Croix Scenic Byway](https://commons.wikimedia.org/wiki/File:Taylors_Falls_Minnesota_downtown_looking_north_MN95_St_Croix_Scenic_Byway.jpg) | `taylors-falls/bench-street.jpg` | Royalbroil | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [The Dalles of the St. Croix River - Interstate State Park - Taylors Falls, Minnesota - 6125948264](https://commons.wikimedia.org/wiki/File:The_Dalles_of_the_St._Croix_River_-_Interstate_State_Park_-_Taylors_Falls,_Minnesota_-_6125948264.jpg) | `taylors-falls/potholes.jpg` | Dougtone | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| [St Croix River, MN](https://commons.wikimedia.org/wiki/File:St_Croix_River,_MN.jpg) | `taylors-falls/riverboat.jpg` | Kristinhovden | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| [Taylors Falls Fall Scenery - panoramio (1)](https://commons.wikimedia.org/wiki/File:Taylors_Falls_Fall_Scenery_-_panoramio_(1).jpg) | `taylors-falls/dalles.jpg` | mjdemay | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| [Franconia Sculpture Park in Shafer, Minnesota 04](https://commons.wikimedia.org/wiki/File:Franconia_Sculpture_Park_in_Shafer,_Minnesota_04.jpg) | `taylors-falls/franconia.jpg` | Lorie Shaull | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
