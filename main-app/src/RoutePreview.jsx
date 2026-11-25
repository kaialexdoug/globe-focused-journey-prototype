import { ClockIcon, RouteIcon, WalkIcon } from './Icons.jsx'
import {
  durationText,
  hoursText,
  journeyHours,
  metersText,
  stayRangeText,
  rideTotals,
  walkingTotals,
} from './journeyTimes.js'
import RouteMap from './RouteMap.jsx'
import { useUnits } from './units.js'

// The whole journey before you start, in the Route tab on a journey's page
// (JourneyPage.jsx), so you know how much walking is ahead: each stop in
// order, in a card of its own with a little photo beside its name and the
// time to spend there, and between the cards, on the line joining them, how
// far it is to the next, how you get there, how long it takes, and how hard
// it is. The first stop is where you start, with the area and the note about
// getting there. Any detours are in the card of the stop they branch off. At
// the bottom, the walking altogether, and the whole journey's time, then the
// route on a map (RouteMap.jsx), if every stop has its exact spot.
//
// The map counts as a map load, so it's only there once the Route tab's been
// opened, and only loads once it's scrolled close to (RouteMap.jsx).
//
// It needs the walk to every stop (`distanceMeters` and `effort` on each
// stop's card), which every journey has (hasRoutePreview in journeyTimes.js).
// One without it gets just where to start instead (JourneyPage.jsx).

// How hard the walk to a stop is.
const EFFORT_LABELS = { easy: 'Easy', moderate: 'Moderate', hard: 'Hard' }

// How you get to a stop, after how long it takes: "21 min walk".
const TRAVEL_WORDS = { walking: 'walk', transit: 'by train', driving: 'drive', bicycling: 'by bike' }

// The rest of the way, besides walking: "by car", or "by car and train".
const RIDE_WORDS = { driving: 'car', transit: 'train', bicycling: 'bike' }
function rideWords(modes) {
  return `by ${modes.map((mode) => RIDE_WORDS[mode]).join(' and ')}`
}

// What that time is: "of driving", or "on the train".
const RIDE_TIME_WORDS = { driving: 'of driving', transit: 'on the train', bicycling: 'on the bike' }
function rideTimeWords(modes) {
  return modes.length === 1 ? RIDE_TIME_WORDS[modes[0]] : 'on the way'
}

function RouteDetails({ journey }) {
  const units = useUnits()
  const walking = walkingTotals(journey)
  const ride = rideTotals(journey)
  const hours = hoursText(journeyHours(journey))
  return (
    <>
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
        <p className="startCardLabel">Altogether</p>
        <div className="startCardRow">
          <WalkIcon />
          <div>
            <p className="routeTotal">{metersText(walking.meters, units)} of walking</p>
            <p className="routeTotalNote">About {durationText(walking.minutes)} on foot</p>
          </div>
        </div>
        {/* On a journey that isn't all on foot, the rest of the way. */}
        {ride && (
          <div className="startCardRow">
            <RouteIcon />
            <div>
              <p className="routeTotal">
                {metersText(ride.meters, units)} {rideWords(ride.modes)}
              </p>
              <p className="routeTotalNote">
                About {durationText(ride.minutes)} {rideTimeWords(ride.modes)}
              </p>
            </div>
          </div>
        )}
        <div className="startCardRow">
          <ClockIcon />
          <div>
            <p className="routeTotal">{hours} in all</p>
            <p className="routeTotalNote">
              {ride ? 'Getting around' : 'The walking'} and the time at each stop. Detours are extra.
            </p>
          </div>
        </div>
      </div>

      <RouteMap journey={journey} />
    </>
  )
}

// The walk (or ride) on to the next stop, `to`: how far, how long, and how hard.
function RouteLeg({ to }) {
  const units = useUnits()
  const level = to.effort.level
  return (
    <div className="routeLeg">
      <p className="routeLegWay">
        {to.travelMode === 'walking' ? <WalkIcon /> : <RouteIcon />}
        {metersText(to.distanceMeters, units)} · {durationText(to.travelMinutes)} {TRAVEL_WORDS[to.travelMode]}
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
  const units = useUnits()
  const extra =
    typeof detour.extraMeters === 'number'
      ? `+${metersText(detour.extraMeters, units)} of walking`
      : `${metersText(detour.distanceMeters, units)} away`
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

export default RouteDetails
