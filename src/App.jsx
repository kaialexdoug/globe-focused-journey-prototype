import { useEffect, useState } from 'react'

import sceneryLogo from './assets/nature_icon.svg'
import exploreLogo from './assets/scenic_routes_icon.svg'
import experienceLogo from './assets/weird_and_wonderful_icon.svg'

import emaTunnel from './assets/journey/ema-tunnel.jpg'
import kawagoeStation from './assets/journey/kawagoe-station.jpg'

import Header from './Header.jsx'
import StopConfirmation from './StopConfirmation.jsx'
import Questionnaire from './Questionnaire.jsx'
import { preloadQuizPhotos } from './quizData'
import './App.css'

// The prototype covers the start of the flow chart only:
//   Opening Screen → Find My Journey → the quiz → your traveler type.
// Journeys come after that, once they've been planned.
function App() {
  // Which screen is showing: "home", "find" or "quiz".
  const [page, setPage] = useState('home')
  const [travelerType, setTravelerType] = useState(null);
  const [showStopConfirmation, setShowStopConfirmation] = useState(false);

  let content
  if (page === 'departureInfo') {
    content = (
      <DepartureInfoPage />
    )
  } else if (page === 'departure') {
      content = (
      <DeparturePage
        onStopJourney={() => {
          console.log("stop button pressed")
          setShowStopConfirmation(true)
        }}
        onImHere={() => setPage('departureInfo')}
      />
    )
  } else if (page === 'seeJourney') {
    content = (
      <SeeJourneyPage
        onHome={() => setPage('home')}
        onBeginJourney={() => setPage('departure')}
        travelerType={travelerType}
      />
    )
  } else if (page === 'quiz') {
    content = (
      <Questionnaire
        onExit={() => setPage('find')}
        onHome={() => setPage('home')}
        onSeeJourney={() => setPage('seeJourney')}
        onSetTravelerType={setTravelerType}
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
      />
    )
  } else {
    content = (
      <HomePage 
        onFindJourney={() => setPage('find')} 
        onBrowseJourney={() => setPage('browse')}
      />
    )
  }

  // On a phone this is the whole screen. On a laptop it's drawn as a phone
  // in the middle of the window — see the bottom of App.css.

  return (
    <div className="phone">
      {/* Keyed by page so each screen starts scrolled to the top. */}
      <div className="screen" key={page}>
        {content}
      </div>
      
      <div style={{ color: 'red' }}>
        Confirmation state: {String(showStopConfirmation)}
      </div>

      {showStopConfirmation && (
        <StopConfirmation 
          onConfirm={() => {
            setPage('home')
            setShowStopConfirmation(false)
          }}
          onCancel={() => {
            setShowStopConfirmation(false)
          }}
        />
      )}
    </div>
  )
}

function HomePage({ onFindJourney, onBrowseJourney }) {
  return (
    <div className="homePage">
      <div className="homeBackdrop" aria-hidden="true"></div>
      <Header />
      <div className="homeHook">
        <h1 className="mainHook">
          Unforgettable experiences <br />
          in Japan
        </h1>
        <p className="subHook">Curated. Authentic. Unforgettable.</p>
        <div className="introBtnContainer">
          <button className="introBtn" onClick={onFindJourney}>
            FIND MY JOURNEY ➜
          </button>
          <button className="introBtn" onClick={onBrowseJourney}>
            BROWSE JOURNEYS ➜
          </button>
        </div>
      </div>
    </div>
  )
}

function BrowseJourneyPage({ onBack, onSelect }) {
  return (
    <div className="browseJourneyPage">
      <Header />
      <button className="backBtn" onClick={onBack}>
        ‹ BACK
      </button>
      <h1>Browse Journeys</h1>
      <div className="journeyListContainer">
        <button className="resultHero" onClick={onSelect}>
          <div className="resultHeroText">
            <p>Explore the historic streets of Kawagoe.</p>
            <h2>Adventure in Kawagoe</h2>
          </div>
          <img src={emaTunnel} />
        </button>
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
      <div className="main">
        <Header />
        <button className="backBtn" onClick={onBack}>
          ‹ BACK
        </button>
        <h1 className="mainHook">Find My Journey</h1>
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

const journeys = {
  "The Naturalist": "Adventure in Kawagoe",
  "The Wanderer": "Adventure in Kawagoe",
  "The Collector": "Adventure in Kawagoe"
}

function SeeJourneyPage({ onHome, onBeginJourney, travelerType }) {
  let journeyName = travelerType ? journeys[travelerType.name] : "Adventure in Kawagoe"

  return (
    <div className="journeyPage">
      <Header />

      <div className="journeyHero">
        <img src={emaTunnel} />

        <div className="journeyHeroText">
          <p>Your Journey:</p>
          <h1>{journeyName}</h1>
        </div>
      </div>
      
      <div className="summaryContainer">
        <p className="msgQuote">~5 stops · ~2 hours · Flat walking</p>
        <div className="divider"></div>
        <p className="summaryTitle"><strong>Why we recommend this Journey:</strong></p>
        <p className="summary">
          Everyone who comes to Kawagoe sees the same bell tower, the same warehouse street, the same photo. This journey starts there too — but it doesn't end there.

Past the crowds, down streets most visitors never think to turn down, there's a reason the locals still call this town "Koedo," (little Edo) A gate that's marked time here for over a century. A quiet shrine tucked away from the noise, holding something most people walk straight past.

We won't tell you what it is. You'll have to go see for yourself.
        </p>

        <div className="divider"></div>

        <div className="readyBtnContainer">
          <p><strong>Are you ready to embark on this adventure?</strong></p>

          <button className="introBtn" onClick={onBeginJourney}>
            BEGIN JOURNEY ➜
          </button>
        </div>
      </div>
      
      <button className="backBtn" onClick={onHome}>
        BACK TO HOME
      </button>
    </div>
  )
}

function DeparturePage({ onStopJourney, onImHere }) {
  const [origin, setOrigin] = useState(null)
  const [dots, setDots] = useState("")

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setOrigin({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      (error) => {
        console.log(error)
      }
    )
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((previousDots) => {
        if (previousDots.length >= 3) {
          return ""
        }

        return previousDots + "."
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="departurePage">
      <Header />
      <h1>DEPARTURE</h1>
      <div className="summaryTitle">
        <p>Your journey begins at:</p>
      </div>
      <div>
        <div className="resultHero">
          <div className="resultHeroText">
            <h2>Kawagoe Station</h2>
          </div>
          <img src={kawagoeStation} />
        </div>
        {origin ? (
          <div className="mapContainer">
            <iframe
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCma7dzNflY-77W4PfTIr9M9wr3KcQtyO4&origin=${origin.lat},${origin.lng}&destination=Kawagoe+Station&mode=transit`}>
            </iframe>
            <button className="introBtn" onClick={onImHere}>I'M HERE</button>
          </div>
        ) : (
          <p className="loadingText">
            Loading your location and map<span className="loadingDots">{dots}</span>
          </p>
        )}
      </div>
      <button className="backBtn" onClick={onStopJourney}>
        STOP JOURNEY
      </button>
    </div>
  )
}

function DepartureInfoPage() {
  return (
    <div className="departureInfoPage">
      <Header />
      <p>this is the departure info page.</p>
    </div>
  )
}

export default App
