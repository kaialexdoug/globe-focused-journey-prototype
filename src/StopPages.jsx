import { useEffect, useState } from 'react'

import { PhotoHero } from './Header.jsx'
import Narration from './Narration.jsx'

// The two screens every stop on the journey uses. Each one is filled in from
// the stop's card in journeyStops.js.

const API_KEY = "AIzaSyDZjr1gJKoiUhpzva9V5SBzekO-yqxXDbo"

// The stop's photo across the top of the screen, with its heading, label and
// name on it.
function StopHero({ stop, heading, label, size }) {
  return (
    <PhotoHero
      photo={stop.photo}
      photoAlt={stop.photoAlt}
      photoPosition={stop.photoPosition}
      kicker={heading}
      label={label}
      title={stop.name}
      size={size}
    />
  )
}

// Getting there: the stop, then a map from wherever you are to it.
export function DirectionsPage({ stop, onImHere, onStopJourney }) {
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
    mapSrc = `https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${origin.lat},${origin.lng}&destination=${place}&mode=${stop.travelMode}`
  } else if (locationFailed) {
    mapSrc = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${place}`
  }

  return (
    <div className="directionsPage">
      {/* Kept short, so the map and I'M HERE fit without scrolling. */}
      <StopHero
        stop={stop}
        heading={stop.directionsHeading}
        label={stop.directionsLabel}
        size="isShort"
      />
      <div className="pageBody">
        {mapSrc ? (
          <>
            {locationFailed && (
              <p className="mapNote">
                We couldn't find your location — here's {stop.name}.
              </p>
            )}
            <div className="mapContainer">
              <iframe
                title={`Map to ${stop.name}`}
                loading="lazy"
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

        <button className="backBtn pageEndLink" onClick={onStopJourney}>
          STOP JOURNEY
        </button>
      </div>
    </div>
  )
}

// Being there: the stop again, then its narration.
export function ArrivedPage({ stop, onContinue, onStopJourney }) {
  return (
    <div className="arrivedPage">
      <StopHero stop={stop} heading={stop.arrivedHeading} label={stop.arrivedLabel} />
      <div className="pageBody">
        <Narration paragraphs={stop.narration} />

        <button className="introBtn" onClick={onContinue}>
          CONTINUE ➜
        </button>

        <button className="backBtn pageEndLink" onClick={onStopJourney}>
          STOP JOURNEY
        </button>
      </div>
    </div>
  )
}
