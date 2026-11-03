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

// The navbar's Find tab.
export function CompassIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
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

// The search button on Home.
export function SearchIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </Icon>
  )
}

// On the button at the bottom of a journey on Home.
export function ArrowRightIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M3.5 12h17M14.5 6l6 6-6 6" />
    </Icon>
  )
}

// On Find My Journey: a compass whose needle reaches out past its rim.
export function NeedleCompassIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M20.16 8.2A9 9 0 0 1 8.2 20.16M3.84 15.8A9 9 0 0 1 15.8 3.84" />
      <path d="M21.5 2.5Q15.2 15.2 2.5 21.5 8.8 8.8 21.5 2.5zM2.5 21.5 12 12" />
    </Icon>
  )
}

// On Find My Journey: four stars, one big and three smaller.
export function FourStarsIcon({ className }) {
  return (
    <Icon className={className}>
      <path
        d="M7 3.5Q8 9 13.5 10 8 11 7 16.5 6 11 .5 10 6 9 7 3.5zM18.5 1Q19.2 4.3 22.5 5 19.2 5.7 18.5 9 17.8 5.7 14.5 5 17.8 4.3 18.5 1zM18 11.5Q18.9 15.6 23 16.5 18.9 17.4 18 21.5 17.1 17.4 13 16.5 17.1 15.6 18 11.5zM8 17.8Q8.5 20 10.7 20.5 8.5 21 8 23.2 7.5 21 5.3 20.5 7.5 20 8 17.8z"
        fill="currentColor"
        stroke="none"
      />
    </Icon>
  )
}

// The rest are solid rather than drawn in lines, for the place and the tags on
// a journey on Home.

export function SolidPinIcon({ className }) {
  return (
    <Icon className={className}>
      <path
        d="M12 2a7.5 7.5 0 0 0-7.5 7.5C4.5 15.5 12 22 12 22s7.5-6.5 7.5-12.5A7.5 7.5 0 0 0 12 2zm0 10.3a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6z"
        fill="currentColor"
        fillRule="evenodd"
        stroke="none"
      />
    </Icon>
  )
}

export function SolidClockIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" />
      <path d="M12 6.5V12l3.5 2" stroke="rgba(0, 0, 0, 0.7)" strokeWidth="2" />
    </Icon>
  )
}

export function SolidWalkIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="13.5" cy="4" r="2.4" fill="currentColor" stroke="none" />
      <g strokeWidth="2.8">
        <path d="M12.5 8.5 10.8 14" />
        <path d="M10.8 14l3 2.6.9 4.4" />
        <path d="M10.8 14l-1.9 3.2-2.4 3.3" />
        <path d="M12.2 9.6l3.3 2.4" />
        <path d="M12.2 9.6l-3.2 2" />
      </g>
    </Icon>
  )
}

// A journey that's mostly scenic.
export function MountainIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M1.5 20 9 6.5l4.3 7.4 2.2-3.4L22.5 20z" fill="currentColor" stroke="none" />
    </Icon>
  )
}

// A journey that's mostly about food.
export function ForkKnifeIcon({ className }) {
  return (
    <Icon className={className}>
      <g strokeWidth="2">
        <path d="M6 3v6a2.5 2.5 0 0 0 5 0V3M8.5 3v18" />
        <path d="M17.5 3v18" />
      </g>
      <path d="M17.5 3c-2.4 1.4-3.5 4-3.5 7 0 1.6 1.2 3 3.5 3z" fill="currentColor" stroke="none" />
    </Icon>
  )
}

// A journey that's mostly cultural: a torii gate.
export function ToriiIcon({ className }) {
  return (
    <Icon className={className}>
      <g strokeWidth="2.4">
        <path d="M2.5 5c6 1.7 13 1.7 19 0" />
        <path d="M4.5 10.5h15" />
        <path d="M7.5 6.5V21M16.5 6.5V21" />
        <path d="M12 6.8v3.7" />
      </g>
    </Icon>
  )
}
