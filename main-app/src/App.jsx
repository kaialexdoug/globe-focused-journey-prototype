import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import findPicture from './assets/find-my-journey.jpg'

import Header, { AiBadge, VerifiedBadge } from './Header.jsx'
import StopConfirmation from './StopConfirmation.jsx'
import SkipDetourPrompt from './SkipDetourPrompt.jsx'
import { DirectionsPage, ArrivedPage, DetoursPage } from './StopPages.jsx'
import { CompanionPage, DetailsPage, MatchesPage, MoodPage, PreferencesPage } from './FindMyJourney.jsx'
import MemoryPage from './MemoryPage.jsx'
import SurveyPage from './SurveyPage.jsx'
import SearchPage from './SearchPage.jsx'
import PhotoScreen from './PhotoScreen.jsx'
import RoutePreview from './RoutePreview.jsx'
import { hasRoutePreview } from './journeyTimes.js'
import { askForCompass } from './compass.js'
import {
  NavBar,
  MyJourneysPage,
  CompletedJourneysPage,
  LikedJourneysPage,
  ProfilePage,
  InterestsPage,
  TravelPreferencesPage,
  SettingsPage,
  SaveProgressPrompt,
  ExitCurrentPrompt,
} from './ProfilePages.jsx'
import {
  ArrowRightIcon,
  ClockIcon,
  HeartIcon,
  PinIcon,
  RouteIcon,
  SearchIcon,
  SolidPinIcon,
  SolidWalkIcon,
  WalkIcon,
} from './Icons.jsx'
import { EXPERIENCE_ICONS } from './experienceIcons.js'
import { ALL_JOURNEYS, placeName } from './journeyStops'
import {
  loadProfile,
  storeProfile,
  loadProgress,
  storeProgress,
  loadLikes,
  storeLikes,
  newProfile,
  withJourneyStarted,
  withJourneyCompleted,
} from './profileStore'
import { preloadImages } from './preloadImages.js'
import { useShrinkToFit } from './shrinkToFit.js'
import './App.css'

// Find My Journey's picture, fetched as soon as the app's open, so it's there
// the moment you tap Find.
preloadImages([findPicture])

// The prototype follows the flow chart:
//   your journey → Departure → Discovery → Build, with optional detours
//   from there → Peak → Afterglow → Memory, looking back on the day
//   → the survey.
// Which stop each part is comes from the journey's card in journeyStops.js
// (Odawara: the station, Kamaboko-dori, the Local Culture Museum with the
// NINJA Museum as a detour, the castle, Miyuki-no-Hama).
// Home is a feed of every journey, the shortcut straight to any of them.
// Find My Journey is the other way in: its intro, three steps of questions, then
// Journeys for You, every journey from the best match for your answers to the
// worst.
// Every page has a navbar along the bottom, for moving between Home, Find My
// Journey, My Journeys and Profile. On a journey, it leaves the journey where
// it is, to pick up again with RESUME (on the journey's page, or its card on
// My Journeys). A journey only ends with ✕, or by beginning another one.

// The pages of the journey itself, and which part of the journey each one is
// about (a detour's pages are about whichever detour you're on). Used to
// keep where you are, and to say where you left off.
const JOURNEY_PAGES = {
  departure: 'departure',
  departureInfo: 'departure',
  discovery: 'discovery',
  discoveryInfo: 'discovery',
  build: 'build',
  buildInfo: 'build',
  detours: 'build',
  detour: null,
  detourInfo: null,
  peak: 'peak',
  peakInfo: 'peak',
  afterglow: 'afterglow',
  afterglowInfo: 'afterglow',
}

// The navbar's tabs.
const NAVBAR_TABS = ['home', 'find', 'myJourneys', 'profile']

// The pages that come under one of its tabs, so that tab is lit on them too.
const NAVBAR_TAB_OF = {
  findMood: 'find',
  findWho: 'find',
  findDetails: 'find',
  findPreferences: 'find',
  findMatches: 'find',
  search: 'home',
  completedJourneys: 'myJourneys',
  likedJourneys: 'myJourneys',
  profileInterests: 'profile',
  profilePreferences: 'profile',
  settings: 'profile',
}

// Which tab is lit on a page, or null for none (a journey under way, and the
// survey).
function navbarTabOf(page) {
  return NAVBAR_TABS.includes(page) ? page : (NAVBAR_TAB_OF[page] ?? null)
}

// What Find My Journey's answers start as: nothing yet, except that its details
// step starts with a time and a pace already picked, as on the mockup. `place`
// is what's typed in Where to?, and `date` the day you're going ("2026-11-14"),
// or null for now.
const NEW_FIND_ANSWERS = {
  mood: null,
  companion: null,
  place: '',
  date: null,
  time: '2–4 hrs',
  pace: 'Moderate',
  preferences: [],
}

// Every journey's detours.
const ALL_DETOURS = ALL_JOURNEYS.flatMap((journey) => journey.route.flatMap((stop) => stop.detours ?? []))

function journeyWithId(id) {
  return ALL_JOURNEYS.find((journey) => journey.id === id) ?? null
}

// Where a saved journey was left off, in words, and how many of its stops are
// done (detours aren't counted, as they're not on every run).
function whereLeftOff(progress) {
  const journey = journeyWithId(progress.journeyId)
  const part = JOURNEY_PAGES[progress.page]
  const partStop = part ? journey[part] : null
  const detour = ALL_DETOURS.find((each) => each.id === progress.detourId)
  const stop = partStop ?? detour ?? journey.build
  const arrived = progress.page.endsWith('Info') || progress.page === 'detours'
  const along = journey.route.indexOf(partStop ?? journey.build)
  return {
    text: `${arrived ? 'You’re at' : 'Heading to'} ${stop.name}`,
    // A stop you've arrived at counts as done. On a detour, that's the build
    // stop it branches off from.
    stopsDone: along + (arrived || !partStop ? 1 : 0),
    stopCount: journey.route.length,
  }
}

function App() {
  // Which screen is showing: "home", "myJourneys", "profile", "find",
  // "findMood", "findWho", "findDetails", "findPreferences", "findMatches",
  // "profileInterests", "profilePreferences", "settings", "completedJourneys",
  // "likedJourneys", "search", "seeJourney", any of the JOURNEY_PAGES above,
  // "memory" or "survey".
  const [page, setPage] = useState('home')

  // What you've told Find My Journey so far, by the names on its cards: the
  // ones `match` on a journey's card uses, for matching journeys to them later.
  const [findAnswers, setFindAnswers] = useState(NEW_FIND_ANSWERS)

  // Which journey Home's feed was on, kept here because the feed itself is
  // gone whenever you're on another screen. And how far down Journeys for You
  // you were, the same way.
  const feedPositionRef = useRef(0)
  const matchesPositionRef = useRef(0)

  // What's typed on Search, and how far down its results you were, so both are
  // as you left them when you come back from a journey.
  const [searchQuery, setSearchQuery] = useState('')
  const searchPositionRef = useRef(0)

  // Where the journey you've opened goes back to when you close it.
  const [journeyOpenedFrom, setJourneyOpenedFrom] = useState('home')

  // The ids of the journeys you've liked, kept on this device.
  const [likes, setLikes] = useState(loadLikes)

  // Your profile, if you've made one, and where you are in the journey you're
  // on, while you're somewhere else in the app (or it's been closed). Both
  // are kept on this device.
  const [profile, setProfile] = useState(loadProfile)
  const [progress, setProgress] = useState(loadProgress)

  // The journey you're looking at or on: the one left partway, to begin
  // with, or else the featured one.
  const [journeyId, setJourneyId] = useState(() => progress?.journeyId ?? ALL_JOURNEYS[0].id)
  const journey = journeyWithId(journeyId) ?? ALL_JOURNEYS[0]

  const [showStopConfirmation, setShowStopConfirmation] = useState(false)

  // The detour you're on (its card from journeyStops.js), and the ids of the
  // ones you've taken. A detour counts as taken once you press I'M HERE.
  const [detour, setDetour] = useState(null)
  const [detoursTaken, setDetoursTaken] = useState([])
  const [showSkipDetour, setShowSkipDetour] = useState(false)

  // The page a journey will start on, while "Make a profile?" asks first.
  const [pendingStart, setPendingStart] = useState(null)
  // The same, while "End your current journey?" asks first.
  const [pendingSwitch, setPendingSwitch] = useState(null)
  // Looking back at a finished journey's Memory page, from My Journeys.
  const [revisitingMemory, setRevisitingMemory] = useState(false)

  // The profile is kept on this device whenever it changes.
  useEffect(() => {
    storeProfile(profile)
  }, [profile])

  useEffect(() => {
    storeLikes(likes)
  }, [likes])

  // On a journey, where you are, at every step, so it can be picked up again
  // after going elsewhere in the app, or even after closing it. With or
  // without a profile.
  const onJourney = page in JOURNEY_PAGES
  useEffect(() => {
    if (onJourney) {
      storeProgress({ journeyId: journey.id, page, detourId: detour?.id ?? null, detoursTaken })
    }
  }, [onJourney, page, detour, detoursTaken, journey.id])

  function createProfile(name) {
    setProfile(newProfile(name))
  }

  function deleteProfile() {
    setProfile(null)
    storeProgress(null)
    setProgress(null)
    setLikes([])
  }

  function toggleLike(journeyId) {
    setLikes(likes.includes(journeyId) ? likes.filter((each) => each !== journeyId) : [...likes, journeyId])
  }

  // ✕ on a journey: "End your journey?" asks first.
  const stopJourney = () => setShowStopConfirmation(true)

  // A tab on the navbar. On a journey, it leaves the journey where it is, as
  // the one you're on, to pick up again later.
  function goToTab(tab) {
    if (onJourney) {
      setProgress({ journeyId: journey.id, page, detourId: detour?.id ?? null, detoursTaken })
    }
    setPage(tab)
  }

  // A new set of matches, so from the top of the list.
  function seeMatches() {
    matchesPositionRef.current = 0
    setPage('findMatches')
  }

  // A new search from Home, so with nothing typed yet.
  function openSearch() {
    setSearchQuery('')
    searchPositionRef.current = 0
    setPage('search')
  }

  function openJourney(chosen, from = 'home') {
    setJourneyId(chosen.id)
    setJourneyOpenedFrom(from)
    setPage('seeJourney')
  }

  // You can only be on one journey at a time, so with another left partway,
  // you're asked first whether to end it. Otherwise, with a profile, it's
  // started on it. Without one, you're asked first whether to make one.
  //
  // This is straight from tapping BEGIN, so it's when an iPhone can ask to use
  // the compass, for which way you're facing on the live map (compass.js). So
  // is resumeJourney.
  function beginJourney(firstPage) {
    askForCompass()
    if (underWay && underWay.journeyId !== journey.id) {
      setPendingSwitch(firstPage)
    } else if (profile) {
      startJourney(firstPage, profile)
    } else {
      setPendingStart(firstPage)
    }
  }

  // Every run starts with no detours taken, and ends any other: there's only
  // ever one journey you're on. `saveTo` is the profile to record it on, or
  // null without one.
  function startJourney(firstPage, saveTo) {
    setDetour(null)
    setDetoursTaken([])
    setRevisitingMemory(false)
    setProgress(null)
    if (saveTo) {
      setProfile(withJourneyStarted(saveTo, journey.id))
    }
    setPage(firstPage)
  }

  function resumeJourney() {
    askForCompass()
    setJourneyId(progress.journeyId)
    setDetour(ALL_DETOURS.find((each) => each.id === progress.detourId) ?? null)
    setDetoursTaken(progress.detoursTaken)
    setRevisitingMemory(false)
    setPage(progress.page)
  }

  // The end of a journey: it's no longer the one you're on, and with a
  // profile, it's recorded there as finished.
  function finishJourney() {
    if (profile) {
      const stopCount = journey.route.length + detoursTaken.length
      setProfile(withJourneyCompleted(profile, journey.id, detoursTaken, stopCount))
    }
    storeProgress(null)
    setProgress(null)
    setRevisitingMemory(false)
    setPage('memory')
  }

  // Ending a journey partway, from ✕: where you were is cleared, and it's
  // back to Home.
  function endJourney() {
    storeProgress(null)
    setProgress(null)
    setDetour(null)
    setDetoursTaken([])
    setPage('home')
  }

  // Looking back on a journey you've finished.
  function viewMemory() {
    setDetoursTaken(profile.journeys[journey.id].lastDetoursTaken ?? [])
    setRevisitingMemory(true)
    setPage('memory')
  }

  // Making a profile from the Memory page: this journey goes on it, finished.
  function createProfileFromMemory(name) {
    const started = withJourneyStarted(newProfile(name), journey.id)
    const stopCount = journey.route.length + detoursTaken.length
    setProfile(withJourneyCompleted(started, journey.id, detoursTaken, stopCount))
  }

  // The journey you're on, while you're somewhere else in the app (whichever
  // journey it is), and this journey's record on your profile.
  const underWay = progress && journeyWithId(progress.journeyId) ? progress : null
  const journeyRecord = profile?.journeys[journey.id]

  // The build stop's detours you haven't taken yet, and of those, the ones
  // other than the detour you're on.
  const detoursLeft = journey.build.detours.filter((each) => !detoursTaken.includes(each.id))
  const otherDetoursLeft = detoursLeft.filter((each) => each !== detour)

  let content

  if (page === 'profile') {
    content = (
      <ProfilePage
        profile={profile}
        journeys={ALL_JOURNEYS}
        onCreateProfile={createProfile}
        onRename={(name) => setProfile({ ...profile, name })}
        onOpenInterests={() => setPage('profileInterests')}
        onOpenPreferences={() => setPage('profilePreferences')}
        onOpenSettings={() => setPage('settings')}
      />
    )
  } else if (page === 'profileInterests' || page === 'profilePreferences') {
    // Both kept on the profile, as lists of names. Older profiles don't have
    // them yet.
    const list = page === 'profileInterests' ? 'interests' : 'preferences'
    const PickPage = page === 'profileInterests' ? InterestsPage : TravelPreferencesPage
    content = (
      <PickPage
        chosen={profile?.[list] ?? []}
        onToggle={(name) =>
          setProfile((current) => {
            const chosen = current[list] ?? []
            return {
              ...current,
              [list]: chosen.includes(name) ? chosen.filter((each) => each !== name) : [...chosen, name],
            }
          })
        }
        onDone={() => setPage('profile')}
        onBack={() => setPage('profile')}
      />
    )
  } else if (page === 'settings') {
    content = (
      <SettingsPage
        profile={profile}
        onDelete={() => {
          deleteProfile()
          setPage('profile')
        }}
        onBack={() => setPage('profile')}
      />
    )
  } else if (page === 'myJourneys') {
    content = (
      <MyJourneysPage
        profile={profile}
        journeys={ALL_JOURNEYS}
        progress={underWay}
        where={underWay ? whereLeftOff(underWay) : null}
        likes={likes}
        onResume={resumeJourney}
        onOpenJourney={(chosen) => openJourney(chosen, 'myJourneys')}
        onToggleLike={toggleLike}
        onSeeCompleted={() => setPage('completedJourneys')}
        onSeeLiked={() => setPage('likedJourneys')}
        onBrowse={() => setPage('home')}
        onCreateProfile={createProfile}
      />
    )
  } else if (page === 'completedJourneys') {
    content = (
      <CompletedJourneysPage
        profile={profile}
        journeys={ALL_JOURNEYS}
        likes={likes}
        onOpenJourney={(chosen) => openJourney(chosen, 'completedJourneys')}
        onToggleLike={toggleLike}
        onBack={() => setPage('myJourneys')}
      />
    )
  } else if (page === 'likedJourneys') {
    content = (
      <LikedJourneysPage
        journeys={ALL_JOURNEYS}
        likes={likes}
        onOpenJourney={(chosen) => openJourney(chosen, 'likedJourneys')}
        onToggleLike={toggleLike}
        onBack={() => setPage('myJourneys')}
      />
    )
  } else if (page === 'survey') {
    content = (
      <SurveyPage
        journey={journey}
        detoursTaken={detoursTaken}
        profileName={profile?.name}
        onBack={() => setPage('memory')}
        onHome={() => setPage('home')}
      />
    )
  } else if (page === 'memory') {
    content = (
      <MemoryPage
        journey={journey}
        detoursTaken={detoursTaken}
        profileName={profile?.name}
        // Only straight after finishing: making a profile, and the survey.
        onCreateProfile={profile || revisitingMemory ? null : createProfileFromMemory}
        onSurvey={revisitingMemory ? null : () => setPage('survey')}
        doneLabel={revisitingMemory ? 'BACK TO MY JOURNEYS' : 'BACK TO HOME'}
        onDone={() => setPage(revisitingMemory ? 'myJourneys' : 'home')}
      />
    )
  } else if (page === 'afterglowInfo') {
    content = (
      <ArrivedPage
        journey={journey}
        stop={journey.afterglow}
        continueLabel="FINISH JOURNEY ➜"
        onContinue={finishJourney}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'afterglow') {
    content = (
      <DirectionsPage
        journey={journey}
        stop={journey.afterglow}
        onImHere={() => setPage('afterglowInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'peakInfo') {
    content = (
      <ArrivedPage
        journey={journey}
        stop={journey.peak}
        onContinue={() => setPage('afterglow')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'peak') {
    content = (
      <DirectionsPage
        journey={journey}
        stop={journey.peak}
        onImHere={() => setPage('peakInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'detourInfo') {
    content = (
      <ArrivedPage
        journey={journey}
        stop={detour}
        detoursLeft={detoursLeft}
        detoursFrom={journey.build}
        onSeeDetours={() => setPage('detours')}
        onContinue={() => setPage('peak')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'detour') {
    content = (
      <DirectionsPage
        journey={journey}
        stop={detour}
        onImHere={() => {
          setDetoursTaken([...detoursTaken, detour.id])
          setPage('detourInfo')
        }}
        onSkip={() => setShowSkipDetour(true)}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'detours') {
    content = (
      <DetoursPage
        from={journey.build}
        done={detoursTaken}
        onTakeDetour={(chosen) => {
          setDetour(chosen)
          setPage('detour')
        }}
        onContinue={() => setPage('peak')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'buildInfo') {
    content = (
      <ArrivedPage
        journey={journey}
        stop={journey.build}
        detoursLeft={detoursLeft}
        onSeeDetours={() => setPage('detours')}
        // Skipping the detours.
        onContinue={() => setPage('peak')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'build') {
    content = (
      <DirectionsPage
        journey={journey}
        stop={journey.build}
        onImHere={() => setPage('buildInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'discoveryInfo') {
    content = (
      <ArrivedPage
        journey={journey}
        stop={journey.discovery}
        onContinue={() => setPage('build')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'discovery') {
    content = (
      <DirectionsPage
        journey={journey}
        stop={journey.discovery}
        onImHere={() => setPage('discoveryInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'departureInfo') {
    content = (
      <ArrivedPage
        journey={journey}
        stop={journey.departure}
        onContinue={() => setPage('discovery')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'departure') {
    content = (
      <DirectionsPage
        journey={journey}
        stop={journey.departure}
        onImHere={() => setPage('departureInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'seeJourney') {
    content = (
      <SeeJourneyPage
        journey={journey}
        onClose={() => setPage(journeyOpenedFrom)}
        onBeginJourney={() => beginJourney('departure')}
        onResume={resumeJourney}
        onViewMemory={viewMemory}
        completed={journeyRecord?.timesCompleted > 0}
        // Only if it's this journey that was left partway.
        underWay={underWay?.journeyId === journey.id ? whereLeftOff(underWay) : null}
      />
    )
  } else if (page === 'search') {
    content = (
      <SearchPage
        journeys={ALL_JOURNEYS}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        likes={likes}
        positionRef={searchPositionRef}
        onSelect={(chosen) => openJourney(chosen, 'search')}
        onToggleLike={toggleLike}
        onBack={() => setPage('home')}
      />
    )
  } else if (page === 'findMatches') {
    content = (
      <MatchesPage
        journeys={ALL_JOURNEYS}
        answers={findAnswers}
        likes={likes}
        positionRef={matchesPositionRef}
        onSelect={(chosen) => openJourney(chosen, 'findMatches')}
        onToggleLike={toggleLike}
        onBack={() => setPage('findDetails')}
      />
    )
  } else if (page === 'findPreferences') {
    content = (
      <PreferencesPage
        chosen={findAnswers.preferences}
        // From the answers as they are at that moment, so taps in quick
        // succession all count.
        onToggle={(name) =>
          setFindAnswers((answers) => ({
            ...answers,
            preferences: answers.preferences.includes(name)
              ? answers.preferences.filter((each) => each !== name)
              : [...answers.preferences, name],
          }))
        }
        onDone={() => setPage('findDetails')}
        onBack={() => setPage('findDetails')}
      />
    )
  } else if (page === 'findDetails') {
    content = (
      <DetailsPage
        journeys={ALL_JOURNEYS}
        answers={findAnswers}
        onAnswer={(change) => setFindAnswers((answers) => ({ ...answers, ...change }))}
        onMore={() => setPage('findPreferences')}
        onFind={seeMatches}
        onSkip={() => {
          setFindAnswers({ ...findAnswers, place: '', date: null, time: null, pace: null, preferences: [] })
          seeMatches()
        }}
        onBack={() => setPage('findWho')}
      />
    )
  } else if (page === 'findWho') {
    content = (
      <CompanionPage
        onChoose={(companion) => {
          setFindAnswers({ ...findAnswers, companion })
          setPage('findDetails')
        }}
        onSkip={() => {
          setFindAnswers({ ...findAnswers, companion: null })
          setPage('findDetails')
        }}
        onBack={() => setPage('findMood')}
      />
    )
  } else if (page === 'findMood') {
    content = (
      <MoodPage
        onChoose={(mood) => {
          setFindAnswers({ ...findAnswers, mood })
          setPage('findWho')
        }}
        onSkip={() => {
          setFindAnswers({ ...findAnswers, mood: null })
          setPage('findWho')
        }}
        onBack={() => setPage('find')}
      />
    )
  } else if (page === 'find') {
    content = (
      <FindJourneyPage
        onStart={() => {
          setFindAnswers(NEW_FIND_ANSWERS)
          setPage('findMood')
        }}
      />
    )
  } else {
    content = (
      <HomePage
        journeys={ALL_JOURNEYS}
        likes={likes}
        onSelect={openJourney}
        onToggleLike={toggleLike}
        onSearch={openSearch}
        positionRef={feedPositionRef}
      />
    )
  }

  // See Your Journey comes under the tab it was opened from, and a finished
  // journey's Memory page under My Journeys when it's looked back on from there.
  let navbarTab = navbarTabOf(page)
  if (page === 'seeJourney') {
    navbarTab = navbarTabOf(journeyOpenedFrom)
  } else if (page === 'memory' && revisitingMemory) {
    navbarTab = 'myJourneys'
  }

  const boxOpen = showStopConfirmation || showSkipDetour || pendingStart !== null || pendingSwitch !== null

  // On a phone this is the whole screen. On a laptop it's drawn as a phone
  // in the middle of the window — see the bottom of App.css.

  return (
    <div className="phone">
      {/* Keyed by page so each screen starts scrolled to the top. Inert while
          a box is up over it, so nothing behind can be tapped or tabbed to,
          and the same goes for the navbar. */}
      <div className="screen" key={page} inert={boxOpen}>
        {content}
      </div>

      {/* My Journeys is marked while you're away from a journey you're on. */}
      <NavBar
        current={navbarTab}
        onNavigate={goToTab}
        journeyGoing={underWay !== null && !onJourney}
        inert={boxOpen}
      />

      {showSkipDetour && (
        <SkipDetourPrompt
          hasOtherDetours={otherDetoursLeft.length > 0}
          onSeeOtherDetours={() => {
            setShowSkipDetour(false)
            setPage('detours')
          }}
          onContinueJourney={() => {
            setShowSkipDetour(false)
            setPage('peak')
          }}
          onStay={() => setShowSkipDetour(false)}
        />
      )}

      {showStopConfirmation && (
        <StopConfirmation
          onConfirm={() => {
            setShowStopConfirmation(false)
            endJourney()
          }}
          onCancel={() => setShowStopConfirmation(false)}
        />
      )}

      {pendingSwitch && (
        <ExitCurrentPrompt
          currentName={journeyWithId(underWay.journeyId).name}
          nextName={journey.name}
          // The one you were on ends there and then, then the new one
          // starts as any other does.
          onExit={() => {
            setPendingSwitch(null)
            storeProgress(null)
            setProgress(null)
            if (profile) {
              startJourney(pendingSwitch, profile)
            } else {
              setPendingStart(pendingSwitch)
            }
          }}
          onResume={() => {
            setPendingSwitch(null)
            resumeJourney()
          }}
          onStay={() => setPendingSwitch(null)}
        />
      )}

      {pendingStart && (
        <SaveProgressPrompt
          onSave={(name) => {
            setPendingStart(null)
            startJourney(pendingStart, newProfile(name))
          }}
          onSkip={() => {
            setPendingStart(null)
            startJourney(pendingStart, null)
          }}
          onCancel={() => setPendingStart(null)}
        />
      )}
    </div>
  )
}

// One of the four tags on a journey on Home: a symbol and a value, in a
// frosted white pill.
function FeedTag({ Icon, value }) {
  return (
    <div className="feedTag">
      <Icon className="feedTagIcon" />
      <p className="feedTagValue">{value}</p>
    </div>
  )
}

// A journey's four tags, in a row across the screen. A journey with longer
// ones ("Moderate", "Cultural") has them a little smaller, so they still fit
// on one line on any phone.
function FeedTags({ journey }) {
  const tagsRef = useRef(null)
  useShrinkToFit(tagsRef, 10.5, journey.id)
  return (
    <div className="feedTags" ref={tagsRef}>
      <FeedTag Icon={ClockIcon} value={journey.time.replace('hours', 'hrs')} />
      <FeedTag Icon={SolidWalkIcon} value={journey.difficulty} />
      <FeedTag Icon={SolidPinIcon} value={`${journey.route.length} stops`} />
      <FeedTag Icon={EXPERIENCE_ICONS[journey.experience]} value={journey.experience} />
    </div>
  )
}

// Home is a feed: every journey, one screen at a time, with its photo filling
// the screen. `positionRef` remembers which one you were on, so you come back
// to it after opening a journey or going to another tab. Tapping anywhere on
// one opens it. Its button is there to make that obvious, and for the
// keyboard; its click reaches the card too. The heart's click stops short of
// the card, so liking a journey doesn't open it.
function HomePage({ journeys, likes, onSelect, onToggleLike, onSearch, positionRef }) {
  const feedRef = useRef(null)

  // Before it's drawn, so the first journey doesn't flash up on the way.
  useLayoutEffect(() => {
    feedRef.current.scrollTop = positionRef.current * feedRef.current.clientHeight
  }, [positionRef])

  // A mouse wheel moves the feed only a little each turn, and the snapping pulls
  // that back to where it started. So a turn goes to the next journey. A trackpad
  // swipe sends a stream of these, which count as one turn until they stop.
  useEffect(() => {
    const feed = feedRef.current
    let lastWheelAt = 0

    function turnThePage(event) {
      // Ctrl and the wheel, or a pinch on a trackpad, is the browser zooming.
      if (event.ctrlKey) {
        return
      }
      event.preventDefault()
      const sameTurn = event.timeStamp - lastWheelAt < 200
      lastWheelAt = event.timeStamp
      if (sameTurn) {
        return
      }
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      feed.scrollBy({
        top: Math.sign(event.deltaY) * feed.clientHeight,
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    }

    // Added by hand, because React's onWheel isn't allowed to preventDefault.
    feed.addEventListener('wheel', turnThePage, { passive: false })
    return () => feed.removeEventListener('wheel', turnThePage)
  }, [])

  function rememberPosition(event) {
    const { scrollTop, clientHeight } = event.currentTarget
    positionRef.current = Math.round(scrollTop / clientHeight)
  }

  return (
    <div className="homePage">
      <Header />
      <button className="feedSearch" onClick={onSearch} aria-label="Search journeys">
        <SearchIcon />
      </button>
      <div className="feed" ref={feedRef} onScroll={rememberPosition}>
        {journeys.map((journey, index) => (
          <div key={journey.id} className="feedCard" onClick={() => onSelect(journey)}>
            <img
              src={journey.photo}
              alt={journey.photoAlt}
              style={{ objectPosition: journey.photoPosition }}
              // Fetched as you get near it, so opening the app doesn't download them all.
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="feedPlaceRow">
              <p className="feedPlace">
                <SolidPinIcon />
                {placeName(journey.location)}
              </p>
              {journey.aiMade && <AiBadge />}
              {journey.verified && <VerifiedBadge />}
            </div>
            <h2 className="feedTitle">{journey.name}</h2>
            <p className="feedTeaser">{journey.blurb}</p>
            <FeedTags journey={journey} />
            <button className="feedDiscover">
              Discover This Journey
              <ArrowRightIcon />
            </button>
            <button
              className={likes.includes(journey.id) ? 'matchHeart isLiked' : 'matchHeart'}
              onClick={(event) => {
                event.stopPropagation()
                onToggleLike(journey.id)
              }}
              aria-pressed={likes.includes(journey.id)}
              aria-label={`Like ${journey.name}`}
            >
              <HeartIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// The first screen of Find My Journey: the question, a picture of a path
// splitting in two, and the button that starts the steps (FindMyJourney.jsx).
function FindJourneyPage({ onStart }) {
  return (
    <div className="findPage">
      <Header />
      <h1 className="findTitle">
        What kind of day
        <br />
        do you want?
      </h1>
      <p className="findText">
        Tell us your mood, who’s coming,
        <br />
        and how much time you have.
      </p>

      <div className="findHero">
        <img src={findPicture} alt="" />
      </div>

      <button className="findStart" onClick={onStart}>
        Find My Journey
        <ArrowRightIcon />
      </button>
    </div>
  )
}

// Like a journey stop: the journey's photo across the top, then its name, then
// everything about it, which scrolls: its quick facts, what it is (the hook),
// where it starts, and on journeys that have one, a preview of the whole route
// (RoutePreview.jsx), then BEGIN JOURNEY. ✕ goes back to where you opened it
// from. `underWay` is where you left this journey, if it's the one you're on
// (with or without a profile): then it offers RESUME JOURNEY instead. `completed` says
// you've finished it before, which adds a tick above BEGIN JOURNEY and VIEW
// MEMORY below it.
function SeeJourneyPage({
  journey,
  onClose,
  onBeginJourney,
  onResume,
  onViewMemory,
  completed,
  underWay,
}) {
  return (
    <PhotoScreen
      className="journeyPage"
      photo={journey.photo}
      photoAlt={journey.photoAlt}
      photoPosition={journey.photoPosition}
      kicker="Your journey"
      label={journey.location}
      title={journey.name}
      onClose={onClose}
      closeLabel="Close"
    >
      <div className="factsRow">
        <span className="fact">
          <ClockIcon />
          {journey.time}
        </span>
        <span className="fact">
          <WalkIcon />
          {journey.walking}
        </span>
        <span className="fact">
          <RouteIcon />
          {journey.stops}
        </span>
      </div>

      {/* The hook: what the journey is, to get you excited about it. */}
      <div className="bodyText journeyDescription">
        {journey.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* A journey with a route preview starts its route with where to start,
          so it doesn't need START HERE as well. */}
      {hasRoutePreview(journey) ? (
        <RoutePreview journey={journey} />
      ) : (
        <div className="startCard">
          <p className="startCardLabel">START HERE</p>
          <div className="startCardRow">
            <PinIcon />
            <div>
              <p className="startCardName">{journey.departure.name}</p>
              <p className="startCardArea">{journey.startArea}</p>
              <p className="startCardNote">{journey.startNote}</p>
            </div>
          </div>
        </div>
      )}

      <div className="divider sectionBreak"></div>


      <div className="testTakeBtnContainer">
        {underWay ? (
          <>
            <p className="inProgressTag">IN PROGRESS</p>
            <h2 className="mainHook">Pick up where you left off?</h2>
            <p className="seeJourneyWhere">{underWay.text}</p>
            <button className="introBtn" onClick={onResume}>
              RESUME JOURNEY ➜
            </button>
            <div className="alreadyThere">
              <p>Rather start again from the beginning?</p>
              <button className="textLink" onClick={onBeginJourney}>
                START OVER ➜
              </button>
            </div>
          </>
        ) : (
          // Just the one button, whether or not you're at the start already:
          // it begins with the way there, and if you're there, I'M HERE is
          // the next tap. After a finished run, a quiet way back to its memory.
          <>
            {completed && <p className="completedNote">✓ You’ve completed this journey</p>}
            <button className="introBtn" onClick={onBeginJourney}>
              BEGIN JOURNEY ➜
            </button>
            {completed && (
              <button className="textLink viewMemoryLink" onClick={onViewMemory}>
                VIEW MEMORY
              </button>
            )}
          </>
        )}
      </div>
    </PhotoScreen>
  )
}

export default App
