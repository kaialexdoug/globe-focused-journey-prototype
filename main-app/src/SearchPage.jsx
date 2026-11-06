import { useLayoutEffect, useRef } from 'react'

import { MatchCard } from './FindMyJourney.jsx'
import Header from './Header.jsx'
import { ArrowLeftIcon, CloseIcon, SearchIcon } from './Icons.jsx'
import { searchJourneys } from './journeySearch.js'

// Search, from the magnifying glass on Home. Type a journey's name, where it
// is, or the name of a stop on it, and the journeys that match show as you
// type, as the same cards as Journeys for You, without the match. A journey
// found by one of its stops says which stop on its card. With nothing typed,
// it's every journey.
//
// `query` is kept by App, along with how far down you were (`positionRef`), so
// both are as you left them when you come back from a journey.
function SearchPage({ journeys, query, onQueryChange, likes, positionRef, onSelect, onToggleLike, onBack }) {
  const pageRef = useRef(null)
  const inputRef = useRef(null)

  // Before it's drawn, so the top of the list doesn't flash up on the way.
  useLayoutEffect(() => {
    const screen = pageRef.current.closest('.screen')
    screen.scrollTop = positionRef.current

    function rememberPosition() {
      positionRef.current = screen.scrollTop
    }
    screen.addEventListener('scroll', rememberPosition, { passive: true })
    return () => screen.removeEventListener('scroll', rememberPosition)
  }, [positionRef])

  const typed = query.trim()
  const results = searchJourneys(journeys, query)

  let count
  if (!typed) {
    count = `All ${journeys.length} journeys`
  } else if (results.length === 0) {
    count = `No journeys match “${typed}”`
  } else {
    count = results.length === 1 ? '1 journey' : `${results.length} journeys`
  }

  return (
    <div className="stepPage searchPage" ref={pageRef}>
      {/* The header, the title and the search box stay at the top as the
          results scroll up under them. */}
      <div className="searchTop">
        <div className="stepBar">
          <button className="stepBack" onClick={onBack} aria-label="Back">
            <ArrowLeftIcon />
          </button>
          <Header />
        </div>

        <h1 className="stepTitle">Search journeys</h1>
        <p className="stepText">By name, by place, or by a stop along the way.</p>

        {/* Search on the phone's keyboard puts it away, as the results are
            already showing. */}
        <form
          className="searchField"
          role="search"
          onSubmit={(event) => {
            event.preventDefault()
            inputRef.current.blur()
          }}
        >
          <SearchIcon />
          <input
            ref={inputRef}
            type="search"
            enterKeyHint="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Journey, place or stop"
            aria-label="Search journeys"
            autoComplete="off"
            // Straight away, unless you're coming back to a search already typed.
            autoFocus={!typed}
          />
          {query && (
            <button
              type="button"
              className="searchClear"
              onClick={() => {
                onQueryChange('')
                inputRef.current.focus()
              }}
              aria-label="Clear search"
            >
              <CloseIcon />
            </button>
          )}
        </form>
      </div>

      <p className="searchCount" aria-live="polite">
        {count}
      </p>

      {results.length > 0 ? (
        <div className="matchCards">
          {results.map(({ journey, stops }, index) => (
            <MatchCard
              key={journey.id}
              journey={journey}
              found={stops.map((stop) => stop.name)}
              index={index}
              liked={likes.includes(journey.id)}
              onSelect={onSelect}
              onToggleLike={onToggleLike}
            />
          ))}
        </div>
      ) : (
        <p className="searchNone">Try the name of a journey, a place, or a stop on one.</p>
      )}
    </div>
  )
}

export default SearchPage
