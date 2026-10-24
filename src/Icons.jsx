// Small line icons, drawn in the text colour they sit in (set `color` on them
// or their parent to tint them).

function Icon({ className, children }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function ClockIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </Icon>
  )
}

export function WalkIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="13.5" cy="4.5" r="1.8" />
      <path d="M12.5 8.5 10.8 14" />
      <path d="M10.8 14l3 2.6.9 4.4" />
      <path d="M10.8 14l-1.9 3.2-2.4 3.3" />
      <path d="M12.2 9.6l3.3 2.4" />
      <path d="M12.2 9.6l-3.2 2" />
    </Icon>
  )
}

// A winding route between two points, for the number of stops.
export function RouteIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="6" cy="5" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="M8 5h7.5a3.5 3.5 0 0 1 0 7h-7a3.5 3.5 0 0 0 0 7H16" />
    </Icon>
  )
}

export function PinIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </Icon>
  )
}

// The "go" arrow on GET DIRECTIONS.
export function NavigateIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M20 4 4 11l7 2 2 7z" fill="currentColor" />
    </Icon>
  )
}

// The navbar's Home tab.
export function HomeIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6 9v10.5h4.5V14h3v5.5H18V9" />
    </Icon>
  )
}

// The navbar's Profile tab.
export function PersonIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6" />
    </Icon>
  )
}

// Light mode, in Settings.
export function SunIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
    </Icon>
  )
}

// Dark mode, in Settings.
export function MoonIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
    </Icon>
  )
}

// On the handle of a pull-up panel. It turns over once the panel is open.
export function ChevronUpIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="m6 15 6-6 6 6" />
    </Icon>
  )
}

// The live map's button for putting you back in the middle of it.
export function LocateIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </Icon>
  )
}

// The ✕ in the corner of a journey stop, for stopping the journey.
export function CloseIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Icon>
  )
}
