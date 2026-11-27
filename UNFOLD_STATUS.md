# Unfold: where the app stands (20 November 2026)

A briefing for another Claude chat. It covers what Unfold is, how it works now, every feature built so far, and what's still open.

---

## 1. What Unfold is

Unfold is a phone-first web app of **guided walking journeys**. Each journey is a hand-picked route of about five stops through a town. At every stop the app gives directions on a map, then tells part of a story about the place, read aloud. The stories connect from stop to stop into one narrative. It started in Japan (Odawara and Kawagoe) and now has journeys in Japan, Minnesota, Wisconsin, Florida and the Bahamas.

- **Who's involved:** the developer (the person sharing this) builds it with Claude Code. Their dad lives in Minnesota and is a co-decider: he gives design feedback, sends feature requests and writes handoff docs. Their brother Bryce handles the database work, which hasn't started in the app yet.
- **Stage:** a testing prototype. There are no accounts and no backend. A real-world test walk with the dad is planned for **around the end of November 2026**.
- **Live:** https://kaialexdoug.github.io/globe-focused-journey-prototype/ (the app) and `/studio/` on the end of that (Unfold Studio).

---

## 2. Tech and repo

| | |
| --- | --- |
| Repo | `kaialexdoug/globe-focused-journey-prototype` |
| Working branch | `unfold-redesign`, merged into `main` via PRs. `main` is what's live; the latest merge is PR #19, on 20 Nov 2026 |
| Main app | `main-app/`: React 19 + Vite 8, plain CSS (`App.css`, `index.css`), ESLint flat config. Vite base path `/globe-focused-journey-prototype/` |
| Studio | `studio/`: a separate React + Vite app for making journeys (see §9) |
| Deploy | GitHub Pages builds both apps on every push to `main` (`.github/workflows/deploy.yml`) |
| PWA | Installable, with `public/manifest.webmanifest` and a service worker in `public/sw.js`. Bump `CACHE_VERSION` in `sw.js` to force phones to drop old files |
| Run locally | `cd main-app && npm install && npm run dev`, then open `http://localhost:5173/globe-focused-journey-prototype/` |
| Checks | `npm run lint` and `npm run build`. There are no automated tests in the main app |
| Settings | `main-app/src/config.js`: app name, tagline, logo, Google Maps key, live map's Map ID, survey URL |

**External services (all free tiers):**
- **Google Maps.** The Embed API powers the simple map, the Maps JavaScript API the live map and route map, and the Routes API the route lines. Keys and quotas are in a checklist in the README.
- **Open-Meteo** for weather. It needs no key but must be credited ("Weather from Open-Meteo.com" is shown).
- **A Google Apps Script web app** that writes survey answers to a Google Sheet (`main-app/google-apps-script/survey.gs`).

**Storage:** everything is kept on the phone in `localStorage` (`profileStore.js`). Nothing leaves the device except the survey.

**Look (since 23 Nov 2026):** Inter for all text (`--sans`), Times New Roman only for journey titles (`--serif`: the feed, and the top of the new journey page; since 25 Nov 2026, replacing Literata, with Tinos bundled as a look-alike for phones without Times New Roman, such as Android), Montserrat only for UNFOLD beside the logo. Normal capitalisation everywhere (Title Case for buttons and headings, sentence case for small labels); the only capitals are the logo and the feed's location bubble. Every main button looks exactly like the feed's Unfold This Journey (one shared rule at the top of `App.css`): orange with a very subtle top-to-bottom gradient (`--button-fill` in `index.css`), no border, a faint light along the top edge, white words and a white arrow.

**Code style:** comments throughout are in plain, everyday English, explaining what each piece is for and why. Keep that style. UI text uses curly apostrophes (’).

---

## 3. How a journey is built (the data model)

Every journey is a hand-written JS object, one per file.
- `main-app/src/journeyStops.js` holds the two verified journeys and builds `ALL_JOURNEYS`.
- `main-app/src/aiJourneys/*.js` holds 56 AI-made journeys, listed in `aiJourneys/index.js`.
- `testJourney.js` (Waseda), `miamiJourney.js` and `nassauJourney.js` hold the other three.
- `aiJourneys/parts.js` has the shared headings and labels for each part's screens.

**Every journey has the same five parts, in order:** Departure → Discovery → Build → Peak → Afterglow, then a Memory page and the survey. The Build stop can offer optional **detours**.

**A journey card** has these fields:
- Identity: `id`, `name`, `location` (`'AREA · REGION, COUNTRY'`, e.g. `'WASEDA · TOKYO, JAPAN'`), `city` (the municipality, or `null` for e.g. a state park), and either `aiMade: true` or `verified: true`.
- Display: `photo`, `photoAlt`, `blurb`, `walking`, `stops`, `difficulty` (Easy, Moderate or Active), and `experiences` (the main one first, from Historical, Cultural, Culinary, Scenic, Nature, Adventure, Hidden Gems and Interactive).
- The stops: `departure`, `discovery`, `build`, `peak`, `afterglow`.
- Start: `startArea`, `startNote`.
- See Your Journey extras: `bestTime` (`{ season, seasonNote, timeOfDay, timeNote }`) and `beforeYouGo` (`{ checked, bring, costs, getting, access, restrictions, tips }`).
- Matching: `match` (scores out of 100 per mood, companion and preference, used by Find My Journey).
- Memory page: `story` or `wrapUp`.
- `journey.route` (the stops in order) and `journey.time` (e.g. "~3 hours") are worked out at load time from the stops' times.

**A stop card** has these fields:
- Basics: `id`, `name`, `photo`, `photoAlt`, optional `photoPosition`, and `memory` (its line on the Memory timeline).
- Map: `mapPlace` (a search string) and `mapPoint` (`{ lat, lng }`, its exact spot), plus optional `mapName`, a short name for maps.
- Getting there: `travelMode` (`walking`, `transit`, `driving` or `bicycling`), `distanceMeters`, `travelMinutes`, `stayMinutes` (`[shortest, longest]`), and `effort` (`{ level, note }`).
- Screen headings: `directionsHeading`, `directionsLabel`, `arrivedHeading`, `arrivedLabel`.
- `narration`: an array of paragraphs.
  - A plain paragraph is `{ text }`. Add `className: 'narrationLead'` for the big opening line or `'narrationClose'` for the italic last line.
  - `{ kind: 'heading', text }` is a subheading.
  - `{ kind: 'find', text }` is a "CAN YOU FIND IT?" box.
- Optional `nearby` spots: each has a name, distance and description, and optionally a photo and `mapPoint`.
- Optional `detours` (on the Build stop): each is a stop card of its own, with `extraMeters`.
- Optional `detoursNote`.

All times and distances are estimates, worked out once from Google walking routes and elevation data in November 2026.

---

## 4. The journeys (61 in total)

**UNFOLD VERIFIED (walked by the developer):**
- *Where the Old Road Meets the Sea*, Odawara, Kanagawa.
- *Adventure in Kawagoe*, Kawagoe, Saitama.

**AI GENERATED (28).** The history in each was checked against published sources, but none has been walked.

| Region | Journeys |
| --- | --- |
| Tokyo area / Kanto (10) | Kamakura *Bamboo, Bronze and the Bay*, Hakone *Up the Mountain, Down to the Lake*, Yokohama *Where the Harbor Lights Come On*, Yanaka *The Tokyo That Stayed*, Mt Takao *A Mountain on the Edge of Tokyo*, Nikko *The Shrines in the Cedars*, Narita *The Temple Town Before Your Flight*, Chichibu *Into the Chichibu Hills*, Kusatsu *The Town That Steams*, Fujiyoshida *In the Shadow of Fuji* |
| Minnesota (10) | Duluth *At the Edge of the Big Lake*, North Shore *Up the North Shore*, Minneapolis *Where the City Began*, St. Paul *Up on Summit Avenue*, Stillwater *Down by the St. Croix*, Minnehaha *The Falls in the City*, Red Wing *The River Town Under the Bluff*, Taylors Falls *Cliffs Over the St. Croix*, Itasca *Where the Mississippi Begins*, Grand Marais *The Harbor at the Edge of the Woods* |
| Cumberland, Wisconsin (4, the newest) | *The Island City’s Main Street* (History), *A Church a Mile South* (Culture), *Water on Every Side* (Scenic), *Where the Hay River Begins* (Nature) |
| Journey Engine V2 (28) | *The Carriage Road at Dusk* (Marunouchi, Tokyo): Romantic, for a couple, the V2 gold standard. Then the Minnesota group: *Seven Bridges to the Ridge* (Duluth, Romantic, a drive), *Through the Peak, Over the Rapids* (Duluth, Adventurous, a hike and a drive) and *Where Bob Dylan Began* (Duluth, Curious, a walk), all for couples, and *From Purgatory to the Clouds* (Eden Prairie, Playful, for a family, by car). Then the Japan group, outside Tokyo: *The Valley That Listens* (Ōhara, Kyoto, Peaceful, solo), *Follow the Deer to the Great Buddha* (Nara, Playful, family), *Sea to Summit on the Sacred Island* (Miyajima, Adventurous, friends) and *The City That Spent Its Gold on Beauty* (Kanazawa, Cultural, couple). Then the Bahamas group: *Follow the Water* (Lucayan National Park, Grand Bahama, Curious, friends), *The Pink Shore and the Sunset Side* (Harbour Island, Romantic, couple) and *Castaways for a Day* (Castaway Cay, Playful, family, built around the all-aboard time). Then Broward County: *The River That Made Fort Lauderdale* (Curious, couple), *A Wedding Gift by the Sea* (Hugh Taylor Birch State Park and Bonnet House, Peaceful, solo), *The Beach They Waded For* (the 1961 wade-ins and Dr. Von D. Mizell-Eula Johnson State Park, Cultural, friends), *In the Barefoot Mailman’s Footsteps* (Pompano Beach to Hillsboro Inlet, Adventurous, couple) and *Broadwalk to the Treetops* (Hollywood and the Anne Kolb Nature Center, Playful, family); five more Broward candidates were turned down as filler or duplicates (see the log). Then the 11 flagships: *The Lagoon at Sundown* (Bora Bora, Romantic, couple), *Barefoot to the Mount* (Mont-Saint-Michel, Adventurous, family), *Up the Hill to Vespers* (Florence, Cultural, couple), *The Blue Town at Dusk* (Chefchaouen, Peaceful, couple), *The Secrets of 42nd Street* (New York, Curious, friends), *Hold On Tight!* (San Francisco, Playful, family), *Seals, Sea Lions and a Sea Cave* (La Jolla, San Diego, Playful, couple), *Tea Above the Lake* (Lake Louise, Banff, Adventurous, friends), *The River at Dusk* (Varanasi, Cultural, solo), *The Monk’s Trail* (Chiang Mai, Peaceful, solo) and *The Garden, the Lodge and the Painted Hill* (Cape Town, Curious, family). Stops with no licensed photo yet show a "No image available" placeholder (`assets/journey/no-image.svg`), as the developer asked. Made to the V2 handoff: peak chosen first, every fact checked against official or published sources, Google Routes legs, and licensed photos through Unfold's mood treatment. Their records (peak, sources, uncertainties, self-check, rejected candidates) are in `JOURNEY_ENGINE_LOG.md`. |
| Miami, for families (4, the newest, 28 Nov 2026) | *The Island the Zoo Left Behind* (Key Biscayne, Playful), *The Free Train to the Gulf Stream* (downtown, Curious), *Follow the Roosters Down Calle Ocho* (Little Havana, Cultural) and *Across the River of Grass* (the Miccosukee airboats and Shark Valley, Adventurous). Made in the V2 format at the developer's request: photo spots and a restaurant at every journey, a parking tip in each Before You Go, and drones explained (no stop allows them). Records in `JOURNEY_ENGINE_LOG.md` (29 to 32). |
| Other | *The Edge of Old Edo* (Takadanobaba–Waseda, Tokyo, the **pilot journey** where new features are tried first), *From Mangroves to Neon* (Miami Beach), *Forward, Upward, Onward* (Nassau, Bahamas) |

- Every journey has `bestTime`, `beforeYouGo`, an exact `mapPoint` on every stop, and the walk data the route preview needs.
- Every journey except the four Cumberland ones and The Carriage Road at Dusk has at least one detour (the V2 handoff doesn't ask for one).
- Photos are mostly from Wikimedia Commons, credited in the README.

---

## 5. Navigation

There's a bottom **navbar with four tabs**: **Home (Feed)**, **Find My Journey**, **My Journeys** and **Profile**.
- Leaving a journey with the navbar doesn't end it. It waits, with an orange dot on My Journeys, until it's resumed.
- A journey only ends with ✕ (which asks for confirmation) or by starting a different one (which asks whether to end the current one).
- `App.jsx` holds the page state machine (`page` state, `JOURNEY_PAGES`, `NAVBAR_TAB_OF`).

---

## 6. Every screen and feature

### Home (Feed)
- A full-screen, vertically swiping feed: one journey per screen, with its photo filling it.
- Redesigned after a mockup (23 Nov 2026). The logo and search stay at the top over the photo. Lower down, the photo fades into the page colour (white, or the dark in dark mode) and ends there, behind the title. On the page:
  - the town and country in capitals ("KAWAGOE, JAPAN") with an orange pin, then after a dot how far away the journey is ("5,832 mi away", number in bold). The AI Generated and Unfold Verified tags are hidden for now (23 Nov 2026); each journey still has `aiMade` or `verified`;
  - the journey name in the serif (Times New Roman), with a round **save (bookmark) button** beside it;
  - the blurb;
  - **three facts** with soft orange symbols, split by faint lines: time, difficulty, and the main experience with its own symbol;
  - the orange **Unfold This Journey** button.
- "Liked" was renamed to "Saved"; old likes carry over.
- **Distance from you** (25 Nov 2026, `distance.js`, `DistanceAway.jsx`): straight-line distance from the phone to the journey's first stop, in the chosen units. Your location is looked up again each time a page with journeys opens (one lookup per page), worked out on the phone, and never sent anywhere. Shown on the feed and as a small label in the top-left corner of the photo cards (Journeys for You, Search, My Journeys' saved and completed cards). Hidden if location is off or not allowed.
- The feed remembers where you were.
- A **magnifying glass opens Search**. It matches the journey name, the place, or the name of any stop or detour, as you type. It ignores accents and punctuation and matches word prefixes. A journey found by a stop says which stop matched.

### Find My Journey (based on the mockups, with origami-style art)
- **Intro screen**, then three steps, each with Back and Skip.
  1. **Mood:** Peaceful, Adventurous, Romantic, Curious, Playful or Cultural. Each has an origami picture.
  2. **Who's coming:** Solo, Couple, Family or Friends / Group.
  3. **Make it yours:**
     - Where to? A place field that suggests places with journeys.
     - When? A calendar pop-up, with "Now" as the default. It doesn't affect matching yet.
     - Time: 1–2, 2–4 or 4+ hrs.
     - Pace: Easy, Moderate or Active.
     - An optional **Anything else?** page: Pet friendly, Avoid alcohol, More nature, Food stops, Coastal, More urban, Hiking involved, Budget friendly.
- **Journeys for You:** every journey in the chosen place, ranked by match %.
  - The scoring in `journeyMatch.js` is deterministic: a weighted average of mood, who, time fit, pace fit and preferences.
  - Skipped answers are left out.
  - Location filters which journeys are shown but isn't scored. It needs to be eventually.

### See Your Journey (a journey's page, `JourneyPage.jsx`)
- Redesigned after a mockup (25 Nov 2026), piloted on Waseda, then rolled out to every journey the same day. The old single-scroll page with folding bars is gone.
- The photo across the top: **back** (top left, a plain chevron; it replaced the ✕ here, though the ✕ stays during a journey to end it), the logo, and **save** (top right, filled once saved). The name in Times New Roman on the photo's shaded bottom edge, with the place under it.
- Three tabs, **Overview, Route, Details**, with a sliding orange bar under the current one. The photo and tabs stay put; the tab's content scrolls.
  - **Overview:** four facts (time, difficulty, stops, main experience; `JourneyFacts.jsx`, shared with the feed), then **Why It's Cool** straight on the page (an orange sparkle and the description), then a white panel of **The Discovery** (binoculars), **The Significance** (stacked layers) and **The Feeling** (heart). These come from each journey's `whyCool` (`{ discovery, significance, feeling }`, a sentence each), written from each journey's own story. Minneapolis uses the mockup's own wording. Then an **Expectations** panel (27 Nov 2026, after the mockup): a compass, the heading, and an orange pill with the journey's kind of experience: **Simple Escape** (leaf), **Local Discovery** (magnifying glass), **Rich Experience** (castle) or **Standout Journey** (star), with one sentence on what to expect (`experienceLevels.js`), over mountains at sunset (at night in dark mode). It sets expectations so a simple walk isn't mistaken for a Kyoto.
  - **Route** (`RoutePreview.jsx`): every stop as a card with a small photo and its suggested stay time; between cards, the distance, how you get there, the minutes and the effort; detours inside the card of the stop they branch from; totals for walking (and riding) and the whole journey; then the **route map** (`RouteMap.jsx`): a Google map with photo pins and numbers, solid lines between stops and dotted lines to detours. The map only loads once the tab is opened and scrolled near, stays loaded after that, and caches the route lines for the session.
  - **Details:** **Weather & Best Time to Go** (`BestTime.jsx`): today's weather at the start, the best season and the best time of day, each in a card. Then **Before You Go** (`BeforeYouGo.jsx`, from the dad's handoff): up to six expandable cards (What to bring, Tickets and costs, Parking and transportation, Accessibility, Important restrictions, Local insider tips) and a "last checked" note.
- At the end of every tab: **BEGIN JOURNEY**, or **RESUME JOURNEY** if it's under way. If it's been finished before, there's a tick and VIEW MEMORY.
- Without a profile, BEGIN first asks: save progress to a new profile (just a name), or start without saving.
- On iPhone, BEGIN also asks for **compass permission** (`compass.js`).
- A journey missing any of this still works: without `whyCool` it shows just the description, without the walk to every stop the Route tab shows where to start, and Details leaves out what it doesn't have.

### Get Ready (`GetReadyPage.jsx`), between BEGIN and the first stop
- Weather at the start point, shown with `WeatherReport.jsx`:
  - the temperature now with an icon, plus sunrise and sunset;
  - a sideways strip of the **next 24 hours** (icon, temperature and hour for each);
  - a note if the place's time zone differs from the phone's;
  - a **forecast summary** (since 26 Nov 2026, `forecastSummary` in `weather.js`). It describes the weather for as long as the journey takes and doesn't judge it, since a cold or snowy walk can be exactly what someone wants (the dad's and the developer's call; it replaced a Good / Mostly good / Risky / Poor verdict). It's one box after the mockup: an icon on the left, a title ("Cold conditions today") and a line saying more ("Feels like 14°F for most of your walk."). It's about the first of these found during the walk: thunderstorms, snow, freezing rain, rain (forecast, or a 60%+ chance), drizzle, hot (feels like 31°C / 88°F or more), cold (feels like 3°C / 37°F or less), windy (gusts of 50 km/h / 31 mph or more), fog. A second kind from another family can be added ("…and it'll feel like 25°F"). Otherwise it describes the sky: clear, clear night, partly cloudy (day or night) or cloudy, with the temperature range, plus anything expected later the same day ("Rain is likely later, from 6 PM."). Icons and colours, as chosen: thunderstorm (cloud and bolt), rain, drizzle in blue; snow, freezing rain, cold (thermometer and snowflake) in light blue; hot (thermometer and sun) in red-orange; windy, fog, cloudy in gray; clear, clear night and partly cloudy in the app's usual orange on gray (`SUMMARY_LOOKS` in `WeatherReport.jsx`, `--wx-*` colours in `index.css`).
- Then the journey's length and effort.
- **I'M HERE** (already at the start) or **GET DIRECTIONS** (directions to the Departure stop).

### Each stop: two screens (`StopPages.jsx`)
Every stop uses the same two screens, filled in from its card.

**1. Directions screen** (`DirectionsPage`)
- A photo header with ✕, then the part and step ("Discovery · Step 2 of 5") and the stop name.
- **SEE CURRENT WEATHER FORECAST** (the newest feature, `StopWeather.jsx`).
  - A small, quiet pill button above the map that drops down.
  - It shows a compact version of Get Ready's weather for that stop's exact spot: the temperature and icon, sunrise and sunset, the 24-hour strip, and the forecast summary for **the rest of the journey from this stop on** ("for the rest of your walk").
  - It's only looked up when opened, and cached for 10 minutes. It has a "Try Again" state if the lookup fails.
  - It's on **every stop of every journey**, detours included.
- **The live map** (`LiveMap.jsx`):
  - Google's interactive map with the stop's photo pin and the route from where you are.
  - A **blue dot that follows you**, with a **compass beam showing which way you're facing**.
  - It falls back to the simpler embedded map if it can't load or can't route.
- **Open in Google Maps** for turn-by-turn directions.
- **I'M HERE.**
- On a detour, **SKIP THIS DETOUR**, which offers another detour or carrying on with the journey.

**2. Arrived screen** (`ArrivedPage`)
- **The narration** (`Narration.jsx`).
  - It's read aloud with the browser's own voice (Web Speech), with **each word lit up as it's spoken**.
  - Play and pause resume from the same word. Each paragraph is spoken on its own, to work around browser bugs.
  - It's arranged as short sections under subheadings, with a **CAN YOU FIND IT?** box at each stop.
- **The suggested time to spend here** (a gentle guide, not a timer).
- **Nearby spots** (`nearby`), on the stops that have them. The four Cumberland journeys have none.
  - Each is a card with a photo, the distance and a description. Since 28 Nov 2026 a spot can have a `kind` (`photo`, `food` or `culture`), shown as a small tag on its photo: Photo spot, Food & drink, or Museums & culture (the V2 update's three groups).
  - SEE DIRECTIONS opens a live map inline, and there's Open in Google Maps.
  - A spot without a photo and an exact spot would show as a simple list item instead.
- On the Build stop, **the detour offer** with "Adds about 45 min", then CONTINUE.
- The last stop says FINISH JOURNEY.

**The Detours page:** each detour shows a photo, what it is, the time it adds and TAKE THIS DETOUR. Detours already taken are greyed out.

**Progress** is saved at every step, so a journey can be resumed after closing the app.

### Memory page (`MemoryPage.jsx`), at the end
- "You made it." Then the day as a short story, with a line that changes depending on which detours you took.
- Then a **timeline** of every stop, with detours branching off. Skipped detours are greyed out.
- Offers the survey and, without a profile, offers to make one.
- It can be revisited later from My Journeys or See Your Journey.

### Survey (`SurveyPage.jsx`)
- Name (skipped when there's a profile), then three questions, one at a time:
  1. What stood out most to you today?
  2. Would you want to do another journey like this? (Yes, Maybe or No)
  3. If this journey had cost $5 (¥500), would you have bought it instead of planning the day yourself? Why or why not?
- FINISH SURVEY sends the answers, plus which detours were taken, to the Google Sheet.

### My Journeys
- A large photo header (Fuji), as on the mockup.
- **Current journey card**, with "Heading to X" or "You’re at X" and how many stops are done. Tap it to resume.
- **Saved** journeys in a swipeable row of large cards, with SEE ALL opening a grid. Unsaving a journey removes it from the row and the grid.
- **Completed** journeys at the bottom: the latest one as a small card, with SEE ALL opening a grid.
- Without a profile, a "save this to a profile" card replaces the completed section.

### Profile
- Name, and Edit Profile, where you can rename or delete the profile.
- **Your Journey Stats:** journeys completed, stops visited (with detours), cities visited (from `city`) and countries.
- **My Interests:** Outdoors, Local culture, Photography, Food, Cycling, Trains, Fishing.
- **My Preferences:** Dietary, Accessibility, Travel pace, History.
- **Account & Plan:** a placeholder that can't be opened yet.
- **Settings** (the cog):
  - **Units**, metric or imperial, used for every distance and temperature (`units.js`, `UnitsContext`).
  - **Appearance**, light or dark. It shows as soon as it's tapped, and is kept on the device, with or without a profile (`theme.js`, key `unfold.theme`). Every colour is a token in `index.css` with a dark value under `:root[data-theme='dark']`. The illustrations on white get a night filter, and the Google maps go dark too.
  - **Version**, the build time, to check whether a phone has the latest version.
  - Changes ask "Save your changes?" before leaving.
- A **profile is only a name** stored on the device. There's no account or password.

---

## 7. Feature history (roughly in order)

1. **The original prototype:** a quiz (7 questions), See Journey, the departure phase, narration, the survey linked to Google Sheets, experimental profile features, light/dark mode, the origami logo, the PWA set-up and iPhone status-bar fixes.
2. **Maps:** embedded Google Maps, then the Open in Google Maps button, then the live map with the Routes API.
3. **More journeys:** 20 "dummy" AI journeys in Kanto and Minnesota, later fleshed out with checked history and real photos.
4. **The redesign** (`unfold-redesign`, following AI-generated mockups):
   - the four-tab navbar and the full-screen swipe feed;
   - Find My Journey (mood, companion, details, preferences, matches);
   - redesigned My Journeys and Profile;
   - a compass direction beam on the live map;
   - nearby spots as cards with directions (first on Waseda, Miami and Nassau, then on every journey with nearby spots).
5. **The dad's feedback** after walking an AI journey (meeting on 2026-11-07). These were piloted on Waseda, then rolled out:
   - the **route preview** before starting (stops, distances, time, effort, map);
   - **longer narration that tells one connected story**, with subheadings and Can You Find It? boxes;
   - **discoveries along the way** (nearby spots and detours, with the time they add).
6. **Weather:** Get Ready, Weather & Best Time to Go, and Units in Settings. "Like" was renamed "Saved".
7. **Before You Go** (from the dad's handoff), on every journey.
8. **The Cumberland test** (newest):
   - The dad's handoff asked whether AI could build honest journeys for a small town: Cumberland, Wisconsin, "the Island City".
   - Only **4 of the 8 possible categories** were viable: History, Culture, Scenic and Nature. The rest were marked Not Viable rather than padded out.
   - A written report is in a Claude Doc: *Cumberland AI Journey Test*, https://claude.ai/artifact/E2pHDxUhTm7STNUGnuEXUZ
   - Five hero and stop photos were swapped for ones the developer found by web search (church, cemetery, library, autumn pond, lake sunset). Their licences aren't confirmed yet; they're listed in the README.
9. **The stop weather forecast button** on every directions screen (tried on Waseda first, then rolled out to all journeys).
10. **The new tabbed journey page** (25 Nov 2026), after a mockup, piloted on Waseda and then rolled out to all 29 journeys: back and save on the photo, Overview / Route / Details tabs, and Why It's Cool. Journey titles switched to Times New Roman.
11. **Journey Engine V2** (26 Nov 2026), from the developer's V2 handoff (33 test journeys across Broward County, Duluth, Tokyo, Japan, 11 flagship destinations, the Bahamas, Castaway Cay and Eden Prairie). Started with one gold-standard journey, *The Carriage Road at Dusk*, then the rest group by group: Minnesota done (three Duluth journeys for couples and one Eden Prairie family day), Japan done (Ōhara, Nara, Miyajima, Kanazawa), the Bahamas and Castaway Cay done (Grand Bahama, Harbour Island, Castaway Cay), Broward County done (five journeys, five candidates rejected), and the 11 flagships done (Bora Bora, Mont-Saint-Michel, Florence, Chefchaouen, New York, San Francisco, La Jolla, Banff, Varanasi, Chiang Mai, Cape Town). All groups are made: 28 journeys, with 5 of the 33 test slots rejected. Built with it: the photo treatment pipeline (`main-app/photo-originals/`, `npm run photos`): untouched originals, a base look plus six mood recipes (starting values, to be approved), a manifest of every photo's source, licence, treatment and automatic quality check, and treated copies for the app. The developer approved Google Routes API use and photo downloads for this. The evaluation report (27 Nov 2026) is a Claude Doc, *Journey Engine V2 Evaluation Report*: https://claude.ai/artifact/CXo7TVTup9nKmHfqRgrQpr. It finds 28 of 33 made and 5 rejected, self-check scores 82 to 92, and three gaps before release: no independent review, nearby discoveries researched for only 1 journey, and no generator in code yet.

---

## 8. Open items and decisions on hold

- **Before the end-of-November test walk:** nothing is required to be built, but the Cumberland photos are still under review with the dad. The developer felt several of the town's images were weak, and some journeys used historic maps as images.
- **An unfinished request:** the developer's last photo-swap message was cut off at "for the…", so one more photo change may be wanted.
- **Unused files:** `cumberland/library.jpg` and `cumberland/rectory-and-church.jpg` are no longer used and could be deleted (ask first).
- **Possible clean-up:** the Scenic and Nature Cumberland journeys repeat some facts.
- **Activity recap on the Memory page** (real time taken, distance walked) is **on hold**. The agreed approach, for when it comes back:
  - timestamps at BEGIN, at each I'M HERE and at FINISH, counting only gaps under about 3 hours;
  - distance from the leg data plus the detours taken;
  - no step count.
- **Why It's Cool lines** (`whyCool`) were written by Claude from each journey's description and narration; worth a read-through. Unfold Studio can't edit them yet, so a journey made there shows just its description in the panel.
- **Experience levels are a first pass** (27 Nov 2026), by Claude, judged on how exceptional each place and its highlight are: 12 Standout Journeys (Banff, Bora Bora, Mont-Saint-Michel, Florence, Chefchaouen, Varanasi, Miyajima, Nara, Nikko, Kanazawa, Fujiyoshida, Hakone), 21 Rich Experiences, 21 Local Discoveries and 7 Simple Escapes (counting the four Miami family journeys added on 28 Nov 2026) (Hollywood Beach, Minnehaha Falls, Seven Bridges to the Ridge, Grand Marais, and Chichibu and two of the Cumberland walks). Each is one line, `experienceLevel`, in the journey's file; worth the developer's review. A journey without one (from Unfold Studio, say) shows Rich Experience.
- **Location isn't scored** in Find My Journey matching yet. It has to be eventually.
- **"When are you going?"** doesn't affect matching yet. It could drive the weather.
- **Later:** a premium AI guide (costs tokens), a better narration voice (may cost money), bookable experiences, and pricing (free or $5). The survey asks about the $5. Maybe also **My Atlas** (where you've been, a map of the journeys you've covered, and other profiles' atlases).
- **Scrapped** (27 Nov 2026): journeys for Rice Lake, Wisconsin, and redoing Cumberland as one journey per group (solo, couple, family, friends). The four Cumberland journeys by theme stay.
- **Before any public launch:**
  - clear the photo licences (web-found photos are fine for testing);
  - show the Commons credits in the app;
  - lock the Maps key to the site and cap the quotas;
  - get a proper Map ID for the live map.
- **Some file-header comments are out of date.** For example, `testJourney.js` says AI journeys lack exact spots, and `RouteMap.jsx` says only Waseda has the route map. Every journey has exact spots now.

---

## 9. Unfold Studio (`studio/`)

A separate desktop app for the team (the dad first) to make and edit journeys without touching code. It's at **Phase 1A: manual editing only, early stage**.

**What works:**
- **Journey Library** with search, including stop names (it shares `journeySearch.js` with the app).
- **Create new journey**, rename it, and delete it.
- A three-pane editor:
  - Journey Steps: add, select and delete steps;
  - Step Editor: step type and title;
  - live phone preview: still empty.
- Save, with a "last saved" time, and unsaved-changes guards.

**Limits:**
- New journeys are only kept in the browser's `localStorage` for now. `journeyStore.js` is the single file that will change when the database (Bryce) arrives.
- The app's three journeys shown in the Studio are read-only.
- The Studio's screens say "step" where the code says "stop".

**From its handoff doc** (`Unfold_Studio_Claude_Code_Handoff.docx`, v1.0, 2026-11-03):
- Plan first, and don't code until the plan is approved.
- Real persistence, not localStorage.
- Automated tests.
- Drafts, then published revisions.
- Validation that sorts problems into blockers, warnings and info.
- AI generation later (Phase 1B).

---

## 10. Working rules the developer has set (please follow)

1. **The developer commits and pushes themselves.** Never commit or push. When work is done, give the git commands as separate code blocks: `git add -A`, `git commit -m "..."`, `git push`.
2. **Ask for approval before** any paid API use or destructive database change.
3. **When told "just read" or "don't do anything",** only read.
4. **Narration is one connected story:**
   - pick a thread (the theme and recurring people and places) and use callbacks between stops;
   - build toward the journey's name and pay it off at the end;
   - two short sections under subheadings per stop, plus a Can You Find It?;
   - keep it short;
   - check the history against real sources first;
   - no isolated fact lists and no robotic turn-by-turn text.
5. **Every journey needs** its city or municipality (`city`), its state or prefecture and its country (`location`). Look the municipality up rather than guessing.
6. **The redesign follows the mockups' look first.** Handoff features that aren't in the mockups come later. When a mockup and a handoff conflict on something new, ask.
   - Four tabs.
   - Origami-style mood and companion art.
   - Keep the current origami logo.
7. **Pilot new journey features on Waseda (`wasedaTest`) first.** The developer checks it, then asks for a rollout to all journeys.
8. **Point out** missing assets or conflicting references instead of guessing.
9. **Estimate first** (times, routes) and let the developer or their dad correct it. The developer can check the Japan journeys in person; the dad checks the Minnesota ones.
10. **Photo licences** only matter before a public launch. Keep noting unconfirmed sources, but don't block on them.
11. **The developer welcomes questions** when something is unclear.
