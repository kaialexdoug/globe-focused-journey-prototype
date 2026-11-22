import { useEffect, useRef, useState } from 'react'

import fujiPicture from './assets/my-journeys-fuji.jpg'
import cityPicture from './assets/profile/profile-city.jpg'
import cranePicture from './assets/profile/crane-avatar.jpg'

import { PickManyPage } from './FindMyJourney.jsx'
import Header from './Header.jsx'
import PromptBox from './PromptBox.jsx'
import { APP_VERSION } from './config.js'
import {
  AccessibilityIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BicycleIcon,
  BookmarkIcon,
  BurgerIcon,
  CameraIcon,
  ChevronRightIcon,
  ClockIcon,
  CompassIcon,
  FishIcon,
  HikingIcon,
  HomeIcon,
  ModeratePaceIcon,
  ParthenonIcon,
  PencilIcon,
  PersonIcon,
  PinIcon,
  RouteIcon,
  SettingsIcon,
  ToriiIcon,
  TrainIcon,
  WalkIcon,
} from './Icons.jsx'
import { placeName } from './journeyStops'
import { THEME_CHOICES } from './theme.js'
import { UNIT_CHOICES } from './units.js'
import { useShrinkToFit } from './shrinkToFit.js'

// Everything for the profile: the navbar along the bottom of every page;
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

// `current` is the tab that's lit, or null for none. `inert` while a box is
// up over the screen, so it can't be tapped or tabbed to.
// `journeyGoing` puts an orange dot on My Journeys, while you're away from a
// journey you're partway through, as that's where it's waiting for you.
export function NavBar({ current, onNavigate, journeyGoing, inert }) {
  return (
    <nav className="navBar" aria-label="Main" inert={inert}>
      {TABS.map(({ page, label, Icon }) => {
        const marked = journeyGoing && page === 'myJourneys'
        return (
          <button
            key={page}
            className={current === page ? 'navTab isCurrent' : 'navTab'}
            aria-current={current === page ? 'page' : undefined}
            aria-label={marked ? `${label}, journey in progress` : undefined}
            onClick={() => onNavigate(page)}
          >
            <Icon className="navIcon" />
            {marked && <span className="navDot" aria-hidden="true"></span>}
            <span>{label}</span>
          </button>
        )
      })}
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
            Cancel
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
      <NameForm submitLabel="Save to a Profile" onSubmit={onCreate} />
    </div>
  )
}

// Before a journey, without a profile: make one so it's saved as you go, or
// start without saving. Tapping outside or Escape cancels starting at all.
export function SaveProgressPrompt({ onSave, onSkip, onCancel }) {
  return (
    <PromptBox
      title="Make a profile?"
      text="Add your name, and the journeys you finish are kept on your profile, with your stats. Your place in a journey is kept either way."
      onDismiss={onCancel}
    >
      <NameForm submitLabel="Save & Start" onSubmit={onSave} autoFocus />
      <button className="backBtn" onClick={onSkip}>
        Start Without a Profile
      </button>
    </PromptBox>
  )
}

// Beginning a journey while you're partway through another: you can only be
// on one at a time, so it's keep going with that one (the big button), or end
// it, which clears where you were, and start the new one. Tapping outside or
// Escape stays where you are.
export function ExitCurrentPrompt({ currentName, nextName, onExit, onResume, onStay }) {
  return (
    <PromptBox
      title="End your current journey?"
      text={`You’re partway through ${currentName}. Starting ${nextName} will end it, and your progress on it will be cleared.`}
      onDismiss={onStay}
    >
      <button className="introBtn" onClick={onResume} autoFocus>
        Keep Going
      </button>
      <button className="backBtn" onClick={onExit}>
        End Journey
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
        Keep My Profile
      </button>
      <button className="backBtn deleteLink" onClick={onDelete}>
        Delete Profile
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

// The journeys you've saved, most recently first. `saved` is their ids, with
// the latest last.
function savedJourneys(journeys, saved) {
  return saved
    .map((id) => journeys.find((journey) => journey.id === id))
    .filter(Boolean)
    .reverse()
}

// A journey as a photo card, after the My Journeys mockup: the photo fading
// into white, the name under it, and its time and difficulty. For saved ones
// in the sideways row on My Journeys, and for saved and finished ones in a
// grid on their own pages. Tapping it opens the journey, and the bookmark
// saves it (or unsaves it).
function JourneyCard({ journey, isSaved, onOpen, onToggleSaved }) {
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
          <span className="journeyCardFacts">
            <ClockIcon />
            {shortTime(journey)}
            <span className="journeyCardDot" aria-hidden="true">
              •
            </span>
            {journey.difficulty}
          </span>
        </span>
      </button>
      {/* Beside the rest rather than in it, as a button can't hold a button. */}
      <button
        className={isSaved ? 'matchSave isSaved' : 'matchSave'}
        onClick={() => onToggleSaved(journey.id)}
        aria-pressed={isSaved}
        aria-label={`Save ${journey.name}`}
      >
        <BookmarkIcon />
      </button>
    </div>
  )
}

// Whether a sideways row has more to see before or after what's showing,
// passed to `setEdges` if that's changed.
function showEdges(row, setEdges) {
  const before = row.scrollLeft > 2
  const after = row.scrollLeft + row.clientWidth < row.scrollWidth - 2
  setEdges((edges) => (edges.before === before && edges.after === after ? edges : { before, after }))
}

// A sideways row of journey cards, two to the screen, that you swipe through.
// Its edge fades to white on whichever side there's more to see.
function JourneyRow({ children }) {
  const rowRef = useRef(null)
  const [edges, setEdges] = useState({ before: false, after: false })

  // Once it's drawn, and again if the screen changes size.
  useEffect(() => {
    const row = rowRef.current
    const observer = new ResizeObserver(() => showEdges(row, setEdges))
    observer.observe(row)
    return () => observer.disconnect()
  }, [])

  const classes = ['journeyRowFrame', edges.before && 'hasBefore', edges.after && 'hasAfter'].filter(Boolean)
  return (
    <div className={classes.join(' ')}>
      <div className="journeyRow" ref={rowRef} onScroll={() => showEdges(rowRef.current, setEdges)}>
        {children}
      </div>
    </div>
  )
}

// A section of My Journeys under its heading, with the way to see all of it
// if there's anything to see.
function MySection({ title, onSeeAll, children }) {
  return (
    <section className="mySection">
      <div className="mySectionHead">
        <h2 className="mySectionTitle">{title}</h2>
        {onSeeAll && (
          <button className="mySeeAll" onClick={onSeeAll}>
            See All
            <ChevronRightIcon />
          </button>
        )}
      </div>
      {children}
    </section>
  )
}

// The journey you left partway, in its own card. Tapping it picks up where you
// left off. `where` says how far along it is.
function CurrentJourney({ journey, where, onResume }) {
  return (
    <button className="myCard myCurrent" onClick={onResume}>
      <span className="myCardHead">
        <span className="myCardLabel">Current Journey</span>
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

// My Journeys, after its mockup: the heading with Mount Fuji beside it, then
// the journey you're partway through (there's only ever one), the ones you've
// saved in a row you swipe through, and at the bottom, the one you finished
// last. Without a profile, the journeys you finish aren't kept, so a way to
// make one takes the place of that.
export function MyJourneysPage({
  profile,
  journeys,
  progress,
  where,
  saved,
  onResume,
  onOpenJourney,
  onToggleSaved,
  onSeeCompleted,
  onSeeSaved,
  onBrowse,
  onCreateProfile,
}) {
  const underWay = journeys.find((journey) => journey.id === progress?.journeyId)
  const [latestCompleted] = completedJourneys(journeys, profile)
  const savedList = savedJourneys(journeys, saved)

  return (
    <div className="myJourneysPage">
      <div className="myHero">
        <img className="myHeroArt" src={fujiPicture} alt="" />
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

      <div className="myBody">
        {underWay && <CurrentJourney journey={underWay} where={where} onResume={onResume} />}
        {profile && !underWay && (
          <div className="myCard">
            <h2 className="myCardLabel">Current Journey</h2>
            <p className="myCardText">You’re not partway through a journey.</p>
            <button className="myBrowse" onClick={onBrowse}>
              Browse Journeys
              <ArrowRightIcon />
            </button>
          </div>
        )}

        {/* Every journey you've saved, the latest first: two on the screen,
            and the rest a swipe away. Unsaving one takes it straight off. */}
        <MySection title="Saved Journeys" onSeeAll={savedList.length > 0 ? onSeeSaved : null}>
          {savedList.length > 0 ? (
            <JourneyRow>
              {savedList.map((journey) => (
                <JourneyCard
                  key={journey.id}
                  journey={journey}
                  isSaved
                  onOpen={onOpenJourney}
                  onToggleSaved={onToggleSaved}
                />
              ))}
            </JourneyRow>
          ) : (
            <div className="myEmptyCard">
              <BookmarkIcon className="myEmptyIcon" />
              <p>Journeys you save will show up here.</p>
            </div>
          )}
        </MySection>

        {/* The journey you finished last, with See All for the rest. */}
        {profile && (
          <MySection title="Completed Journeys" onSeeAll={latestCompleted ? onSeeCompleted : null}>
            {latestCompleted ? (
              <button className="myLatest" onClick={() => onOpenJourney(latestCompleted)}>
                <img
                  src={latestCompleted.photo}
                  alt={latestCompleted.photoAlt}
                  style={{ objectPosition: latestCompleted.photoPosition }}
                />
                <span className="myLatestWords">
                  <span className="myLatestTitle">{latestCompleted.name}</span>
                  <span className="myLatestPlace">
                    <PinIcon />
                    {placeName(latestCompleted.location)}
                  </span>
                </span>
              </button>
            ) : (
              <p className="myEmpty">Your completed journeys will appear here.</p>
            )}
          </MySection>
        )}

        {!profile && (
          <SignUpCard
            label="No profile yet"
            text="With a profile, the journeys you finish are kept here, with your stats. It’s just your name."
            onCreate={onCreateProfile}
          />
        )}
      </div>
    </div>
  )
}

// A page of journeys as a grid of cards, with the way back to My Journeys.
function JourneyGridPage({ title, journeys, saved, onOpenJourney, onToggleSaved, onBack }) {
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
            isSaved={saved.includes(journey.id)}
            onOpen={onOpenJourney}
            onToggleSaved={onToggleSaved}
          />
        ))}
      </div>
    </div>
  )
}

export function CompletedJourneysPage({ profile, journeys, ...page }) {
  return <JourneyGridPage title="Completed Journeys" journeys={completedJourneys(journeys, profile)} {...page} />
}

// Unsaving one takes it straight off this page.
export function SavedJourneysPage({ journeys, saved, ...page }) {
  return <JourneyGridPage title="Saved Journeys" journeys={savedJourneys(journeys, saved)} saved={saved} {...page} />
}

// --- Profile ---

// What you're into, on My Interests.
const INTERESTS = [
  { name: 'Outdoors', Icon: HikingIcon },
  { name: 'Local culture', Icon: ToriiIcon },
  { name: 'Photography', Icon: CameraIcon },
  { name: 'Food', Icon: BurgerIcon },
  { name: 'Cycling', Icon: BicycleIcon },
  { name: 'Trains', Icon: TrainIcon },
  { name: 'Fishing', Icon: FishIcon },
]

// What matters to you on a journey, on My Preferences.
const TRAVEL_PREFERENCES = [
  { name: 'Dietary', Icon: BurgerIcon },
  { name: 'Accessibility', Icon: AccessibilityIcon },
  { name: 'Travel pace', Icon: ModeratePaceIcon },
  { name: 'History', Icon: ParthenonIcon },
]

// "Outdoors, local culture, and photography", or "None listed": the `options`
// whose names are in `names`, in the order of the cards.
function listText(names, options) {
  const picked = options.filter((option) => names.includes(option.name))
  if (picked.length === 0) {
    return 'None listed'
  }
  const words = picked.map(({ name }, index) => (index === 0 ? name : name.toLowerCase()))
  return new Intl.ListFormat('en', { type: 'conjunction' }).format(words)
}

// The country in a journey's location: "JAPAN" from "KAMAKURA · KANAGAWA,
// JAPAN", or "THE BAHAMAS" from "NASSAU · THE BAHAMAS".
const countryOf = (journey) => journey.location.split(' · ')[1].split(', ').at(-1)

// Your Journey Stats, from the journeys you've finished, each counted once
// however many times you've walked it: how many, the stops on them (with the
// detours you took last time), and the cities and countries they're in. A
// journey's `city` is the city or municipality it's in, or null if it isn't in
// one (like a state park).
function journeyStats(profile, journeys) {
  const done = journeys.filter((journey) => profile.journeys[journey.id]?.timesCompleted > 0)
  const places = done.reduce(
    (total, journey) => total + journey.route.length + (profile.journeys[journey.id].lastDetoursTaken?.length ?? 0),
    0,
  )
  const cities = new Set(done.filter((journey) => journey.city).map((journey) => `${journey.city}, ${countryOf(journey)}`))
  const countries = new Set(done.map(countryOf))
  return [
    [done.length, 'Journeys\nUnfolded'],
    [places, 'Places\nDiscovered'],
    [cities.size, 'Cities\nVisited'],
    [countries.size, 'Countries\nVisited'],
  ]
}

// A row with a title in capitals, a line under it, and an arrow, which opens its
// page. Without `onOpen` it can't be tapped yet, like Account & Plan.
function ProfileRow({ title, text, onOpen }) {
  const inside = (
    <>
      <span className="profileRowWords">
        <span className="profileRowTitle">{title}</span>
        <span className="profileRowText">{text}</span>
      </span>
      <ChevronRightIcon className="profileRowChevron" />
    </>
  )
  return onOpen ? (
    <button className="profileRow" onClick={onOpen}>
      {inside}
    </button>
  ) : (
    <div className="profileRow">{inside}</div>
  )
}

// Your name on Profile, on one line beside Edit Profile: a long one is made
// smaller until it fits, down to 18px, and past that ends in "…".
function ProfileName({ name }) {
  const nameRef = useRef(null)
  useShrinkToFit(nameRef, 18, name)

  return (
    <p className="profileName" ref={nameRef}>
      {name}
    </p>
  )
}

// Profile, after its mockup: the heading with the city beside it and the cog
// for Settings, then who you are, your stats, your interests and preferences,
// and your plan. Without a profile, a way to make one takes the place of all
// that. `journeys` is every journey, for the stats.
export function ProfilePage({
  profile,
  journeys,
  onCreateProfile,
  onEditProfile,
  onOpenInterests,
  onOpenPreferences,
  onOpenSettings,
}) {
  return (
    <div className="profilePage">
      <div className="profileHero">
        <img className="profileHeroArt" src={cityPicture} alt="" />
        <Header />
        <button className="profileSettings" onClick={onOpenSettings} aria-label="Settings">
          <SettingsIcon />
        </button>
        <h1 className="profileTitle">My Profile</h1>
        <p className="profileText">
          Your journeys, interests,
          <br />
          preferences, and account.
        </p>
      </div>

      <div className="profileBody">
        {profile ? (
          <>
            <div className="profileWho">
              <img className="profileAvatar" src={cranePicture} alt="" />
              <div className="profileWhoWords">
                <ProfileName name={profile.name} />
                <p className="profileJoined">
                  Joined {new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
              </div>
              <button className="profileEdit" onClick={onEditProfile}>
                <PencilIcon />
                Edit Profile
              </button>
            </div>

            <section className="profileStats" aria-labelledby="profileStatsTitle">
              <h2 className="profileStatsTitle" id="profileStatsTitle">
                Your Journey Stats
              </h2>
              <div className="profileStatsRow">
                {journeyStats(profile, journeys).map(([value, label]) => (
                  <div key={label} className="profileStat">
                    <p className="profileStatValue">{value}</p>
                    <p className="profileStatLabel">{label}</p>
                  </div>
                ))}
              </div>
            </section>

            <ProfileRow title="My Interests" text={listText(profile.interests ?? [], INTERESTS)} onOpen={onOpenInterests} />
            <ProfileRow title="My Preferences" text={listText(profile.preferences ?? [], TRAVEL_PREFERENCES)} onOpen={onOpenPreferences} />
            <ProfileRow title="Account & Plan" text="No plan" />
          </>
        ) : (
          <SignUpCard
            label="Make a profile"
            text="Just a name, no password. Your journeys, stats and interests are then kept on this device."
            onCreate={onCreateProfile}
          />
        )}
      </div>
    </div>
  )
}

// "Save your changes?", from DONE on Edit Profile and Settings when something's
// been changed: SAVE CHANGES, or DON'T SAVE to leave it as it was. Tapping
// outside the box goes back to the page, with the changes still there.
function SaveChangesPrompt({ onSave, onDiscard, onKeepEditing }) {
  return (
    <PromptBox title="Save your changes?" onDismiss={onKeepEditing}>
      <button className="introBtn" onClick={onSave} autoFocus>
        Save Changes
      </button>
      <button className="backBtn" onClick={onDiscard}>
        Don’t Save
      </button>
    </PromptBox>
  )
}

// The bottom of Edit Profile and Settings: DONE, as far down the screen as
// it goes, however little is above it. The same as Done on My Interests and
// My Preferences: deep blue, with the arrow in orange.
function DoneButton({ onDone, disabled }) {
  return (
    <div className="settingsDone">
      <button className="stepFind" onClick={onDone} disabled={disabled}>
        Done
        <ArrowRightIcon />
      </button>
    </div>
  )
}

// Edit Profile, from the pencil on Profile: a screen like Settings, with your
// name to change, then deleting your profile, which asks first. Nothing's
// saved until DONE, which asks whether to save, if the name's been changed.
// (Enter in the name does the same.) DONE waits while the name is empty.
export function EditProfilePage({ profile, onSave, onDelete, onClose }) {
  const [name, setName] = useState(profile.name)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [askToSave, setAskToSave] = useState(false)
  const trimmed = name.trim()

  function done() {
    if (!trimmed) {
      return
    }
    if (trimmed === profile.name) {
      onClose()
    } else {
      setAskToSave(true)
    }
  }

  return (
    <div className="stepPage settingsPage">
      <div className="stepBar">
        <Header />
      </div>

      <h1 className="stepTitle">Edit Profile</h1>
      <p className="stepText">Your name, as it shows on your profile.</p>

      <form
        className="editProfileName"
        onSubmit={(event) => {
          event.preventDefault()
          done()
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
        />
      </form>
      {!trimmed && <p className="editProfileHint">Your name can’t be empty.</p>}

      <div className="settingsRows editProfileDelete">
        <button className="settingsRow settingsDelete" onClick={() => setConfirmDelete(true)}>
          Delete profile
        </button>
      </div>

      <DoneButton onDone={done} disabled={!trimmed} />

      {confirmDelete && (
        <DeleteProfilePrompt
          onKeep={() => setConfirmDelete(false)}
          onDelete={() => {
            setConfirmDelete(false)
            onDelete()
          }}
        />
      )}

      {askToSave && (
        <SaveChangesPrompt
          onSave={() => onSave(trimmed)}
          onDiscard={onClose}
          onKeepEditing={() => setAskToSave(false)}
        />
      )}
    </div>
  )
}

// My Interests and My Preferences, from Profile: cards to tap on and off, as
// many as you like. `chosen` is the names of those picked.
export function InterestsPage(page) {
  return <PickManyPage title="My Interests" text="What you love to do on a journey." options={INTERESTS} {...page} />
}

export function TravelPreferencesPage(page) {
  return (
    <PickManyPage
      title="My Preferences"
      text="What matters to you when you travel."
      options={TRAVEL_PREFERENCES}
      {...page}
    />
  )
}

// Two choices side by side, the one picked filled in, with its name and what
// it means beside them: Units and Appearance on Settings.
function SettingsChoice({ id, name, choices, value, onChoose }) {
  const chosen = choices.find((choice) => choice.value === value) ?? choices[0]
  return (
    <div className="settingsRow">
      <div>
        <p id={id}>{name}</p>
        <p className="settingsSub">{chosen.means}</p>
      </div>
      <div className="settingsChoice" role="group" aria-labelledby={id}>
        {choices.map((choice) => (
          <button
            key={choice.value}
            className={choice.value === chosen.value ? 'settingsOption isChosen' : 'settingsOption'}
            aria-pressed={choice.value === chosen.value}
            onClick={() => onChoose(choice.value)}
          >
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// Settings, from the cog on Profile: metric or imperial, for every distance
// and temperature in the app (units.js), light or dark (theme.js), and which
// version of the app this is, so you can tell whether a phone has picked up
// the latest. Deleting your profile is on Edit Profile.
// Like Edit Profile, nothing's saved until DONE, which asks whether to save,
// if anything's been changed. A theme tapped shows straight away
// (`onTryTheme`), so you can see it before saving it.
//
// Leaving by the navbar with something changed asks the same, first:
// `guardLeaving` hands App a check to make before it goes anywhere, which
// gets the way to go on (`leave`) and keeps hold of it while it asks. Saving
// or not then goes on to wherever the navbar was taking you; tapping outside
// the box stays here, with the changes still there.
export function SettingsPage({ units, theme, onTryTheme, onSave, onClose, guardLeaving }) {
  const [chosenUnits, setChosenUnits] = useState(units)
  const [chosenTheme, setChosenTheme] = useState(theme)
  const [askToSave, setAskToSave] = useState(false)
  // Where the navbar was taking you, while it asks: a function to go there.
  const [leaving, setLeaving] = useState(null)
  const changed = chosenUnits !== units || chosenTheme !== theme

  useEffect(() => {
    guardLeaving(
      changed
        ? (leave) => {
            setLeaving(() => leave)
            return true
          }
        : null,
    )
    return () => guardLeaving(null)
  }, [changed, guardLeaving])

  function chooseTheme(value) {
    setChosenTheme(value)
    onTryTheme(value)
  }

  function done() {
    if (changed) {
      setAskToSave(true)
    } else {
      onClose()
    }
  }

  function save() {
    onSave(chosenUnits, chosenTheme)
    leaving?.()
  }

  function dontSave() {
    if (leaving) {
      leaving()
    } else {
      onClose()
    }
  }

  function keepEditing() {
    setAskToSave(false)
    setLeaving(null)
  }

  return (
    <div className="stepPage settingsPage">
      <div className="stepBar">
        <Header />
      </div>

      <h1 className="stepTitle">Settings</h1>

      <div className="settingsRows">
        <SettingsChoice
          id="settingsUnitsLabel"
          name="Units"
          choices={UNIT_CHOICES}
          value={chosenUnits}
          onChoose={setChosenUnits}
        />
        <SettingsChoice
          id="settingsThemeLabel"
          name="Appearance"
          choices={THEME_CHOICES}
          value={chosenTheme}
          onChoose={chooseTheme}
        />
        <div className="settingsRow">
          <span>Version</span>
          <span className="settingsValue">{APP_VERSION}</span>
        </div>
      </div>

      <DoneButton onDone={done} />

      {(askToSave || leaving) && (
        <SaveChangesPrompt onSave={save} onDiscard={dontSave} onKeepEditing={keepEditing} />
      )}
    </div>
  )
}
