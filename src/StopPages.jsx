import { useEffect, useState } from 'react'

import Header, { SectionHeader } from './Header.jsx'
import Narration from './Narration.jsx'
import PhotoScreen from './PhotoScreen.jsx'
import { MAPS_API_KEY } from './config.js'

// The two screens every stop on the journey uses, and the Detours page for a
// stop with detours. Each one is filled in from the cards in journeyStops.js.

// "Two short side trips", "one more detour", and so on.
const NUMBER_WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

function numberWord(count) {
  return NUMBER_WORDS[count] ?? String(count)
}

// A stop, like a Reel: its photo fills the screen, with its heading, label
// and name small in the corner, and ✕ for stopping the journey. What to do
// there (`children`) is in a panel pulled up from the bottom, its handle
// saying `sheetLabel`.
function StopScreen({ className, stop, heading, label, sheetLabel, onStopJourney, children }) {
  return (
    <PhotoScreen
      className={className}
      photo={stop.photo}
      photoAlt={stop.photoAlt}
      photoPosition={stop.photoPosition}
      kicker={heading}
      label={label}
      title={stop.name}
      sheetLabel={sheetLabel}
      sheetKicker={`${heading} · ${label}`}
      onClose={onStopJourney}
      closeLabel="Stop journey"
    >
      {children}
    </PhotoScreen>
  )
}

// Getting there: the stop, then a map from wherever you are to it. A detour
// also gets SKIP THIS DETOUR (with `onSkip`), for changing your mind.
export function DirectionsPage({ stop, onImHere, onSkip, onStopJourney }) {
  const [origin, setOrigin] = useState(null)
  // No location (denied, unavailable, or too slow) still gets a map: just the
  // stop on its own, without directions to it.
  const [locationFailed, setLocationFailed] = useState(() => !('geolocation' in navigator))

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setOrigin({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      () => setLocationFailed(true),
      { timeout: 10000 }
    )
  }, [])

  const place = encodeURIComponent(stop.mapPlace)
  let mapSrc = null
  if (origin) {
    mapSrc = `https://www.google.com/maps/embed/v1/directions?key=${MAPS_API_KEY}&origin=${origin.lat},${origin.lng}&destination=${place}&mode=${stop.travelMode}`
  } else if (locationFailed) {
    mapSrc = `https://www.google.com/maps/embed/v1/place?key=${MAPS_API_KEY}&q=${place}`
  }

  return (
    <StopScreen
      className="directionsPage"
      stop={stop}
      heading={stop.directionsHeading}
      label={stop.directionsLabel}
      sheetLabel="SEE DIRECTIONS"
      onStopJourney={onStopJourney}
    >
      {mapSrc ? (
        <>
          {locationFailed && (
            <p className="mapNote">
              We couldn't find your location — here's {stop.name}.
            </p>
          )}
          {/* Loads straight away, though the panel starts closed, so the map's
              ready by the time it's pulled up. */}
          <div className="mapContainer">
            <iframe
              title={`Map to ${stop.name}`}
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              src={mapSrc}>
            </iframe>
          </div>
          <button className="introBtn" onClick={onImHere}>I'M HERE</button>
        </>
      ) : (
        // The same size as the map, so nothing jumps when it arrives.
        <div className="mapPlaceholder" role="status">
          Loading your location and map…
        </div>
      )}

      {onSkip && (
        <button className="textLink pageTextLink" onClick={onSkip}>
          SKIP THIS DETOUR
        </button>
      )}
    </StopScreen>
  )
}

// What the narration screen says about detours still to take, if any:
// a stop's own (with a `detoursNote` on its card, like Toki no Kane), or, on
// a detour, the others from the same stop.
function detourOffer(stop, detoursLeft, detoursFrom) {
  if (!detoursLeft || detoursLeft.length === 0) {
    return null
  }
  if (stop.detoursNote) {
    return {
      label: 'OPTIONAL DETOURS',
      text: stop.detoursNote,
      skip: 'Or you can skip them and keep going.',
    }
  }
  const left = detoursLeft.length
  return {
    label: left === 1 ? 'ONE MORE DETOUR' : 'MORE DETOURS',
    text:
      left === 1
        ? `There’s one more detour from ${detoursFrom.name}, if you’re up for it.`
        : `There are ${numberWord(left)} more detours from ${detoursFrom.name}, if you’re up for it.`,
    skip: `Or skip ${left === 1 ? 'it' : 'them'} and head back to the route.`,
  }
}

// Being there: the stop again, then its narration. If there are detours to
// offer (`detoursLeft`, the ones not taken yet), they come first, with
// CONTINUE underneath for skipping them. On a detour, `detoursFrom` is the
// stop the detours belong to. The last stop says FINISH JOURNEY instead of
// CONTINUE (`continueLabel`).
export function ArrivedPage({
  stop,
  detoursLeft,
  detoursFrom,
  onSeeDetours,
  continueLabel = 'CONTINUE ➜',
  onContinue,
  onStopJourney,
}) {
  const offer = onSeeDetours ? detourOffer(stop, detoursLeft, detoursFrom) : null

  return (
    <StopScreen
      className="arrivedPage"
      stop={stop}
      heading={stop.arrivedHeading}
      label={stop.arrivedLabel}
      sheetLabel="SEE INFORMATION"
      onStopJourney={onStopJourney}
    >
      <Narration paragraphs={stop.narration} />

      {offer && (
        <>
          <div className="detourCard">
            <p className="startCardLabel">{offer.label}</p>
            <p className="detourCardText">{offer.text}</p>
            <button className="introBtn isGhost" onClick={onSeeDetours}>
              SEE DETOURS ➜
            </button>
          </div>
          <p className="detourSkip">{offer.skip}</p>
        </>
      )}

      <button className="introBtn" onClick={onContinue}>
        {continueLabel}
      </button>
    </StopScreen>
  )
}

// The detours you can take from a stop, each with its photo, what it's
// about, and TAKE THIS DETOUR. Ones already taken on this run of the journey
// (their ids are in `done`) are greyed out. CONTINUE skips the rest.
export function DetoursPage({ from, done, onTakeDetour, onContinue, onStopJourney }) {
  const count = from.detours.length
  const anyTaken = from.detours.some((detour) => done.includes(detour.id))

  let intro
  if (count === 1) {
    intro = `A short side trip from ${from.name}, if you’re curious.`
  } else {
    const howMany = numberWord(count)
    intro = `${howMany[0].toUpperCase() + howMany.slice(1)} short side trips from ${from.name}. `
    intro += count === 2 ? 'Take one, both, or neither.' : 'Take as many as you like, or none.'
  }

  return (
    <div className="detoursPage">
      <Header />
      <div className="pageBody">
        <SectionHeader text="Detours" />
        <p className="detoursIntro">{intro}</p>

        {from.detours.map((detour) => {
          const taken = done.includes(detour.id)
          return (
            <div key={detour.id} className={taken ? 'detourOption isTaken' : 'detourOption'}>
              <div className="detourOptionPhoto">
                <img src={detour.photo} alt={detour.photoAlt} style={{ objectPosition: detour.photoPosition }} />
                {taken && <p className="detourTakenTag">✓ VISITED</p>}
                <h2 className="heroTitle">{detour.name}</h2>
              </div>
              <div className="detourOptionBody">
                <p className="detourOptionTeaser">{detour.teaser}</p>
                {taken ? (
                  <button className="introBtn isDone" disabled>
                    DETOUR TAKEN
                  </button>
                ) : (
                  <button className="introBtn" onClick={() => onTakeDetour(detour)}>
                    TAKE THIS DETOUR ➜
                  </button>
                )}
              </div>
            </div>
          )
        })}

        <p className="detourSkip">
          {anyTaken ? 'Or head back to the route.' : 'Or skip the detours and keep going.'}
        </p>
        <button className="introBtn isGhost" onClick={onContinue}>
          CONTINUE ➜
        </button>

        <button className="backBtn pageEndLink" onClick={onStopJourney}>
          STOP JOURNEY
        </button>
      </div>
    </div>
  )
}
