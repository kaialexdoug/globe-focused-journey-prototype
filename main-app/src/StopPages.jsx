import { useEffect, useMemo, useRef, useState } from 'react'

import Header, { SectionHeader } from './Header.jsx'
import { ChevronRightIcon, ClockIcon, NavigateIcon, PinIcon } from './Icons.jsx'
import LiveMap from './LiveMap.jsx'
import Narration from './Narration.jsx'
import PhotoScreen from './PhotoScreen.jsx'
import { MAPS_API_KEY } from './config.js'
import { detourAddsText, stayText } from './journeyTimes.js'

// The two screens every stop on the journey uses, and the Detours page for a
// stop with detours. Each one is filled in from the cards in journeyStops.js.

// "Two short side trips", "one more detour", and so on.
const NUMBER_WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

function numberWord(count) {
  return NUMBER_WORDS[count] ?? String(count)
}

// A stop: its photo across the top, with ✕ for stopping the journey, then its
// heading and which step of the journey it is ("Discovery · Step 2 of 5"),
// its label and its name. What to do there (`children`) is under that, and
// scrolls. A detour isn't one of the journey's steps, so it just says Detour.
function StopScreen({ className, journey, stop, heading, label, onStopJourney, children }) {
  const step = journey.route.indexOf(stop)
  const kicker = step === -1 ? heading : `${heading} · Step ${step + 1} of ${journey.route.length}`

  return (
    <PhotoScreen
      className={className}
      photo={stop.photo}
      photoAlt={stop.photoAlt}
      photoPosition={stop.photoPosition}
      kicker={kicker}
      label={label}
      title={stop.name}
      onClose={onStopJourney}
      closeLabel="Stop journey"
    >
      {children}
    </PhotoScreen>
  )
}

// The same route in Google Maps itself (its app, if it's on the phone), with
// turn-by-turn directions. Google Maps finds where you are on its own.
function googleMapsUrl(stop) {
  const params = new URLSearchParams({ api: '1', destination: stop.mapPlace, travelmode: stop.travelMode })
  return `https://www.google.com/maps/dir/?${params}`
}

// The simpler map, Google's embedded one: the route from where you were
// when it opened, without following you. For stops without an exact spot on
// their card, and whenever the live map can't load.
function EmbedMap({ stop }) {
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

  if (!mapSrc) {
    // The same size as the map, so nothing jumps when it arrives.
    return (
      <div className="mapPlaceholder" role="status">
        Loading your location and map…
      </div>
    )
  }

  return (
    <>
      {locationFailed && (
        <p className="mapNote">
          We couldn't find your location — here's {stop.name}.
        </p>
      )}
      <div className="mapContainer">
        <iframe
          title={`Map to ${stop.name}`}
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          src={mapSrc}>
        </iframe>
      </div>
    </>
  )
}

// Getting there: the stop, then a map from wherever you are to it, and the
// way to follow it in Google Maps itself. The map's the live one, following
// you, if the stop's card has its exact spot (and it loads). A detour also
// gets SKIP THIS DETOUR (with `onSkip`), for changing your mind.
export function DirectionsPage({ journey, stop, onImHere, onSkip, onStopJourney }) {
  const [liveFailed, setLiveFailed] = useState(false)
  const live = Boolean(stop.mapPoint) && !liveFailed

  return (
    <StopScreen
      className="directionsPage"
      journey={journey}
      stop={stop}
      heading={stop.directionsHeading}
      label={stop.directionsLabel}
      onStopJourney={onStopJourney}
    >
      {live ? <LiveMap stop={stop} onFail={() => setLiveFailed(true)} /> : <EmbedMap stop={stop} />}

      <a
        className="introBtn isGhost hasIcon mapsLink"
        href={googleMapsUrl(stop)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <NavigateIcon />
        OPEN IN GOOGLE MAPS
      </a>
      <button className="introBtn" onClick={onImHere}>I'M HERE</button>

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
  const left = detoursLeft.length
  if (stop.detoursNote) {
    return {
      label: left === 1 ? 'OPTIONAL DETOUR' : 'OPTIONAL DETOURS',
      text: stop.detoursNote,
      skip: `Or you can skip ${left === 1 ? 'it' : 'them'} and keep going.`,
    }
  }
  return {
    label: left === 1 ? 'ONE MORE DETOUR' : 'MORE DETOURS',
    text:
      left === 1
        ? `There’s one more detour from ${detoursFrom.name}, if you’re up for it.`
        : `There are ${numberWord(left)} more detours from ${detoursFrom.name}, if you’re up for it.`,
    skip: `Or skip ${left === 1 ? 'it' : 'them'} and head back to the route.`,
  }
}

// The suggested time to spend at a stop, after its narration: a guide for
// planning the day, worded so it doesn't hurry anyone.
function StayCard({ stop }) {
  return (
    <div className="startCard stayCard">
      <p className="startCardLabel">SUGGESTED TIME HERE</p>
      <div className="startCardRow">
        <ClockIcon />
        <div>
          <p className="startCardName">{stayText(stop)}</p>
          <p className="startCardNote">Just a guide for planning your day. There’s no rush.</p>
        </div>
      </div>
    </div>
  )
}

// About how far a nearby spot is: "about 350 m away", or "about 1.5 km away".
function distanceText(meters) {
  if (meters < 1000) {
    return `about ${Math.max(50, Math.round(meters / 50) * 50)} m away`
  }
  return `about ${Math.round(meters / 100) / 10} km away`
}

// Interesting spots close to a stop (`nearby` on its card), after the
// suggested time: each one's name, how far it is, and what it is.
//
// If every spot has a photo and its exact spot (`photo` and `mapPoint`, as on
// the Waseda, Miami Beach and Nassau journeys), each is a card with
// directions to it (NearbyCard), and only one card's map is open at a time.
// Otherwise it's a simple list.
function NearbySpots({ spots }) {
  const [openSpot, setOpenSpot] = useState(null)
  const asCards = spots.every((spot) => spot.photo && spot.mapPoint)

  return (
    <div className="nearby">
      <p className="startCardLabel">{spots.length === 1 ? 'INTERESTING SPOT NEARBY' : 'INTERESTING SPOTS NEARBY'}</p>
      {asCards ? (
        <div className="nearbyCards">
          {spots.map((spot) => (
            <NearbyCard
              key={spot.name}
              spot={spot}
              open={openSpot === spot.name}
              onToggle={() => setOpenSpot(openSpot === spot.name ? null : spot.name)}
            />
          ))}
        </div>
      ) : (
        <ul className="nearbyList">
          {spots.map((spot) => (
            <li key={spot.name}>
              <p className="nearbyName">
                {spot.name} <span className="nearbyDistance">{distanceText(spot.meters)}</span>
              </p>
              <p className="nearbyNote">{spot.note}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// A nearby spot as a card, like a small one from Journeys for You: its photo,
// with its name and how far it is along the bottom, then what it is. SEE
// DIRECTIONS opens the live map under it, from wherever you are to the spot
// (or the embedded map, if the live one can't load), and HIDE DIRECTIONS
// closes it again. Open in Google Maps is there too, for turn-by-turn
// directions. Like a stop's map, each opening counts as a Google map load.
function NearbyCard({ spot, open, onToggle }) {
  const mapRef = useRef(null)
  const [liveFailed, setLiveFailed] = useState(false)
  // The spot as the maps take a stop: somewhere to walk to. Kept the same
  // between renders, so the live map doesn't start again.
  const place = useMemo(() => ({ ...spot, travelMode: 'walking' }), [spot])

  // Brought into view when it opens, as it can open below the screen.
  useEffect(() => {
    if (open) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      mapRef.current?.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' })
    }
  }, [open])

  const distance = distanceText(spot.meters)

  return (
    <div className="nearbyCard">
      <div className="nearbyCardPhoto">
        <img src={spot.photo} alt={spot.photoAlt ?? ''} style={{ objectPosition: spot.photoPosition }} loading="lazy" />
        <p className="nearbyCardName">{spot.name}</p>
        <p className="nearbyCardDistance">
          <PinIcon />
          {distance[0].toUpperCase() + distance.slice(1)}
        </p>
      </div>
      <p className="nearbyCardNote">{spot.note}</p>
      <div className="nearbyCardActions">
        <button className={open ? 'nearbyDirections isOpen' : 'nearbyDirections'} onClick={onToggle} aria-expanded={open}>
          {open ? 'HIDE DIRECTIONS' : 'SEE DIRECTIONS'}
          <ChevronRightIcon />
        </button>
        <a className="nearbyMapsLink" href={googleMapsUrl(place)} target="_blank" rel="noopener noreferrer">
          <NavigateIcon />
          Open in Google Maps
        </a>
      </div>
      {open && (
        <div className="nearbyMap" ref={mapRef}>
          {liveFailed ? <EmbedMap stop={place} /> : <LiveMap stop={place} onFail={() => setLiveFailed(true)} />}
        </div>
      )}
    </div>
  )
}

// How much longer the detours on offer would make the day: "Adds about 45 min".
function DetourAdds({ detours }) {
  return (
    <p className="detourAdds">
      <ClockIcon />
      {detourAddsText(detours)}
    </p>
  )
}

// Being there: the stop again, then its narration, the suggested time to
// spend there, and any interesting spots nearby. If there are detours to offer (`detoursLeft`, the ones not
// taken yet), they come next, saying how much time they'd add, with CONTINUE
// underneath for skipping them. On a detour, `detoursFrom` is the stop the
// detours belong to. The last stop says FINISH JOURNEY instead of CONTINUE
// (`continueLabel`).
export function ArrivedPage({
  journey,
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
      journey={journey}
      stop={stop}
      heading={stop.arrivedHeading}
      label={stop.arrivedLabel}
      onStopJourney={onStopJourney}
    >
      <Narration paragraphs={stop.narration} />

      {stop.stayMinutes && <StayCard stop={stop} />}

      {stop.nearby?.length > 0 && <NearbySpots spots={stop.nearby} />}

      {offer && (
        <>
          <div className="detourCard">
            <p className="startCardLabel">{offer.label}</p>
            <p className="detourCardText">{offer.text}</p>
            <DetourAdds detours={detoursLeft} />
            <button className="introBtn isGhost" onClick={onSeeDetours}>
              {detoursLeft.length === 1 ? 'SEE DETOUR ➜' : 'SEE DETOURS ➜'}
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
// about, how much time it adds, and TAKE THIS DETOUR. Ones already taken on
// this run of the journey (their ids are in `done`) are greyed out. CONTINUE
// skips the rest.
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
                {!taken && <DetourAdds detours={[detour]} />}
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
