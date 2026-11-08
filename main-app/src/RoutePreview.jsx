import { useState } from 'react'

import { ChevronRightIcon, ClockIcon, RouteIcon, WalkIcon } from './Icons.jsx'
import {
  durationText,
  hoursText,
  journeyHours,
  metersText,
  stayRangeText,
  walkingTotals,
} from './journeyTimes.js'
import RouteMap from './RouteMap.jsx'

// The whole journey before you start, on See Your Journey, so you know how
// much walking is ahead: each stop in order, in a card of its own with a
// little photo beside its name and the time to spend there, and between the
// cards, on the line joining them, how far it is to the next, how you get
// there, how long it takes, and how hard it is. The first stop is where you
// start, so it takes the place of START HERE, with the area and the note
// about getting there. Any detours are in the card of the stop they branch
// off. At the bottom, the walking altogether, and the whole journey's time,
// then the route on a map (RouteMap.jsx), if every stop has its exact spot.
//
// It's all folded away behind a bar, SHOW ROUTE DETAILS, with the number of
// stops, the walking and the time on it, and unfolds when the bar's tapped.
//
// It needs the walk to every stop (`distanceMeters` and `effort` on each
// stop's card), which only some journeys have so far (hasRoutePreview in
// journeyTimes.js).

// How hard the walk to a stop is.
const EFFORT_LABELS = { easy: 'Easy', moderate: 'Moderate', hard: 'Hard' }

// How you get to a stop, after how long it takes: "21 min walk".
const TRAVEL_WORDS = { walking: 'walk', transit: 'by train', driving: 'drive', bicycling: 'by bike' }

function RoutePreview({ journey }) {
  const walking = walkingTotals(journey)
  const hours = hoursText(journeyHours(journey))
  const [open, setOpen] = useState(false)
  // The map only loads once it's first opened, then stays.
  const [opened, setOpened] = useState(false)

  function toggle() {
    setOpen(!open)
    setOpened(true)
  }

  return (
    <section className="routePreview" aria-labelledby="routePreviewTitle">
      <h2 className="routeFoldHeading" id="routePreviewTitle">
        <button
          className={open ? 'routeFoldBar isOpen' : 'routeFoldBar'}
          onClick={toggle}
          aria-expanded={open}
          aria-controls="routeFold"
        >
          <RouteIcon className="routeFoldIcon" />
          <span className="routeFoldText">
            <span className="routeFoldTitle">{open ? 'Hide route details' : 'Show route details'}</span>
            <span className="routeFoldSummary">
              {journey.route.length} stops · {metersText(walking.meters)} on foot · {hours}
            </span>
          </span>
          <ChevronRightIcon className="routeFoldChevron" />
        </button>
      </h2>

      {/* Folded away until it's opened: out of reach (inert) while it is. */}
      <div className={open ? 'routeFold isOpen' : 'routeFold'} id="routeFold" inert={!open}>
        <div className="routeFoldInner">
          <ol className="routeStops">
            {journey.route.map((stop, index) => {
              const next = journey.route[index + 1]
              const start = index === 0
              return (
                <li key={stop.id} className="routeStop">
                  <div className="routeStopCard">
                    <span className="routeNumber" aria-hidden="true">
                      {index + 1}
                    </span>
                    <div className="routeStopBody">
                      <div className="routeStopHead">
                        <div>
                          <p className="routePart">{start ? 'Start here · Departure' : stop.directionsHeading}</p>
                          <h3 className="routeName">{stop.name}</h3>
                          {start && <p className="routeStartArea">{journey.startArea}</p>}
                          <p className="routeStay">
                            <ClockIcon />
                            Stay about {stayRangeText(stop)}
                          </p>
                        </div>
                        <Thumbnail stop={stop} />
                      </div>
                      {start && <p className="routeStartNote">{journey.startNote}</p>}
                      {stop.detours?.map((detour) => (
                        <RouteDetour key={detour.id} detour={detour} />
                      ))}
                    </div>
                  </div>
                  {next && <RouteLeg to={next} />}
                </li>
              )
            })}
          </ol>

          <div className="startCard routeTotals">
            <p className="startCardLabel">ALTOGETHER</p>
            <div className="startCardRow">
              <WalkIcon />
              <div>
                <p className="routeTotal">{metersText(walking.meters)} of walking</p>
                <p className="routeTotalNote">About {durationText(walking.minutes)} on foot</p>
              </div>
            </div>
            <div className="startCardRow">
              <ClockIcon />
              <div>
                <p className="routeTotal">{hours} in all</p>
                <p className="routeTotalNote">The walking and the time at each stop. Detours are extra.</p>
              </div>
            </div>
          </div>

          {opened && <RouteMap journey={journey} />}
        </div>
      </div>
    </section>
  )
}

// The walk (or ride) on to the next stop, `to`: how far, how long, and how hard.
function RouteLeg({ to }) {
  const level = to.effort.level
  return (
    <div className="routeLeg">
      <p className="routeLegWay">
        {to.travelMode === 'walking' ? <WalkIcon /> : <RouteIcon />}
        {metersText(to.distanceMeters)} · {durationText(to.travelMinutes)} {TRAVEL_WORDS[to.travelMode]}
      </p>
      <p className="routeLegEffort">
        <span className={`routeEffort is-${level}`}>{EFFORT_LABELS[level]}</span>
        {to.effort.note}
      </p>
    </div>
  )
}

// A detour off a stop: what it is, how much further it makes the walk, and
// the time to spend there.
function RouteDetour({ detour }) {
  const extra =
    typeof detour.extraMeters === 'number'
      ? `+${metersText(detour.extraMeters)} of walking`
      : `${metersText(detour.distanceMeters)} away`
  return (
    <div className="routeDetour">
      <div className="routeStopHead">
        <div>
          <p className="routePart">Optional detour</p>
          <p className="routeDetourName">{detour.name}</p>
          <p className="routeDetourFacts">
            {extra} · stay about {stayRangeText(detour)}
          </p>
        </div>
        <Thumbnail stop={detour} small />
      </div>
    </div>
  )
}

// A little photo of a stop, beside its name. It's just a glimpse of the place,
// so it's left out for screen readers, which read the name.
function Thumbnail({ stop, small = false }) {
  return (
    <img
      className={small ? 'routeThumb isSmall' : 'routeThumb'}
      src={stop.photo}
      alt=""
      style={{ objectPosition: stop.photoPosition }}
      loading="lazy"
    />
  )
}

export default RoutePreview
