import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import sceneryLogo from './assets/nature_icon.svg'
import exploreLogo from './assets/scenic_routes_icon.svg'
import experienceLogo from './assets/weird_and_wonderful_icon.svg'

import Header, { AiBadge, VerifiedBadge } from './Header.jsx'
import StopConfirmation from './StopConfirmation.jsx'
import SkipDetourPrompt from './SkipDetourPrompt.jsx'
import Questionnaire from './Questionnaire.jsx'
import { DirectionsPage, ArrivedPage, DetoursPage } from './StopPages.jsx'
import MemoryPage from './MemoryPage.jsx'
import SurveyPage from './SurveyPage.jsx'
import PhotoScreen from './PhotoScreen.jsx'
import {
  NavBar,
  MyJourneysPage,
  ProfilePage,
  SaveProgressPrompt,
  SaveExitPrompt,
} from './ProfilePages.jsx'
import { ClockIcon, NavigateIcon, PinIcon, RouteIcon, WalkIcon } from './Icons.jsx'
import { ALL_JOURNEYS, odawaraJourney } from './journeyStops'
import { PERSONALITIES, preloadQuizPhotos } from './quizData'
import {
  loadProfile,
  storeProfile,
  loadProgress,
  storeProgress,
  newProfile,
  withJourneyStarted,
  withJourneyCompleted,
} from './profileStore'
import './App.css'

// The prototype follows the flow chart:
//   Find My Journey → the quiz → your traveler type
//   → your journey → Departure → Discovery → Build, with optional detours
//   from there → Peak → Afterglow → Memory, looking back on the day
//   → the survey.
// Which stop each part is comes from the journey's card in journeyStops.js
// (Odawara: the station, Kamaboko-dori, the Local Culture Museum with the
// NINJA Museum as a detour, the castle, Miyuki-no-Hama).
// Home is a feed of every journey, the shortcut straight to any of them.
// Home, Find My Journey, My Journeys and Profile have a navbar along the
// bottom to move between them.

// The pages of the journey itself, and which part of the journey each one is
// about (a detour's pages are about whichever detour you're on). Used to
// save where you are, and to say where you left off.
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

// The pages with the navbar along the bottom.
const NAVBAR_PAGES = ['home', 'find', 'myJourneys', 'profile']

// Which journey the quiz picks for each traveler type.
const JOURNEY_FOR_TYPE = {
  'The Naturalist': odawaraJourney,
  'The Wanderer': odawaraJourney,
  'The Collector': odawaraJourney,
}

// Every journey's detours.
const ALL_DETOURS = ALL_JOURNEYS.flatMap((journey) => journey.route.flatMap((stop) => stop.detours ?? []))

function journeyWithId(id) {
  return ALL_JOURNEYS.find((journey) => journey.id === id) ?? null
}

function travelerTypeNamed(name) {
  return PERSONALITIES.find((each) => each.name === name) ?? null
}

// Where a saved journey was left off, in words, and how far along the route
// that is (detours count as being at the build stop, where they branch off).
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
    fraction: (along + (arrived ? 1 : 0.5)) / journey.route.length,
  }
}

function App() {
  // Which screen is showing: "home", "myJourneys", "profile", "find",
  // "quiz", "seeJourney", any of the JOURNEY_PAGES above,
  // "memory" or "survey".
  const [page, setPage] = useState('home')

  // Which journey Home's feed was on, kept here because the feed itself is
  // gone whenever you're on another screen.
  const feedPositionRef = useRef(0)

  // Your profile, if you've made one, and the journey you left partway
  // through, if it was being saved. Both are kept on this device.
  const [profile, setProfile] = useState(loadProfile)
  const [progress, setProgress] = useState(loadProgress)
  const [travelerType, setTravelerType] = useState(() => travelerTypeNamed(profile?.travelerType))

  // The journey you're looking at or on: the one left partway, to begin
  // with, or else the featured one.
  const [journeyId, setJourneyId] = useState(() => progress?.journeyId ?? ALL_JOURNEYS[0].id)
  const journey = journeyWithId(journeyId) ?? ALL_JOURNEYS[0]

  const [showStopConfirmation, setShowStopConfirmation] = useState(false);

  // The detour you're on (its card from journeyStops.js), and the ids of the
  // ones you've taken. A detour counts as taken once you press I'M HERE.
  const [detour, setDetour] = useState(null)
  const [detoursTaken, setDetoursTaken] = useState([])
  const [showSkipDetour, setShowSkipDetour] = useState(false)

  // Whether the journey under way is being saved as you go. Only ever with a
  // profile: starting one without saves nothing.
  const [saving, setSaving] = useState(false)
  // The page a journey will start on, while "Save your progress?" asks first.
  const [pendingStart, setPendingStart] = useState(null)
  const [showSaveExit, setShowSaveExit] = useState(false)
  // Looking back at a finished journey's Memory page, from My Journeys.
  const [revisitingMemory, setRevisitingMemory] = useState(false)

  // The profile is kept on this device whenever it changes.
  useEffect(() => {
    storeProfile(profile)
  }, [profile])

  // So is where you are in a journey that's being saved, at every step, so
  // it can be picked up again even after closing the app.
  useEffect(() => {
    if (saving && page in JOURNEY_PAGES) {
      storeProgress({ journeyId: journey.id, page, detourId: detour?.id ?? null, detoursTaken })
    }
  }, [saving, page, detour, detoursTaken, journey.id])

  // A quiz result goes on your profile too, if you have one.
  const rememberTravelerType = useCallback((type) => {
    setTravelerType(type)
    setProfile((current) =>
      current && current.travelerType !== type.name ? { ...current, travelerType: type.name } : current
    )
  }, [])

  function createProfile(name) {
    setProfile(newProfile(name, travelerType?.name))
  }

  function deleteProfile() {
    setProfile(null)
    storeProgress(null)
    setProgress(null)
    setTravelerType(null)
    setSaving(false)
  }

  const stopJourney = () => setShowStopConfirmation(true)

  function openJourney(chosen) {
    setJourneyId(chosen.id)
    setPage('seeJourney')
  }

  // SEE YOUR JOURNEY: the one picked for your traveler type.
  function seeYourJourney() {
    openJourney((travelerType && JOURNEY_FOR_TYPE[travelerType.name]) ?? ALL_JOURNEYS[0])
  }

  // With a profile, a journey is saved as you go. Without one, you're asked
  // first whether to make one.
  function beginJourney(firstPage) {
    if (profile) {
      startJourney(firstPage, profile)
    } else {
      setPendingStart(firstPage)
    }
  }

  // Every run starts with no detours taken. `saveTo` is the profile to save
  // it to, or null not to save it.
  function startJourney(firstPage, saveTo) {
    setDetour(null)
    setDetoursTaken([])
    setRevisitingMemory(false)
    setSaving(Boolean(saveTo))
    if (saveTo) {
      setProfile(withJourneyStarted(saveTo, journey.id))
      setProgress(null)
    }
    setPage(firstPage)
  }

  function resumeJourney() {
    setJourneyId(progress.journeyId)
    setDetour(ALL_DETOURS.find((each) => each.id === progress.detourId) ?? null)
    setDetoursTaken(progress.detoursTaken)
    setRevisitingMemory(false)
    setSaving(true)
    setPage(progress.page)
  }

  function finishJourney() {
    if (saving) {
      const stopCount = journey.route.length + detoursTaken.length
      setProfile(withJourneyCompleted(profile, journey.id, detoursTaken, stopCount))
      storeProgress(null)
      setProgress(null)
      setSaving(false)
    }
    setRevisitingMemory(false)
    setPage('memory')
  }

  // Leaving partway, back to Home. `keep` keeps where you are, to pick up
  // again from My Journeys; otherwise anything saved of this run is dropped.
  function leaveJourney(keep) {
    if (keep) {
      setProgress({ journeyId: journey.id, page, detourId: detour?.id ?? null, detoursTaken })
    } else if (saving) {
      storeProgress(null)
      setProgress(null)
    }
    setSaving(false)
    setPage('home')
  }

  // Making a profile from the Memory page: this journey goes on it, finished.
  function createProfileFromMemory(name) {
    const started = withJourneyStarted(newProfile(name, travelerType?.name), journey.id)
    const stopCount = journey.route.length + detoursTaken.length
    setProfile(withJourneyCompleted(started, journey.id, detoursTaken, stopCount))
  }

  // The journey left partway, if it's on your profile (whichever journey it
  // is), and this journey's record there.
  const underWay = profile && progress && journeyWithId(progress.journeyId) ? progress : null
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
        onCreateProfile={createProfile}
        onRename={(name) => setProfile({ ...profile, name })}
        onTakeQuiz={() => setPage('find')}
        onDelete={deleteProfile}
      />
    )
  } else if (page === 'myJourneys') {
    content = (
      <MyJourneysPage
        profile={profile}
        journeys={ALL_JOURNEYS}
        progress={underWay}
        where={underWay ? whereLeftOff(underWay) : null}
        onResume={resumeJourney}
        onOpenJourney={openJourney}
        onViewMemory={(chosen) => {
          setJourneyId(chosen.id)
          setDetoursTaken(profile.journeys[chosen.id].lastDetoursTaken ?? [])
          setRevisitingMemory(true)
          setPage('memory')
        }}
        onBrowse={() => setPage('home')}
        onCreateProfile={createProfile}
      />
    )
  } else if (page === 'survey') {
    content = (
      <SurveyPage
        journey={journey}
        travelerType={travelerType}
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
        stop={journey.afterglow}
        continueLabel="FINISH JOURNEY ➜"
        onContinue={finishJourney}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'afterglow') {
    content = (
      <DirectionsPage
        stop={journey.afterglow}
        onImHere={() => setPage('afterglowInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'peakInfo') {
    content = (
      <ArrivedPage
        stop={journey.peak}
        onContinue={() => setPage('afterglow')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'peak') {
    content = (
      <DirectionsPage
        stop={journey.peak}
        onImHere={() => setPage('peakInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'detourInfo') {
    content = (
      <ArrivedPage
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
        stop={journey.build}
        onImHere={() => setPage('buildInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'discoveryInfo') {
    content = (
      <ArrivedPage
        stop={journey.discovery}
        onContinue={() => setPage('build')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'discovery') {
    content = (
      <DirectionsPage
        stop={journey.discovery}
        onImHere={() => setPage('discoveryInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'departureInfo') {
    content = (
      <ArrivedPage
        stop={journey.departure}
        onContinue={() => setPage('discovery')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'departure') {
    content = (
      <DirectionsPage
        stop={journey.departure}
        onImHere={() => setPage('departureInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'seeJourney') {
    content = (
      <SeeJourneyPage
        journey={journey}
        onHome={() => setPage('home')}
        onBeginJourney={() => beginJourney('departure')}
        // Already at the start: skip the departure and head for the first stop.
        onSkipToFirstStop={() => beginJourney('discovery')}
        onResume={resumeJourney}
        completed={journeyRecord?.timesCompleted > 0}
        // Only if it's this journey that was left partway.
        underWay={underWay?.journeyId === journey.id ? whereLeftOff(underWay) : null}
      />
    )
  } else if (page === 'quiz') {
    content = (
      <Questionnaire
        onExit={() => setPage('find')}
        onHome={() => setPage('home')}
        onSeeJourney={seeYourJourney}
        onSetTravelerType={rememberTravelerType}
        profileName={profile?.name}
        onCreateProfile={createProfile}
      />
    )
  } else if (page === 'find') {
    content = <FindJourneyPage onStart={() => setPage('quiz')} />
  } else {
    content = (
      <HomePage
        journeys={ALL_JOURNEYS}
        onSelect={openJourney}
        positionRef={feedPositionRef}
      />
    )
  }

  const showNavBar = NAVBAR_PAGES.includes(page)
  const boxOpen = showStopConfirmation || showSkipDetour || showSaveExit || pendingStart !== null

  // On a phone this is the whole screen. On a laptop it's drawn as a phone
  // in the middle of the window — see the bottom of App.css.

  return (
    <div className="phone">
      {/* Keyed by page so each screen starts scrolled to the top. Inert while
          a box is up over it, so nothing behind can be tapped or tabbed to. */}
      <div className={showNavBar ? 'screen hasNavBar' : 'screen'} key={page} inert={boxOpen}>
        {content}
      </div>

      {showNavBar && <NavBar current={page} onNavigate={setPage} />}

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
            // With a profile, there's a choice of keeping your progress.
            if (saving) {
              setShowSaveExit(true)
            } else {
              leaveJourney(false)
            }
          }}
          onCancel={() => {
            setShowStopConfirmation(false)
          }}
        />
      )}

      {showSaveExit && (
        <SaveExitPrompt
          onSaveExit={() => {
            setShowSaveExit(false)
            leaveJourney(true)
          }}
          onExitWithoutSaving={() => {
            setShowSaveExit(false)
            leaveJourney(false)
          }}
          onStay={() => setShowSaveExit(false)}
        />
      )}

      {pendingStart && (
        <SaveProgressPrompt
          onSave={(name) => {
            setPendingStart(null)
            startJourney(pendingStart, newProfile(name, travelerType?.name))
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

// Home is a feed: every journey, one screen at a time, with its photo filling
// the screen. `positionRef` remembers which one you were on, so you come back
// to it after opening a journey or going to another tab. Tapping anywhere on
// one opens it. Its button is there to make that obvious, and for the
// keyboard; its click reaches the card too.
function HomePage({ journeys, onSelect, positionRef }) {
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
            <div className="feedCardText">
              {journey.aiMade && <AiBadge />}
              {journey.verified && <VerifiedBadge />}
              <p className="feedPlace">
                <PinIcon />
                {/* "KAMAKURA · KANAGAWA, JAPAN", without the town. */}
                {journey.location.split(' · ')[1]}
              </p>
              <h2 className="heroTitle">{journey.name}</h2>
              <button className="introBtn">EXPLORE THIS JOURNEY ➜</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Explains what the quiz is before anyone starts it.
function FindJourneyPage({ onStart }) {
  // The quiz is next, so start fetching its pictures now.
  useEffect(() => {
    preloadQuizPhotos()
  }, [])

  return (
    <div className="findPage">
      <div className="pageTop">
        <Header />
        <h1 className="mainHook pageTitle">Find My Journey</h1>
        <p className="msg msgQuote">“Every traveler experiences Japan differently.”</p>
        <p className="msg">
          Answer eight quick questions and we'll tell you what kind of traveler you
          are. Then we'll match you with journeys that fit.
        </p>
        <div className="icons">
          <div className="iconContainer">
            <img src={sceneryLogo} alt="" />
            <p>What kind of scenery?</p>
          </div>
          <div className="iconContainer">
            <img src={exploreLogo} alt="" />
            <p>How do you like to explore?</p>
          </div>
          <div className="iconContainer">
            <img src={experienceLogo} alt="" />
            <p>What kind of experience?</p>
          </div>
        </div>
        <div className="divider"></div>
      </div>

      <ol className="howSteps">
        <li>
          <span className="howNum">1</span>
          <span>
            <strong>Pick a picture.</strong> Each question shows two places. Tap the
            one that pulls you in.
          </span>
        </li>
        <li>
          <span className="howNum">2</span>
          <span>
            <strong>Go with your gut.</strong> There are no wrong answers, and it
            takes about a minute.
          </span>
        </li>
        <li>
          <span className="howNum">3</span>
          <span>
            <strong>Meet your traveler type.</strong> The Naturalist, the Collector
            or the Wanderer.
          </span>
        </li>
      </ol>

      <div className="testTakeBtnContainer">
        <h2 className="mainHook">Ready to discover yours?</h2>
        <button className="introBtn" onClick={onStart}>
          START QUIZ ➜
        </button>
      </div>
    </div>
  )
}

// Like a journey stop: the journey's photo fills the screen, and everything
// about it is in the panel pulled up from the bottom. ✕ goes back to Home.
// `underWay` is where you left this journey, if it's on your profile
// partway through: then it offers RESUME JOURNEY instead. `completed` says
// you've finished it before.
function SeeJourneyPage({
  journey,
  onHome,
  onBeginJourney,
  onSkipToFirstStop,
  onResume,
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
      sheetLabel="SEE JOURNEY DETAILS"
      sheetKicker="Your journey"
      onClose={onHome}
      closeLabel="Back to home"
    >
      <p className="heroTagline">{journey.tagline}</p>

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

      <h2 className="sectionTitle">Why we recommend this journey</h2>
      <div className="bodyText">
        {journey.why.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="divider sectionBreak"></div>

      {/* Right before BEGIN, so it's the last thing read before setting off. */}
      {journey.aiMade && (
        <div className="aiNote">
          <p className="startCardLabel">
            <AiBadge /> NOT YET VERIFIED
          </p>
          <p className="aiNoteText">
            This journey was put together with AI and hasn’t been checked by Unfold yet. The
            places are real, but opening times, prices and access may have changed, and the map
            finds each stop by its name. Check before you go.
          </p>
        </div>
      )}

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
          <>
            {completed && <p className="completedNote">✓ You’ve completed this journey</p>}
            <h2 className="mainHook">
              {completed ? 'Ready to do it again?' : 'Are you ready to embark on this adventure?'}
            </h2>
            <button className="introBtn hasIcon" onClick={onBeginJourney}>
              <NavigateIcon />
              GET DIRECTIONS TO THE START
            </button>
            <div className="alreadyThere">
              <p>Already at the starting point?</p>
              <button className="textLink" onClick={onSkipToFirstStop}>
                {completed ? 'BEGIN JOURNEY AGAIN ➜' : 'BEGIN JOURNEY ➜'}
              </button>
            </div>
          </>
        )}
      </div>
    </PhotoScreen>
  )
}

export default App
