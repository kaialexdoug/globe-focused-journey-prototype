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

export function ChevronRightIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="m9 6 6 6-6 6" />
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

// Who's joining, on Find My Journey: on your own, as a couple, as a family (two
// adults, with a child between them holding their hands), or with friends (one
// in front, with two behind).

export function SoloIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="7.5" r="3.7" />
      <path d="M5 20.5c0-4.2 3-6.7 7-6.7s7 2.5 7 6.7z" />
    </Icon>
  )
}

export function HeartIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M12 20.5S3 15.2 3 9a4.9 4.9 0 0 1 9-2.7A4.9 4.9 0 0 1 21 9c0 6.2-9 11.5-9 11.5z" />
    </Icon>
  )
}

export function FamilyIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="6" cy="4.8" r="2.1" />
      <circle cx="18" cy="4.8" r="2.1" />
      <path d="M2.8 14v-2.5A3.2 3.2 0 0 1 6 8.3a3.2 3.2 0 0 1 3.2 3.2V14M14.8 14v-2.5A3.2 3.2 0 0 1 18 8.3a3.2 3.2 0 0 1 3.2 3.2V14" />
      <path d="M4.6 12v9M7.4 12v9M16.6 12v9M19.4 12v9" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M9.2 14l2.8 1.8 2.8-1.8M12 15.8V21" />
    </Icon>
  )
}

export function GroupIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="8.2" r="3.3" />
      <path d="M5.6 20.5c0-3.9 2.7-6.2 6.4-6.2s6.4 2.3 6.4 6.2" />
      <path d="M6.9 4.9a2.7 2.7 0 0 0-.4 5.4M17.1 4.9a2.7 2.7 0 0 1 .4 5.4" />
      <path d="M1.5 18c0-3 1.5-4.9 4-5.4M22.5 18c0-3-1.5-4.9-4-5.4" />
    </Icon>
  )
}

// Your pace, on Find My Journey: upright with a short step, then leaning in with
// a longer stride and swinging arms, then running with the back leg kicked up.

export function EasyPaceIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12.3" cy="3.9" r="2.2" fill="currentColor" stroke="none" />
      <g strokeWidth="2.2">
        <path d="M12.1 8.2 11.8 14" />
        <path d="M11.8 14l2.2 3.6 1.3 3.9M11.8 14l-1 3.8-2 3.7" />
        <path d="M12.1 8.7l2.3 2.6 1.3 2.4M12.1 8.7l-1.6 2.9-.3 2.7" />
      </g>
    </Icon>
  )
}

export function ModeratePaceIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="13.6" cy="3.9" r="2.2" fill="currentColor" stroke="none" />
      <g strokeWidth="2.4">
        <path d="M12.9 8.2 11.6 13.8" />
        <path d="M11.6 13.8l3.2 3 1.6 4.7M11.6 13.8l-1.8 3.8-3.3 3.9" />
        <path d="M12.8 8.6l2.8 2.7 2.9.8M12.8 8.6l-3.2 1.7-1.7 3" />
      </g>
    </Icon>
  )
}

export function ActivePaceIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="16.4" cy="3.8" r="2.2" fill="currentColor" stroke="none" />
      <g strokeWidth="2.4">
        <path d="M14.6 7.8 11.6 13" />
        <path d="M11.6 13l4 2.6-1.1 5.9M11.6 13l-2.6 4.1H3.5" />
        <path d="M14.6 8l3.4 3 3.2-.9M14.6 8l-4.3-.3-2.9 3" />
      </g>
    </Icon>
  )
}

// Preferences, on Find My Journey.

export function PawIcon({ className }) {
  return (
    <Icon className={className}>
      <g fill="currentColor" stroke="none">
        <ellipse cx="5.4" cy="11.2" rx="2" ry="2.7" transform="rotate(-22 5.4 11.2)" />
        <ellipse cx="9.6" cy="6" rx="2.1" ry="2.9" transform="rotate(-6 9.6 6)" />
        <ellipse cx="14.4" cy="6" rx="2.1" ry="2.9" transform="rotate(6 14.4 6)" />
        <ellipse cx="18.6" cy="11.2" rx="2" ry="2.7" transform="rotate(22 18.6 11.2)" />
        <path d="M12 11c-3.3 0-6.2 3.5-6.2 6.5 0 2.1 1.7 3.2 3.4 3 1-.1 1.8-.7 2.8-.7s1.8.6 2.8.7c1.7.2 3.4-.9 3.4-3 0-3-2.9-6.5-6.2-6.5z" />
      </g>
    </Icon>
  )
}

// A bottle, in a circle with a line through it.
export function NoAlcoholIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M10.6 5.5h2.8v2.7c0 .9 1.6 1.5 1.6 3.3v6a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-6c0-1.8 1.6-2.4 1.6-3.3z" />
      <circle cx="12" cy="12" r="10" />
      <path d="M4.9 4.9l14.2 14.2" />
    </Icon>
  )
}

export function LeafIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M20.5 3.5C12.5 3.7 6 6 5 12.8c-.5 3.6 1.8 6.2 5.4 6.2 7 0 10.1-7.5 10.1-15.5z" />
      <path d="M3.5 21 14.5 9.5M10.2 13.5l.2-3.6M10.2 13.5l3.6.2" />
    </Icon>
  )
}

export function BurgerIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M3.8 10.8c0-3.8 3.6-6.3 8.2-6.3s8.2 2.5 8.2 6.3z" />
      <path d="M8.5 7.7h.01M12 6.9h.01M15.5 7.7h.01" strokeWidth="2" />
      <path d="M2.8 14.3h18.4" />
      <path d="M4 17.8h16c0 1.6-1.1 2.7-2.6 2.7H6.6c-1.5 0-2.6-1.1-2.6-2.7z" />
    </Icon>
  )
}

// On a journey's match on Find My Journey: three stars, one big and two small.
export function ThreeStarsIcon({ className }) {
  return (
    <Icon className={className}>
      <path
        d="M9 4Q9.8 12.2 18 13 9.8 13.8 9 22 8.2 13.8 0 13 8.2 12.2 9 4zM19 1Q19.4 5.1 23.5 5.5 19.4 5.9 19 10 18.6 5.9 14.5 5.5 18.6 5.1 19 1zM19.5 14Q19.8 16.7 22.5 17 19.8 17.3 19.5 20 19.2 17.3 16.5 17 19.2 16.7 19.5 14z"
        fill="currentColor"
        stroke="none"
      />
    </Icon>
  )
}

// The way back from a step of Find My Journey.
export function ArrowLeftIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M20.5 12h-17M9.5 6l-6 6 6 6" />
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
