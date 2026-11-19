import { useState } from 'react'

import {
  AccessibilityIcon,
  BackpackIcon,
  ChecklistIcon,
  ChevronRightIcon,
  ClockIcon,
  InfoIcon,
  LightbulbIcon,
  TicketIcon,
  TrainIcon,
} from './Icons.jsx'

// Before You Go, on See Your Journey, just under the route details and folded
// away the same way: what's worth knowing before you set off, in up to six
// cards (the six in Dad's handoff, in the order below). A journey only shows
// the cards it has something for, and the bar lists the first few. Each card
// starts closed, with just its title, and opens on its own when tapped.
//
// It needs the journey's `beforeYouGo`, where each card is a list of short
// points:
//
//   beforeYouGo: {
//     checked: 'November 2026',  // when it was last checked, for the note at the end
//     bring: [],         // What to bring: shoes, water, sunscreen, a jacket, anything special
//     costs: [],         // Tickets and costs: admission, reservations, parking fees, cash
//     getting: [],       // Parking and transportation: where to park, and getting back
//     access: [],        // Accessibility: strollers, wheelchairs, stairs, restrooms
//     restrictions: [],  // Important restrictions: hours, closures, ages, pets
//     tips: [],          // Local insider tips: shade, crowds, the best photo
//   }
//
// A point is a sentence, or { lead, text } to start it with a place's name in
// bold ("Higo Hosokawa Garden: 9 AM–5 PM…"). Hours and prices change, so the
// card always ends with a note to check them, and when that was last done.

const SECTIONS = [
  { key: 'bring', title: 'What to bring', short: 'what to bring', Icon: BackpackIcon },
  { key: 'costs', title: 'Tickets and costs', short: 'costs', Icon: TicketIcon },
  { key: 'getting', title: 'Parking and transportation', short: 'getting there', Icon: TrainIcon },
  { key: 'access', title: 'Accessibility', short: 'access', Icon: AccessibilityIcon },
  { key: 'restrictions', title: 'Important restrictions', short: 'hours', Icon: ClockIcon },
  { key: 'tips', title: 'Local insider tips', short: 'tips', Icon: LightbulbIcon },
]

// What's in it, for the bar: "What to bring, costs, getting there and more",
// or all of them if there are three or fewer.
function summaryOf(sections) {
  const words = sections.map((section) => section.short)
  let summary
  if (words.length > 3) {
    summary = `${words.slice(0, 3).join(', ')} and more`
  } else if (words.length > 1) {
    summary = `${words.slice(0, -1).join(', ')} and ${words.at(-1)}`
  } else {
    summary = words[0] ?? ''
  }
  return summary.charAt(0).toUpperCase() + summary.slice(1)
}

function BeforeYouGo({ journey }) {
  const { beforeYouGo } = journey
  const [open, setOpen] = useState(false)
  // The cards that are open: each starts closed, showing just its title, and
  // opens and closes on its own when it's tapped.
  const [openCards, setOpenCards] = useState([])
  const sections = SECTIONS.filter((section) => beforeYouGo[section.key]?.length > 0)

  function toggleCard(key) {
    setOpenCards((keys) => (keys.includes(key) ? keys.filter((each) => each !== key) : [...keys, key]))
  }

  return (
    <section className="beforeYouGo" aria-labelledby="beforeYouGoTitle">
      <h2 className="routeFoldHeading" id="beforeYouGoTitle">
        <button
          className={open ? 'routeFoldBar isOpen' : 'routeFoldBar'}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="beforeYouGoFold"
        >
          <ChecklistIcon className="routeFoldIcon" />
          <span className="routeFoldText">
            <span className="routeFoldTitle">Before You Go</span>
            <span className="routeFoldSummary">{summaryOf(sections)}</span>
          </span>
          <ChevronRightIcon className="routeFoldChevron" />
        </button>
      </h2>

      {/* Folded away until it's opened: out of reach (inert) while it is. */}
      <div className={open ? 'routeFold isOpen' : 'routeFold'} id="beforeYouGoFold" inert={!open}>
        <div className="routeFoldInner">
          <ul className="beforeGoList">
            {sections.map(({ key, title, Icon }) => {
              const cardOpen = openCards.includes(key)
              return (
                <li key={key} className={cardOpen ? 'beforeGoCard isOpen' : 'beforeGoCard'}>
                  <h3 className="beforeGoHeading">
                    <button
                      className="beforeGoToggle"
                      onClick={() => toggleCard(key)}
                      aria-expanded={cardOpen}
                      aria-controls={`beforeGo-${key}`}
                    >
                      <Icon className="beforeGoIcon" />
                      <span className="beforeGoTitle">{title}</span>
                      <ChevronRightIcon className="beforeGoChevron" />
                    </button>
                  </h3>
                  {/* Opens the same way as the whole of Before You Go. */}
                  <div className={cardOpen ? 'routeFold isOpen' : 'routeFold'} id={`beforeGo-${key}`} inert={!cardOpen}>
                    <div className="routeFoldInner">
                      <ul className="beforeGoPoints">
                        {beforeYouGo[key].map((point, index) => (
                          <li key={index}>
                            {typeof point === 'string' ? (
                              point
                            ) : (
                              <>
                                <strong>{point.lead}:</strong> {point.text}
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <p className="beforeGoCheck">
            <InfoIcon className="beforeGoCheckIcon" />
            <span>
              Hours, prices and rules can change, so check with each place before you go.
              {beforeYouGo.checked && ` Last checked ${beforeYouGo.checked}.`}
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default BeforeYouGo
