import { useCallback, useEffect, useState } from 'react'

import sceneryLogo from './assets/nature_icon.svg'
import exploreLogo from './assets/scenic_routes_icon.svg'
import experienceLogo from './assets/weird_and_wonderful_icon.svg'

import Header, { PhotoHero } from './Header.jsx'
import StopConfirmation from './StopConfirmation.jsx'
import SkipDetourPrompt from './SkipDetourPrompt.jsx'
import Questionnaire from './Questionnaire.jsx'
import { DirectionsPage, ArrivedPage, DetoursPage } from './StopPages.jsx'
import MemoryPage from './MemoryPage.jsx'
import SurveyPage from './SurveyPage.jsx'
import {
  NavBar,
  MyJourneysPage,
  ProfilePage,
  SaveProgressPrompt,
  SaveExitPrompt,
} from './ProfilePages.jsx'
import { ClockIcon, NavigateIcon, PinIcon, RouteIcon, WalkIcon } from './Icons.jsx'
import { kawagoeStation, imofukudo, tokiNoKane, hikawaShrine, maruya, kawagoeJourney } from './journeyStops'
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
//   Opening Screen → Find My Journey → the quiz → your traveler type
//   → your journey → Departure (Kawagoe Station) → Discovery (Imofukudo)
//   → Build (Toki no Kane), with optional detours from there (Kawagoe City
//   Museum, Kawagoe Castle) → Peak (Hikawa Shrine) → Afterglow (MARUYA)
//   → Memory, looking back on the day → the survey.
// Browse Journeys is the shortcut from the opening screen straight to a journey.
// Home, My Journeys and Profile have a navbar along the bottom to move
// between them.

// The pages of the journey itself, and the stop each one is about (a
// detour's pages are about whichever detour you're on). Used to save where
// you are, and to say where you left off.
const JOURNEY_PAGES = {
  departure: kawagoeStation,
  departureInfo: kawagoeStation,
  discovery: imofukudo,
  discoveryInfo: imofukudo,
  build: tokiNoKane,
  buildInfo: tokiNoKane,
  detours: tokiNoKane,
  detour: null,
  detourInfo: null,
  peak: hikawaShrine,
  peakInfo: hikawaShrine,
  afterglow: maruya,
  afterglowInfo: maruya,
}

// The pages with the navbar along the bottom.
const NAVBAR_PAGES = ['home', 'myJourneys', 'profile']

// Every journey there is (just the one, for now), and all their detours.
const ALL_JOURNEYS = [kawagoeJourney]
const ALL_DETOURS = kawagoeJourney.route.flatMap((stop) => stop.detours ?? [])

function travelerTypeNamed(name) {
  return PERSONALITIES.find((each) => each.name === name) ?? null
}

// Where a saved journey was left off, in words, and how far along the route
// that is (detours count as being at Toki no Kane, where they branch off).
function whereLeftOff(progress) {
  const detour = ALL_DETOURS.find((each) => each.id === progress.detourId)
  const stop = JOURNEY_PAGES[progress.page] ?? detour ?? tokiNoKane
  const arrived = progress.page.endsWith('Info') || progress.page === 'detours'
  const along = kawagoeJourney.route.indexOf(JOURNEY_PAGES[progress.page] ?? tokiNoKane)
  return {
    text: `${arrived ? 'You’re at' : 'Heading to'} ${stop.name}`,
    fraction: (along + (arrived ? 1 : 0.5)) / kawagoeJourney.route.length,
  }
}

function App() {
  // Which screen is showing: "home", "myJourneys", "profile", "find",
  // "quiz", "browse", "seeJourney", any of the JOURNEY_PAGES above,
  // "memory" or "survey".
  const [page, setPage] = useState('home')

  // Your profile, if you've made one, and the journey you left partway
  // through, if it was being saved. Both are kept on this device.
  const [profile, setProfile] = useState(loadProfile)
  const [progress, setProgress] = useState(loadProgress)
  const [travelerType, setTravelerType] = useState(() => travelerTypeNamed(profile?.travelerType))

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
      storeProgress({ journeyId: kawagoeJourney.id, page, detourId: detour?.id ?? null, detoursTaken })
    }
  }, [saving, page, detour, detoursTaken])

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
      setProfile(withJourneyStarted(saveTo, kawagoeJourney.id))
      setProgress(null)
    }
    setPage(firstPage)
  }

  function resumeJourney() {
    setDetour(ALL_DETOURS.find((each) => each.id === progress.detourId) ?? null)
    setDetoursTaken(progress.detoursTaken)
    setRevisitingMemory(false)
    setSaving(true)
    setPage(progress.page)
  }

  function finishJourney() {
    if (saving) {
      const stopCount = kawagoeJourney.route.length + detoursTaken.length
      setProfile(withJourneyCompleted(profile, kawagoeJourney.id, detoursTaken, stopCount))
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
      setProgress({ journeyId: kawagoeJourney.id, page, detourId: detour?.id ?? null, detoursTaken })
    } else if (saving) {
      storeProgress(null)
      setProgress(null)
    }
    setSaving(false)
    setPage('home')
  }

  // Making a profile from the Memory page: this journey goes on it, finished.
  function createProfileFromMemory(name) {
    const started = withJourneyStarted(newProfile(name, travelerType?.name), kawagoeJourney.id)
    const stopCount = kawagoeJourney.route.length + detoursTaken.length
    setProfile(withJourneyCompleted(started, kawagoeJourney.id, detoursTaken, stopCount))
  }

  // The journey left partway, if it's on your profile.
  const underWay = profile && progress?.journeyId === kawagoeJourney.id ? progress : null
  const journeyRecord = profile?.journeys[kawagoeJourney.id]

  // Toki no Kane's detours you haven't taken yet, and of those, the ones
  // other than the detour you're on.
  const detoursLeft = tokiNoKane.detours.filter((each) => !detoursTaken.includes(each.id))
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
        onOpenJourney={() => setPage('seeJourney')}
        onViewMemory={(journey) => {
          setDetoursTaken(profile.journeys[journey.id].lastDetoursTaken ?? [])
          setRevisitingMemory(true)
          setPage('memory')
        }}
        onBrowse={() => setPage('browse')}
        onCreateProfile={createProfile}
      />
    )
  } else if (page === 'survey') {
    content = (
      <SurveyPage
        journey={kawagoeJourney}
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
        journey={kawagoeJourney}
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
        stop={maruya}
        continueLabel="FINISH JOURNEY ➜"
        onContinue={finishJourney}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'afterglow') {
    content = (
      <DirectionsPage
        stop={maruya}
        onImHere={() => setPage('afterglowInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'peakInfo') {
    content = (
      <ArrivedPage
        stop={hikawaShrine}
        onContinue={() => setPage('afterglow')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'peak') {
    content = (
      <DirectionsPage
        stop={hikawaShrine}
        onImHere={() => setPage('peakInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'detourInfo') {
    content = (
      <ArrivedPage
        stop={detour}
        detoursLeft={detoursLeft}
        detoursFrom={tokiNoKane}
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
        from={tokiNoKane}
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
        stop={tokiNoKane}
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
        stop={tokiNoKane}
        onImHere={() => setPage('buildInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'discoveryInfo') {
    content = (
      <ArrivedPage
        stop={imofukudo}
        onContinue={() => setPage('build')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'discovery') {
    content = (
      <DirectionsPage
        stop={imofukudo}
        onImHere={() => setPage('discoveryInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'departureInfo') {
    content = (
      <ArrivedPage
        stop={kawagoeStation}
        onContinue={() => setPage('discovery')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'departure') {
    content = (
      <DirectionsPage
        stop={kawagoeStation}
        onImHere={() => setPage('departureInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'seeJourney') {
    content = (
      <SeeJourneyPage
        onHome={() => setPage('home')}
        onBeginJourney={() => beginJourney('departure')}
        // Already at the start: skip Kawagoe Station and head for the first stop.
        onSkipToFirstStop={() => beginJourney('discovery')}
        onResume={resumeJourney}
        travelerType={travelerType}
        completed={journeyRecord?.timesCompleted > 0}
        underWay={underWay ? whereLeftOff(underWay) : null}
      />
    )
  } else if (page === 'quiz') {
    content = (
      <Questionnaire
        onExit={() => setPage('find')}
        onHome={() => setPage('home')}
        onSeeJourney={() => setPage('seeJourney')}
        onSetTravelerType={rememberTravelerType}
        profileName={profile?.name}
        onCreateProfile={createProfile}
      />
    )
  } else if (page === 'find') {
    content = (
      <FindJourneyPage
        onStart={() => setPage('quiz')}
        onBack={() => setPage('home')}
      />
    )
  } else if (page === 'browse') {
    content = (
      <BrowseJourneyPage
        onBack={() => setPage('home')}
        onSelect={() => setPage('seeJourney')}
        travelerType={travelerType}
      />
    )
  } else {
    content = (
      <HomePage
        profile={profile}
        travelerType={travelerType}
        resume={underWay ? { journey: kawagoeJourney, where: whereLeftOff(underWay) } : null}
        onResume={resumeJourney}
        onFindJourney={() => setPage('find')}
        onSeeYourJourney={() => setPage('seeJourney')}
        onBrowseJourney={() => setPage('browse')}
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

// With a profile, Home says hello, shows your traveler type, and offers the
// journey you left partway. Once it knows your type, SEE YOUR JOURNEY goes
// straight to your journey, with the quiz there to retake.
function HomePage({ profile, travelerType, resume, onResume, onFindJourney, onSeeYourJourney, onBrowseJourney }) {
  const knowsType = profile && travelerType

  return (
    <div className="homePage">
      <div className="homeBackdrop" aria-hidden="true"></div>
      <Header />
      <div className="homeHook">
        {profile && (
          <div className="homeWelcome">
            <p className="homeGreeting">Welcome back, {profile.name}.</p>
            {travelerType && (
              <p className="homeType" style={{ '--type-color': travelerType.color }}>
                {travelerType.name}
              </p>
            )}
          </div>
        )}
        <h1 className="mainHook">
          Unforgettable experiences <br />
          in Japan
        </h1>
        <p className="subHook">Curated. Authentic. Unforgettable.</p>

        {resume && (
          <button className="homeResume" onClick={onResume}>
            <span className="inProgressTag">IN PROGRESS</span>
            <span className="homeResumeName">{resume.journey.name}</span>
            <span className="homeResumeWhere">{resume.where.text}</span>
            <span className="homeResumeGo">RESUME ➜</span>
          </button>
        )}

        <div className="introBtnContainer">
          {knowsType ? (
            <button className="introBtn" onClick={onSeeYourJourney}>
              SEE YOUR JOURNEY ➜
            </button>
          ) : (
            <button className="introBtn" onClick={onFindJourney}>
              FIND MY JOURNEY ➜
            </button>
          )}
          <button className="introBtn isGhost" onClick={onBrowseJourney}>
            BROWSE JOURNEYS ➜
          </button>
          {knowsType && (
            <button className="textLink" onClick={onFindJourney}>
              RETAKE THE QUIZ
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function BrowseJourneyPage({ onBack, onSelect, travelerType }) {
  const journey = kawagoeJourney
  // Once you've taken the quiz, it's been picked for you, and says why.
  const reason = travelerType ? journey.reasons[travelerType.name] : null

  return (
    <div className="browseJourneyPage">
      <Header />
      <button className="backBtn pageBack" onClick={onBack}>
        ‹ BACK
      </button>

      <div className="pageBody">
        {/* The whole card opens the journey. Its button is there to make that
            obvious, and for the keyboard; its click reaches the card too. */}
        <div className="featureCard" onClick={onSelect}>
          <img src={journey.photo} alt="" />
          <p className="featureCardTag">{travelerType ? 'CHOSEN FOR YOU' : 'FEATURED JOURNEY'}</p>
          <div className="featureCardText">
            <p className="heroLabel">{journey.location}</p>
            <h1 className="heroTitle">{journey.name}</h1>
            <p className="featureCardBlurb">{journey.blurb}</p>
            {reason && <p className="featureCardReason">{reason}</p>}
            <button className="introBtn">EXPLORE THIS JOURNEY ➜</button>
          </div>
        </div>

        <div className="comingSoonCard">
          <p className="comingSoonTitle">More journeys coming soon</p>
          <p>New routes across Japan are on their way.</p>
        </div>
      </div>
    </div>
  )
}

// Explains what the quiz is before anyone starts it.
function FindJourneyPage({ onStart, onBack }) {
  // The quiz is next, so start fetching its pictures now.
  useEffect(() => {
    preloadQuizPhotos()
  }, [])

  return (
    <div className="findPage">
      <div className="pageTop">
        <Header />
        <button className="backBtn pageBack" onClick={onBack}>
          ‹ BACK
        </button>
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

// Which journey each traveler type is matched with.
const journeys = {
  "The Naturalist": kawagoeJourney,
  "The Wanderer": kawagoeJourney,
  "The Collector": kawagoeJourney
}

// `underWay` is where you left this journey, if it's on your profile
// partway through: then it offers RESUME JOURNEY instead. `completed` says
// you've finished it before.
function SeeJourneyPage({
  onHome,
  onBeginJourney,
  onSkipToFirstStop,
  onResume,
  travelerType,
  completed,
  underWay,
}) {
  const journey = travelerType ? journeys[travelerType.name] : kawagoeJourney

  return (
    <div className="journeyPage">
      <PhotoHero
        photo={journey.photo}
        photoAlt={journey.photoAlt}
        kicker="Your journey"
        label={journey.location}
        title={journey.name}
        size="isTall"
      />

      <div className="pageBody">
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
              <p className="startCardName">{journey.start.name}</p>
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
          <button className="backBtn" onClick={onHome}>
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
