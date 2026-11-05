import { useState } from 'react'

import fujiPicture from './assets/my-journeys-fuji.webp'

import Header from './Header.jsx'
import PromptBox from './PromptBox.jsx'
import { APP_VERSION } from './config.js'
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CompassIcon,
  HeartIcon,
  HomeIcon,
  PersonIcon,
  PinIcon,
  RouteIcon,
  WalkIcon,
} from './Icons.jsx'
import { placeName } from './journeyStops'

// Everything for the profile: the navbar along the bottom of the main tabs;
// the My Journeys and Profile pages; and the small pieces for making a
// profile, which is only ever a name. The profile itself is kept on this
// device (see profileStore.js).

// --- The navbar ---

const TABS = [
  { page: 'home', label: 'Home', Icon: HomeIcon },
  { page: 'find', label: 'Find', Icon: CompassIcon },
  { page: 'myJourneys', label: 'My Journeys', Icon: RouteIcon },
  { page: 'profile', label: 'Profile', Icon: PersonIcon },
]

export function NavBar({ current, onNavigate }) {
  return (
    <nav className="navBar" aria-label="Main">
      {TABS.map(({ page, label, Icon }) => (
        <button
          key={page}
          className={current === page ? 'navTab isCurrent' : 'navTab'}
          aria-current={current === page ? 'page' : undefined}
          onClick={() => onNavigate(page)}
        >
          <Icon className="navIcon" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

// --- Making a profile ---

// A name, and a button to save it. Enter works too.
export function NameForm({ submitLabel, initialName = '', onSubmit, onCancel, autoFocus }) {
  const [name, setName] = useState(initialName)
  const trimmed = name.trim()

  return (
    <form
      className="nameForm"
      onSubmit={(event) => {
        event.preventDefault()
        if (trimmed) {
          onSubmit(trimmed)
        }
      }}
    >
      <input
        className="surveyInput"
        type="text"
        aria-label="Your name"
        autoComplete="given-name"
        maxLength={40}
        placeholder="Your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        autoFocus={autoFocus}
      />
      <div className="nameFormButtons">
        {onCancel && (
          <button type="button" className="introBtn isGhost" onClick={onCancel}>
            CANCEL
          </button>
        )}
        <button type="submit" className="introBtn" disabled={!trimmed}>
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

// "Save this to a profile", in an outlined card: at the end of a journey, and
// on My Journeys and Profile without one.
export function SignUpCard({ label, text, onCreate }) {
  return (
    <div className="signUpCard">
      <p className="startCardLabel">{label}</p>
      <p className="detourCardText">{text}</p>
      <NameForm submitLabel="SAVE TO A PROFILE" onSubmit={onCreate} />
    </div>
  )
}

// Before a journey, without a profile: make one so it's saved as you go, or
// start without saving. Tapping outside or Escape cancels starting at all.
export function SaveProgressPrompt({ onSave, onSkip, onCancel }) {
  return (
    <PromptBox
      title="Save your progress?"
      text="Add your name to make a profile. Your journey is saved as you go, so you can pick up where you left off, even if you close the app."
      onDismiss={onCancel}
    >
      <NameForm submitLabel="SAVE & START" onSubmit={onSave} autoFocus />
      <button className="backBtn" onClick={onSkip}>
        START WITHOUT SAVING
      </button>
    </PromptBox>
  )
}

// Ending a journey that's being saved: keep where you are for later, or
// throw it away. Tapping outside or Escape goes back to the journey.
export function SaveExitPrompt({ onSaveExit, onExitWithoutSaving, onStay }) {
  return (
    <PromptBox
      title="Save your progress?"
      text="Save it, and you can pick up right where you left off from My Journeys."
      onDismiss={onStay}
    >
      <button className="introBtn" onClick={onSaveExit} autoFocus>
        SAVE & EXIT
      </button>
      <button className="introBtn isGhost" onClick={onExitWithoutSaving}>
        EXIT WITHOUT SAVING
      </button>
      <button className="backBtn" onClick={onStay}>
        BACK TO THE JOURNEY
      </button>
    </PromptBox>
  )
}

// Starting a journey with another left partway: you can only be on one at a
// time, so it's exit that one, or carry on with it. Tapping outside or Escape
// goes back to where you were.
export function ExitCurrentPrompt({ currentName, nextName, onExit, onResume, onStay }) {
  return (
    <PromptBox
      title="Exit your current journey?"
      text={`You’re partway through ${currentName}, and you can only be on one journey at a time. Starting ${nextName} will exit it, and your place won’t be kept.`}
      onDismiss={onStay}
    >
      <button className="introBtn" onClick={onExit} autoFocus>
        EXIT & START
      </button>
      <button className="introBtn isGhost" onClick={onResume}>
        RESUME CURRENT JOURNEY
      </button>
      <button className="backBtn" onClick={onStay}>
        NOT NOW
      </button>
    </PromptBox>
  )
}

function DeleteProfilePrompt({ onDelete, onKeep }) {
  return (
    <PromptBox
      title="Delete your profile?"
      text="Your name, saved journeys and stats will be removed from this device. This can’t be undone."
      onDismiss={onKeep}
    >
      <button className="introBtn" onClick={onKeep} autoFocus>
        KEEP MY PROFILE
      </button>
      <button className="backBtn deleteLink" onClick={onDelete}>
        DELETE PROFILE
      </button>
    </PromptBox>
  )
}

// --- My Journeys ---

const shortTime = (journey) => journey.time.replace('hours', 'hrs')

// The journeys you've finished, most recently first.
function completedJourneys(journeys, profile) {
  if (!profile) {
    return []
  }
  return journeys
    .filter((journey) => profile.journeys[journey.id]?.timesCompleted > 0)
    .sort((a, b) => profile.journeys[b.id].lastCompletedAt.localeCompare(profile.journeys[a.id].lastCompletedAt))
}

// The journeys you've liked, most recently first. `likes` is their ids, with
// the latest last.
function likedJourneys(journeys, likes) {
  return likes
    .map((id) => journeys.find((journey) => journey.id === id))
    .filter(Boolean)
    .reverse()
}

// A journey as a small photo card: the same for finished and liked ones, in a
// sideways row on My Journeys or a grid on their own pages. Tapping it opens the
// journey, and the heart likes it (or unlikes it).
function JourneyCard({ journey, liked, onOpen, onToggleLike }) {
  return (
    <div className="journeyCard">
      <button className="journeyCardOpen" onClick={() => onOpen(journey)}>
        <img
          src={journey.photo}
          alt={journey.photoAlt}
          style={{ objectPosition: journey.photoPosition }}
          loading="lazy"
        />
        <span className="journeyCardWords">
          <span className="journeyCardTitle">{journey.name}</span>
          <span className="journeyFacts">
            <span>
              <ClockIcon />
              {shortTime(journey)}
            </span>
            <span>
              <WalkIcon />
              {journey.difficulty}
            </span>
          </span>
        </span>
      </button>
      {/* Beside the rest rather than in it, as a button can't hold a button. */}
      <button
        className={liked ? 'matchHeart isLiked' : 'matchHeart'}
        onClick={() => onToggleLike(journey.id)}
        aria-pressed={liked}
        aria-label={`Like ${journey.name}`}
      >
        <HeartIcon />
      </button>
    </div>
  )
}

// The name of a section of My Journeys, with the way to see all of it if there's
// anything to see.
function SectionHead({ label, onSeeAll }) {
  return (
    <div className="myPanelHead">
      <h2 className="myPanelLabel">{label}</h2>
      {onSeeAll && (
        <button className="mySeeAll" onClick={onSeeAll}>
          See All
          <ChevronRightIcon />
        </button>
      )}
    </div>
  )
}

// The journey you left partway, in its own card. Tapping it picks up where you
// left off. `where` says how far along it is.
function CurrentJourney({ journey, where, onResume }) {
  return (
    <button className="myPanel myCurrent" onClick={onResume}>
      <span className="myPanelHead">
        <span className="myPanelLabel">CURRENT JOURNEY</span>
        <ChevronRightIcon className="myCurrentChevron" />
      </span>
      <span className="myCurrentBody">
        <img
          className="myCurrentPhoto"
          src={journey.photo}
          alt={journey.photoAlt}
          style={{ objectPosition: journey.photoPosition }}
        />
        <span className="myCurrentWords">
          <span className="myCurrentTitle">{journey.name}</span>
          <span className="myCurrentProgress">
            <span className="myProgressBar">
              <span style={{ width: `${(where.stopsDone / where.stopCount) * 100}%` }}></span>
            </span>
            {where.stopsDone} / {where.stopCount} stops
          </span>
          <span className="journeyFacts">
            <span>
              <ClockIcon />
              {shortTime(journey)}
            </span>
            <span>
              <WalkIcon />
              {journey.difficulty}
            </span>
            <span>
              <PinIcon />
              {placeName(journey.location)}
            </span>
          </span>
        </span>
      </span>
    </button>
  )
}

// Your place for your journeys, under a photo that fades into the page: the one
// you're partway through (there's only ever one), the ones you've finished, and
// the one you liked last. Without a profile, nothing's kept but your likes, so a
// way to make one takes the place of the first two.
export function MyJourneysPage({
  profile,
  journeys,
  progress,
  where,
  likes,
  onResume,
  onOpenJourney,
  onToggleLike,
  onSeeCompleted,
  onSeeLiked,
  onBrowse,
  onCreateProfile,
}) {
  const underWay = journeys.find((journey) => journey.id === progress?.journeyId)
  const completed = completedJourneys(journeys, profile)
  const [latestLiked] = likedJourneys(journeys, likes)

  return (
    <div className="myJourneysPage">
      <div className="myHero">
        <img className="myHeroPhoto" src={fujiPicture} alt="" />
        <Header />
        <h1 className="myTitle">
          My
          <br />
          Journeys
        </h1>
        <p className="myText">
          Your adventures, memories,
          <br />
          and where to next.
        </p>
      </div>

      <div className="myPanels">
        {!profile && (
          <SignUpCard
            label="NO PROFILE YET"
            text="With a profile, your current and completed journeys are kept here, and you can pick one up where you left off. It’s just your name."
            onCreate={onCreateProfile}
          />
        )}

        {profile && underWay && <CurrentJourney journey={underWay} where={where} onResume={onResume} />}
        {profile && !underWay && (
          <div className="myPanel">
            <SectionHead label="CURRENT JOURNEY" />
            <p className="myEmpty">You’re not partway through a journey.</p>
            <button className="textLink" onClick={onBrowse}>
              BROWSE JOURNEYS ➜
            </button>
          </div>
        )}

        {profile && (
          <div className="myPanel">
            <SectionHead label="COMPLETED JOURNEYS" onSeeAll={completed.length > 0 ? onSeeCompleted : null} />
            {completed.length > 0 ? (
              <div className="journeyRow">
                {completed.map((journey) => (
                  <JourneyCard
                    key={journey.id}
                    journey={journey}
                    liked={likes.includes(journey.id)}
                    onOpen={onOpenJourney}
                    onToggleLike={onToggleLike}
                  />
                ))}
              </div>
            ) : (
              <p className="myEmpty">Journeys you finish will show up here.</p>
            )}
          </div>
        )}

        <div className="myPanel">
          <SectionHead label="LIKED JOURNEYS" onSeeAll={latestLiked ? onSeeLiked : null} />
          {latestLiked ? (
            <button className="myLiked" onClick={() => onOpenJourney(latestLiked)}>
              <img
                src={latestLiked.photo}
                alt={latestLiked.photoAlt}
                style={{ objectPosition: latestLiked.photoPosition }}
              />
              <span className="myLikedWords">
                <span className="myLikedTitle">{latestLiked.name}</span>
                <span className="myLikedPlace">
                  <PinIcon />
                  {placeName(latestLiked.location)}
                </span>
              </span>
            </button>
          ) : (
            <p className="myEmpty">Journeys you like will show up here.</p>
          )}
        </div>
      </div>
    </div>
  )
}

// A page of journeys as a grid of cards, with the way back to My Journeys.
function JourneyGridPage({ title, journeys, likes, onOpenJourney, onToggleLike, onBack }) {
  return (
    <div className="stepPage myGridPage">
      <div className="stepBar">
        <button className="stepBack" onClick={onBack} aria-label="Back">
          <ArrowLeftIcon />
        </button>
        <Header />
      </div>
      <h1 className="stepTitle">{title}</h1>
      <div className="journeyGrid">
        {journeys.map((journey) => (
          <JourneyCard
            key={journey.id}
            journey={journey}
            liked={likes.includes(journey.id)}
            onOpen={onOpenJourney}
            onToggleLike={onToggleLike}
          />
        ))}
      </div>
    </div>
  )
}

export function CompletedJourneysPage({ profile, journeys, ...page }) {
  return <JourneyGridPage title="Completed Journeys" journeys={completedJourneys(journeys, profile)} {...page} />
}

// Unliking one takes it straight off this page.
export function LikedJourneysPage({ journeys, likes, ...page }) {
  return <JourneyGridPage title="Liked Journeys" journeys={likedJourneys(journeys, likes)} likes={likes} {...page} />
}

// --- Profile ---

// When this copy of the app was built, so you can tell whether a phone has
// picked up the latest version. (Dark mode's switch used to sit above it;
// it's gone for the redesign and will come back later.)
function AppVersion() {
  return <p className="appVersion">Version · {APP_VERSION}</p>
}

export function ProfilePage({ profile, onCreateProfile, onRename, onDelete }) {
  const [editingName, setEditingName] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!profile) {
    return (
      <div className="profilePage">
        <Header />
        <div className="pageBody">
          <h1 className="mainHook pageTitle">Profile</h1>
          <SignUpCard
            label="MAKE A PROFILE"
            text="Just a name, no password. Your journeys and stats are then kept on this device."
            onCreate={onCreateProfile}
          />
          <AppVersion />
        </div>
      </div>
    )
  }

  const since = new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const stats = [
    [profile.stats.journeysCompleted, 'Journeys completed'],
    [profile.stats.journeysStarted, 'Journeys started'],
    [profile.stats.stopsVisited, 'Stops visited'],
    [profile.stats.detoursTaken, 'Detours taken'],
  ]

  return (
    <div className="profilePage">
      <Header />
      <div className="pageBody">
        <h1 className="mainHook pageTitle">Profile</h1>

        <div className="profileCard">
          <p className="profileAvatar" aria-hidden="true">
            {profile.name[0].toUpperCase()}
          </p>
          {editingName ? (
            <NameForm
              submitLabel="SAVE"
              initialName={profile.name}
              autoFocus
              onSubmit={(name) => {
                onRename(name)
                setEditingName(false)
              }}
              onCancel={() => setEditingName(false)}
            />
          ) : (
            <>
              <p className="profileName">{profile.name}</p>
              <p className="profileSince">Exploring since {since}</p>
              <button className="textLink" onClick={() => setEditingName(true)}>
                CHANGE NAME
              </button>
            </>
          )}
        </div>

        <h2 className="sectionTitle">Your stats</h2>
        <div className="statsGrid">
          {stats.map(([value, label]) => (
            <div key={label} className="statTile">
              <p className="statValue">{value}</p>
              <p className="statLabel">{label}</p>
            </div>
          ))}
        </div>

        <AppVersion />

        <button className="backBtn pageEndLink deleteLink" onClick={() => setConfirmDelete(true)}>
          DELETE PROFILE
        </button>
      </div>

      {confirmDelete && (
        <DeleteProfilePrompt
          onKeep={() => setConfirmDelete(false)}
          onDelete={() => {
            setConfirmDelete(false)
            onDelete()
          }}
        />
      )}
    </div>
  )
}
