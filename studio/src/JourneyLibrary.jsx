import { useState } from 'react'
import DeleteJourneyDialog from './DeleteJourneyDialog.jsx'
import { PencilIcon, PlusIcon, SearchIcon, TrashIcon } from './Icons.jsx'
import JourneyNameDialog from './JourneyNameDialog.jsx'
import { DEFAULT_NAME, madeInStudio, stopsOf } from './journeyStore.js'
import { matchJourney, searchWords } from './search.js'

// The studio's home screen: every journey, with a search bar above them that
// finds a journey by its name or by any of its stops' names. Create new
// journey asks for a name, then `onCreate` makes it. Edit on a journey opens
// it, with `onOpen`. Delete asks if you're sure, then `onDelete` deletes it.
export default function JourneyLibrary({ journeys, onCreate, onOpen, onDelete }) {
  const [query, setQuery] = useState('')
  const [creating, setCreating] = useState(false)
  // The journey whose Delete was pressed, while the box asks if you're sure.
  const [deleting, setDeleting] = useState(null)

  const words = searchWords(query)
  const results = journeys
    .map((journey) => {
      const stops = stopsOf(journey)
      return { journey, stops, match: matchJourney(journey, words, stops) }
    })
    .filter((result) => result.match)

  let count = `${journeys.length} ${journeys.length === 1 ? 'journey' : 'journeys'}`
  if (words.length > 0) {
    count = `${results.length} of ${count}`
  }

  return (
    <main className="library">
      <div className="libraryHead">
        <h1 className="libraryTitle">Journey Library</h1>
        <p className="libraryCount">{count}</p>
      </div>

      <label className="librarySearch">
        <SearchIcon />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by journey or step name"
          aria-label="Search journeys by journey or step name"
          autoFocus
        />
      </label>

      <button className="libraryCreate" onClick={() => setCreating(true)}>
        <PlusIcon />
        Create new journey
      </button>
      {creating && (
        <JourneyNameDialog
          title="New journey"
          startName={DEFAULT_NAME}
          blankName={DEFAULT_NAME}
          confirmLabel="Create journey"
          onConfirm={onCreate}
          onCancel={() => setCreating(false)}
        />
      )}
      {deleting && (
        <DeleteJourneyDialog
          journey={deleting}
          canDelete={madeInStudio(deleting)}
          onDelete={() => {
            onDelete(deleting.id)
            setDeleting(null)
          }}
          onCancel={() => setDeleting(null)}
        />
      )}

      {results.length > 0 ? (
        <ul className="libraryList">
          {results.map(({ journey, stops, match }) => (
            <JourneyRow
              key={journey.id}
              journey={journey}
              stops={stops}
              pointedOut={match.stopIds}
              onEdit={() => onOpen(journey.id)}
              onDelete={() => setDeleting(journey)}
            />
          ))}
        </ul>
      ) : (
        <div className="libraryEmpty">
          <p className="libraryEmptyTitle">No journeys match “{query.trim()}”</p>
          <p>Try the name of a journey, or of a step on one.</p>
          <button className="libraryClear" onClick={() => setQuery('')}>
            Clear search
          </button>
        </div>
      )}
    </main>
  )
}

// One journey in the list: its photo, name and basic facts, and its stops in
// order, with its label and its Delete and Edit buttons down the right-hand
// side. A new journey has none of those yet, so it says so instead.
// `pointedOut` is the ids of stops to pick out, because they're why it came up
// in a search.
function JourneyRow({ journey, stops, pointedOut, onEdit, onDelete }) {
  const facts = [journey.startArea, journey.time, journey.difficulty].filter(Boolean)

  return (
    <li className="libraryRow">
      {journey.photo ? (
        <img className="libraryPhoto" src={journey.photo} alt="" style={{ objectPosition: journey.photoPosition }} />
      ) : (
        <div className="libraryPhoto isEmpty">No photo yet</div>
      )}
      <div className="libraryWords">
        <h2 className="libraryName">{journey.name}</h2>
        {journey.blurb && <p className="libraryBlurb">{journey.blurb}</p>}
        <p className="libraryFacts">{facts.length > 0 ? facts.join(' · ') : 'Nothing filled in yet'}</p>

        {stops.main.length === 0 && <p className="libraryNoStops">No steps yet</p>}
        <ol className="libraryStops" aria-label="Steps">
          {stops.main.map(({ stop, part }, index) => (
            <li key={stop.id} className="libraryStopItem">
              {index > 0 && (
                <span className="libraryArrow" aria-hidden="true">
                  →
                </span>
              )}
              <StopChip stop={stop} tag={part === 'peak' ? 'Peak' : null} pointedOut={pointedOut} />
            </li>
          ))}
        </ol>
        {stops.detours.length > 0 && (
          <ul className="libraryStops libraryDetours" aria-label="Detours">
            {stops.detours.map(({ stop }) => (
              <li key={stop.id} className="libraryStopItem">
                <StopChip stop={stop} tag="Detour" pointedOut={pointedOut} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="librarySide">
        {journey.verified && <span className="libraryLabel isVerified">UNFOLD VERIFIED</span>}
        {journey.aiMade && <span className="libraryLabel">AI GENERATED</span>}
        {journey.draft && <span className="libraryLabel isDraft">DRAFT</span>}
        <div className="libraryButtons">
          <button className="libraryDelete" onClick={onDelete} aria-label={`Delete ${journey.name}`}>
            <TrashIcon />
            Delete
          </button>
          <button className="libraryEdit" onClick={onEdit} aria-label={`Edit ${journey.name}`}>
            <PencilIcon />
            Edit
          </button>
        </div>
      </div>
    </li>
  )
}

function StopChip({ stop, tag, pointedOut }) {
  let className = 'libraryStop'
  if (tag === 'Peak') {
    className += ' isPeak'
  } else if (tag === 'Detour') {
    className += ' isDetour'
  }
  if (pointedOut.includes(stop.id)) {
    className += ' isFound'
  }
  return (
    <span className={className}>
      {tag && <span className="libraryStopTag">{tag}</span>}
      {stop.name}
    </span>
  )
}
