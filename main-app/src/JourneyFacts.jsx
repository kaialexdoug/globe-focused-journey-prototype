import { ClockIcon, RouteIcon, SolidWalkIcon } from './Icons.jsx'
import { EXPERIENCE_ICONS, mainExperience } from './experienceIcons.js'

// A journey's facts, after the feed's mockup: how long, how hard and what
// kind ("3–4 hrs", "Easy", "Hidden Gems"), each a soft orange symbol over its
// value, side by side with a faint line between them. On Home's feed
// (HomePage in App.jsx), and with `withStops` its number of stops too, at the
// top of the Overview on a journey's page (JourneyPage.jsx).
function JourneyFacts({ journey, withStops = false }) {
  const kind = mainExperience(journey)
  const facts = [
    { Icon: ClockIcon, value: journey.time.replace('hours', 'hrs') },
    { Icon: SolidWalkIcon, value: journey.difficulty },
    withStops && { Icon: RouteIcon, value: `${journey.route.length} stops` },
    { Icon: EXPERIENCE_ICONS[kind], value: kind },
  ].filter(Boolean)
  return (
    <div className="feedFacts">
      {facts.map(({ Icon, value }) => (
        <div className="feedFact" key={value}>
          <Icon className="feedFactIcon" />
          <p className="feedFactValue">{value}</p>
        </div>
      ))}
    </div>
  )
}

export default JourneyFacts
