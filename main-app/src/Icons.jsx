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

// Who's joining, on Find My Journey, drawn after its mockup: people as a head
// over shoulders, all the same height (32), wider for more people. On your
// own, or as a couple (the second just behind the first), each with a line
// along the bottom; as a family (two grown-ups with a child between them) or
// with friends (one in the middle, with two just behind), open at the bottom.

function Figure({ className, width, children }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} 32`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function SoloIcon({ className }) {
  return (
    <Figure className={className} width={32}>
      <circle cx="16" cy="8.5" r="5.4" />
      <path d="M4 28A12 12 0 0 1 28 28Z" />
    </Figure>
  )
}

export function CoupleIcon({ className }) {
  return (
    <Figure className={className} width={52}>
      <circle cx="16" cy="8.5" r="5.4" />
      <path d="M4 28A12 12 0 0 1 28 28Z" />
      <circle cx="36" cy="8.5" r="5.4" />
      <path d="M27.3 19.7A12 12 0 0 1 48 28H30.5" />
    </Figure>
  )
}

export function FamilyIcon({ className }) {
  return (
    <Figure className={className} width={60}>
      <circle cx="13" cy="7.5" r="5" />
      <path d="M3 30A10 14.5 0 0 1 20.7 21.2" />
      <circle cx="47" cy="7.5" r="5" />
      <path d="M57 30A10 14.5 0 0 0 39.3 21.2" />
      <circle cx="30" cy="18.4" r="3.6" />
      <path d="M22.5 30A7.5 7.5 0 0 1 37.5 30" />
    </Figure>
  )
}

export function GroupIcon({ className }) {
  return (
    <Figure className={className} width={56}>
      <circle cx="28" cy="7" r="5" />
      <path d="M18 30A10 14.5 0 0 1 38 30" />
      <circle cx="11.5" cy="12.5" r="4.2" />
      <path d="M3 30A8.5 10.5 0 0 1 17.5 22.6" />
      <circle cx="44.5" cy="12.5" r="4.2" />
      <path d="M53 30A8.5 10.5 0 0 0 38.5 22.6" />
    </Figure>
  )
}

export function HeartIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M12 20.5S3 15.2 3 9a4.9 4.9 0 0 1 9-2.7A4.9 4.9 0 0 1 21 9c0 6.2-9 11.5-9 11.5z" />
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

// A beach umbrella over the waves.
export function BeachIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M3.5 10.5C4 6 7.6 3 12 3s8 3 8.5 7.5c-1.4-1-2.9-1-4.25 0-1.4-1-2.9-1-4.25 0-1.4-1-2.9-1-4.25 0-1.4-1-2.9-1-4.25 0z" />
      <path d="M12 10.5v7.5" />
      <path d="M2.5 20.5q2.4-1.6 4.75 0t4.75 0 4.75 0 4.75 0" />
    </Icon>
  )
}

// Three buildings, the middle one tallest.
export function CityIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M2.5 21h19" />
      <path d="M4.5 21V10.5h5M9.5 21V3.5h6.5V21M16 12.5h3.5V21" />
      <path d="M12.3 7h1M12.3 10.5h1M12.3 14h1M6.6 14h.9M6.6 17.3h.9M17.3 16h.4" strokeWidth="2" />
    </Icon>
  )
}

// A mountain with snow on top, drawn in outline like the others here (the
// solid MountainIcon is for a scenic journey).
export function HikingIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M2 20 9 7.5l4 6.9 2.6-4L22 20z" />
      <path d="M6.8 11.4 8.6 12.7l1.8-1.4" />
    </Icon>
  )
}

export function DollarIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M12 2.5v19" />
      <path d="M16.6 7.3c-.9-1.3-2.5-1.9-4.6-1.9-2.6 0-4.4 1.3-4.4 3.2 0 4.5 9 2.6 9 7.1 0 2-1.9 3.3-4.6 3.3-2.2 0-3.9-.7-4.9-2.1" />
    </Icon>
  )
}

// Profile, after its mockup: the cog for Settings, and the pencil on Edit
// Profile.

export function SettingsIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M10.14 5.05 10.5 2.52h3l.36 2.53A7.2 7.2 0 0 1 15.6 5.76l2.04-1.53 2.13 2.13-1.53 2.04a7.2 7.2 0 0 1 .71 1.74l2.53.36v3l-2.53.36a7.2 7.2 0 0 1-.71 1.74l1.53 2.04-2.13 2.13-2.04-1.53a7.2 7.2 0 0 1-1.74.71l-.36 2.53h-3l-.36-2.53a7.2 7.2 0 0 1-1.74-.71l-2.04 1.53-2.13-2.13 1.53-2.04a7.2 7.2 0 0 1-.71-1.74l-2.53-.36v-3l2.53-.36a7.2 7.2 0 0 1 .71-1.74L4.23 6.36l2.13-2.13 2.04 1.53a7.2 7.2 0 0 1 1.74-.71z" />
      <circle cx="12" cy="12" r="3.2" />
    </Icon>
  )
}

export function PencilIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M4.5 19.5l.9-4.1L15.9 4.9a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.6 18.6z" />
      <path d="M14.2 6.6l3.2 3.2" />
    </Icon>
  )
}

// Interests on Profile: outdoors and food use the mountain and burger from
// above, and local culture the torii from below.

export function CameraIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M3 9a2 2 0 0 1 2-2h2.4l1.6-2.5h6l1.6 2.5H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="13.2" r="3.8" />
    </Icon>
  )
}

export function BicycleIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="5.5" cy="16" r="3.6" />
      <circle cx="18.5" cy="16" r="3.6" />
      <path d="M5.5 16 9.2 9h6.6l2.7 7M9.2 9l2.8 7H5.5M12 16l3.8-7M7.6 7h3M14.6 6.5h2.4" />
    </Icon>
  )
}

export function TrainIcon({ className }) {
  return (
    <Icon className={className}>
      <rect x="5" y="3" width="14" height="14" rx="3" />
      <path d="M5 10h14M9.5 6h5M8 21l2-4M16 21l-2-4" />
      <path d="M8.8 13.6h.01M15.2 13.6h.01" strokeWidth="2.6" />
    </Icon>
  )
}

export function FishIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M2.5 12c2.2-3.7 5.6-5.6 9.4-5.6 3.2 0 5.7 1.7 7.1 3.6L22 7.8v8.4L19 14c-1.4 1.9-3.9 3.6-7.1 3.6-3.8 0-7.2-1.9-9.4-5.6z" />
      <path d="M7.4 11.2h.01" strokeWidth="2.4" />
    </Icon>
  )
}

// Preferences on Profile: accessibility and history. (Dietary has the burger,
// and travel pace the walking figure, from above.)

// Someone in a wheelchair.
export function AccessibilityIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="10.5" cy="4" r="1.9" fill="currentColor" stroke="none" />
      <path d="M10.5 7.6v6h5.4l2.6 5.6M10.5 10.6h5" />
      <path d="M7.8 11.3a5 5 0 1 0 7.4 6.4" />
    </Icon>
  )
}

// A temple with columns, like the Parthenon.
export function ParthenonIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M3 8.5 12 4l9 4.5z" />
      <path d="M6 11v7M10 11v7M14 11v7M18 11v7M4.5 18.5h15M3 21h18" />
    </Icon>
  )
}

// Step 3 of Find My Journey, after its mockup: a calendar for when you're
// going, sliders for anything else, and the tick on what's picked.

export function CalendarIcon({ className }) {
  return (
    <Icon className={className}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="M7.6 13.2h.9M11.6 13.2h.9M15.6 13.2h.9M7.6 16.6h.9M11.6 16.6h.9M15.6 16.6h.9" strokeWidth="2" />
    </Icon>
  )
}

export function SlidersIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M2.5 8h10M17.5 8h4M2.5 16h4M11.5 16h10" />
      <circle cx="15" cy="8" r="2.5" />
      <circle cx="9" cy="16" r="2.5" />
    </Icon>
  )
}

export function CheckIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="m5.5 12.5 4.2 4.2 8.8-9.4" strokeWidth="2.8" />
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
