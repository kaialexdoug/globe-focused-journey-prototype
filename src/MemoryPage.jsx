import { PhotoHero } from './Header.jsx'
import { ClockIcon, PinIcon, RouteIcon } from './Icons.jsx'
import { SignUpCard } from './ProfilePages.jsx'

// The end of the journey: the day told as a short story, then a timeline of
// every stop with its detours branching off. Detours you skipped are still
// there, greyed out. Everything comes from the journey's card in
// journeyStops.js; `detoursTaken` is the ids of the detours you took.

// The line about detours that ends the story's build paragraph.
function detourLine(story, allDetours, taken) {
  if (taken.length === 0) {
    return story.detours.none
  }
  if (taken.length === allDetours.length && story.detours.all) {
    return story.detours.all
  }
  if (taken.length === 1 && story.detours[taken[0]]) {
    return story.detours[taken[0]]
  }
  return `You took ${taken.length} of the detours along the way.`
}

// One stop on the timeline: its dot on the line, a photo, its phase, name and
// a line about it.
function TimelineStop({ stop, phase, className, style }) {
  return (
    <li className={className ? `timelineStop ${className}` : 'timelineStop'} style={style}>
      <span className="timelineDot" aria-hidden="true"></span>
      <img
        className="timelinePhoto"
        src={stop.photo}
        alt=""
        style={{ objectPosition: stop.photoPosition }}
      />
      <div className="timelineText">
        <p className="timelinePhase">{phase}</p>
        <p className="timelineName">{stop.name}</p>
        <p className="timelineNote">{stop.memory}</p>
      </div>
    </li>
  )
}

// Straight after finishing, it offers the survey (`onSurvey`) and, without a
// profile, to make one (`onCreateProfile`). Looking back from My Journeys,
// it's just the memory. `doneLabel` and `onDone` are the way out.
function MemoryPage({ journey, detoursTaken, profileName, onCreateProfile, onSurvey, doneLabel, onDone }) {
  const allDetours = journey.route.flatMap((stop) => stop.detours ?? [])
  const taken = allDetours.filter((detour) => detoursTaken.includes(detour.id)).map((detour) => detour.id)
  const stopCount = journey.route.length + taken.length
  const story = journey.story

  // The timeline, top to bottom: each stop, and after any stop with detours,
  // a branch holding them.
  const entries = []
  for (const stop of journey.route) {
    entries.push({ stop })
    if (stop.detours) {
      entries.push({ detours: stop.detours })
    }
  }

  return (
    <div className="memoryPage">
      <PhotoHero
        photo={journey.photo}
        photoAlt={journey.photoAlt}
        kicker="Memory"
        label="JOURNEY COMPLETE"
        title={journey.name}
        size="isTall"
      />

      <div className="pageBody">
        <p className="heroTagline">You made it to the end. Here’s the day you had.</p>

        <div className="factsRow">
          <span className="fact">
            <PinIcon />
            {stopCount} stops
          </span>
          <span className="fact">
            <RouteIcon />
            {taken.length === 0 ? 'No detours' : `${taken.length} ${taken.length === 1 ? 'detour' : 'detours'}`}
          </span>
          <span className="fact">
            <ClockIcon />
            {journey.time}
          </span>
        </div>

        <div className="memoryStory">
          <p>{story.opening}</p>
          <p>
            {story.build} {detourLine(story, allDetours, taken)}
          </p>
          <p className="memoryStoryPeak">{story.peak}</p>
          <p>{story.ending}</p>
        </div>

        <h2 className="sectionTitle">Your route</h2>
        <ol className="memoryTimeline">
          {entries.map((entry, index) =>
            entry.detours ? (
              <li key={`branch${index}`} className="timelineBranch" style={{ '--i': index }}>
                <ol>
                  {entry.detours.map((detour) => {
                    const took = taken.includes(detour.id)
                    return (
                      <TimelineStop
                        key={detour.id}
                        stop={detour}
                        phase={took ? 'Detour' : 'Detour · skipped'}
                        className={took ? 'isDetour' : 'isDetour isSkipped'}
                      />
                    )
                  })}
                </ol>
              </li>
            ) : (
              <TimelineStop
                key={entry.stop.id}
                stop={entry.stop}
                phase={entry.stop === journey.peak ? 'The peak' : entry.stop.directionsHeading}
                className={entry.stop === journey.peak ? 'isPeak' : ''}
                style={{ '--i': index }}
              />
            )
          )}
        </ol>

        <div className="divider sectionBreak"></div>

        {onCreateProfile && (
          <SignUpCard
            label="SAVE THIS JOURNEY"
            text="Add your name to make a profile, and this journey will be kept in My Journeys, with your traveler type and stats. No password needed."
            onCreate={onCreateProfile}
          />
        )}
        {!onCreateProfile && profileName && onSurvey && (
          <p className="savedNote">✓ Saved to {profileName}’s profile</p>
        )}

        {onSurvey && (
          <button className="introBtn" onClick={onSurvey}>
            TAKE THE SURVEY ➜
          </button>
        )}
        <button className="introBtn isGhost" onClick={onDone}>
          {doneLabel}
        </button>
      </div>
    </div>
  )
}

export default MemoryPage
