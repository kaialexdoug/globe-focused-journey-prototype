import { useState } from 'react'

import Header from './Header.jsx'
import PromptBox from './PromptBox.jsx'
import { APP_VERSION } from './config.js'
import { HomeIcon, MoonIcon, PersonIcon, RouteIcon, SunIcon } from './Icons.jsx'
import { PERSONALITIES } from './quizData'

// Everything for the profile: the navbar along the bottom of Home, My
// Journeys and Profile; those two pages; and the small pieces for making a
// profile, which is only ever a name. The profile itself is kept on this
// device (see profileStore.js).

// --- The navbar ---

const TABS = [
  { page: 'home', label: 'Home', Icon: HomeIcon },
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

// "Save this to a profile", in an outlined card: at the end of the quiz and
// the journey, and on My Journeys and Profile without one.
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

function DeleteProfilePrompt({ onDelete, onKeep }) {
  return (
    <PromptBox
      title="Delete your profile?"
      text="Your name, traveler type, saved journeys and stats will be removed from this device. This can’t be undone."
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

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// The journeys you've started, with the one under way at the top. `where`
// says where it was left off: { text, fraction } of the way along.
export function MyJourneysPage({
  profile,
  journeys,
  progress,
  where,
  onResume,
  onOpenJourney,
  onViewMemory,
  onBrowse,
  onCreateProfile,
}) {
  const owned = profile ? journeys.filter((journey) => profile.journeys[journey.id]) : []
  const underWay = owned.find((journey) => progress?.journeyId === journey.id)
  const others = owned.filter((journey) => journey !== underWay)

  let content
  if (!profile) {
    content = (
      <SignUpCard
        label="NO PROFILE YET"
        text="With a profile, every journey you start is kept here, and you can pick one up where you left off. It’s just your name."
        onCreate={onCreateProfile}
      />
    )
  } else if (owned.length === 0) {
    content = (
      <div className="comingSoonCard">
        <p className="comingSoonTitle">No journeys yet</p>
        <p>Start one and it’ll be kept here, ready to pick up any time.</p>
        <button className="introBtn" onClick={onBrowse}>
          BROWSE JOURNEYS ➜
        </button>
      </div>
    )
  } else {
    content = (
      <>
        {underWay && (
          // The whole card resumes it, like the cards on Browse Journeys.
          <div className="featureCard isUnderWay" onClick={onResume}>
            <img src={underWay.photo} alt="" />
            <p className="featureCardTag inProgressTag">IN PROGRESS</p>
            <div className="featureCardText">
              <p className="heroLabel">{underWay.location}</p>
              <h2 className="heroTitle">{underWay.name}</h2>
              <p className="featureCardBlurb">{where.text}</p>
              <div className="progressBar journeyProgress">
                <div className="progressFill" style={{ width: `${where.fraction * 100}%` }}></div>
              </div>
              <button className="introBtn">RESUME JOURNEY ➜</button>
            </div>
          </div>
        )}

        {others.map((journey) => {
          const record = profile.journeys[journey.id]
          const completed = record.timesCompleted > 0
          return (
            <div key={journey.id} className="ownedJourney">
              <div className="detourOptionPhoto">
                <img src={journey.photo} alt="" />
                <p className={completed ? 'detourTakenTag completedTag' : 'detourTakenTag'}>
                  {completed ? '✓ COMPLETED' : 'NOT FINISHED'}
                </p>
                <h2 className="heroTitle">{journey.name}</h2>
              </div>
              <div className="detourOptionBody">
                <p className="detourOptionTeaser">
                  {completed
                    ? `Finished ${record.timesCompleted === 1 ? 'once' : `${record.timesCompleted} times`}, most recently on ${formatDate(record.lastCompletedAt)}.`
                    : `Started on ${formatDate(record.startedAt)}.`}
                </p>
                <button className="introBtn" onClick={() => onOpenJourney(journey)}>
                  {completed ? 'BEGIN JOURNEY AGAIN ➜' : 'BEGIN JOURNEY ➜'}
                </button>
                {completed && (
                  <button className="introBtn isGhost" onClick={() => onViewMemory(journey)}>
                    VIEW MEMORY
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </>
    )
  }

  return (
    <div className="myJourneysPage">
      <Header />
      <div className="pageBody">
        <h1 className="mainHook pageTitle">My Journeys</h1>
        {content}
      </div>
    </div>
  )
}

// --- Profile ---

const THEMES = [
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
  { value: 'light', label: 'Light', Icon: SunIcon },
]

// Settings for this device. They work with or without a profile.
function SettingsSection({ theme, onThemeChange }) {
  return (
    <>
      <h2 className="sectionTitle settingsTitle">Settings</h2>
      <div className="settingsRow">
        <div>
          <p className="settingsName" id="appearanceLabel">Appearance</p>
          <p className="settingsHint">For this device</p>
        </div>
        <div className="themeSwitch" role="radiogroup" aria-labelledby="appearanceLabel">
          {THEMES.map(({ value, label, Icon }) => (
            <button
              key={value}
              className={theme === value ? 'themeOption isChosen' : 'themeOption'}
              role="radio"
              aria-checked={theme === value}
              onClick={() => onThemeChange(value)}
            >
              <Icon className="themeIcon" />
              {label}
            </button>
          ))}
        </div>
      </div>
      <VersionLine />
    </>
  )
}

// When this copy of the app was built. Tapping it shows how big the phone
// says its screen is, for working out layout problems on a real phone.
function VersionLine() {
  const [details, setDetails] = useState(null)

  return (
    <button className="appVersion" onClick={() => setDetails(details ? null : screenDetails())}>
      Version · {APP_VERSION}
      {details && <span className="appVersionDetails">{details}</span>}
    </button>
  )
}

function screenDetails() {
  // Each CSS height, and the safe areas (the notch, the home bar), measured
  // by a hidden box that's sized by them.
  const probe = document.createElement('div')
  probe.style.cssText = 'position:fixed;top:0;left:0;visibility:hidden;width:0;'
  document.body.appendChild(probe)
  const measure = (css) => {
    probe.style.cssText += css
    const box = probe.getBoundingClientRect()
    return Math.round(box.height)
  }
  const sizes = ['vh', 'svh', 'lvh', 'dvh'].map((unit) => `${unit} ${measure(`height:100${unit};padding:0;`)}`)
  const safeTop = measure('height:0;padding:env(safe-area-inset-top) 0 0;')
  const safeBottom = measure('height:0;padding:0 0 env(safe-area-inset-bottom);')
  probe.remove()

  const app = document.querySelector('.phone').getBoundingClientRect()
  return [
    `Screen ${screen.width}×${screen.height}, window ${innerWidth}×${innerHeight}`,
    `Visible ${Math.round(visualViewport?.height ?? 0)}, app ${Math.round(app.top)}–${Math.round(app.bottom)}`,
    sizes.join(', '),
    `Safe area top ${safeTop}, bottom ${safeBottom}`,
    navigator.standalone || matchMedia('(display-mode: standalone)').matches ? 'Home screen app' : 'In a browser',
  ].join('\n')
}

export function ProfilePage({ profile, theme, onThemeChange, onCreateProfile, onRename, onTakeQuiz, onDelete }) {
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
            text="Just a name, no password. Your traveler type and journeys are then kept on this device, so you won’t need to retake the quiz."
            onCreate={onCreateProfile}
          />
          <SettingsSection theme={theme} onThemeChange={onThemeChange} />
        </div>
      </div>
    )
  }

  const type = PERSONALITIES.find((each) => each.name === profile.travelerType)
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

        <div className="profileType" style={type ? { '--type-color': type.color } : undefined}>
          {type && <img src={type.photo} alt="" />}
          <div>
            <p className="startCardLabel">YOUR TRAVELER TYPE</p>
            <p className="profileTypeName">{type ? type.name : 'Not found yet'}</p>
            <button className="textLink" onClick={onTakeQuiz}>
              {type ? 'RETAKE THE QUIZ' : 'TAKE THE QUIZ ➜'}
            </button>
          </div>
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

        <SettingsSection theme={theme} onThemeChange={onThemeChange} />

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
