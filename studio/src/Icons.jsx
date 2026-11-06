// The studio's symbols, drawn in lines like the app's, in whatever colour the
// words around them are.

function Icon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function SearchIcon() {
  return (
    <Icon>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </Icon>
  )
}

export function PlusIcon() {
  return (
    <Icon>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  )
}

// An arrow out of a doorway, for leaving the editor.
export function ExitIcon() {
  return (
    <Icon>
      <path d="M14 4.5h4.5v15H14" />
      <path d="M15 12H4.5M8.5 8l-4 4 4 4" />
    </Icon>
  )
}

export function SaveIcon() {
  return (
    <Icon>
      <path d="M5 4.5h11l3 3v12H5z" />
      <path d="M8 4.5v4.5h7V4.5M8 19.5v-5.5h8v5.5" />
    </Icon>
  )
}

export function CheckIcon() {
  return (
    <Icon>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Icon>
  )
}

export function TrashIcon() {
  return (
    <Icon>
      <path d="M4.5 7h15M9.5 7V4.5h5V7" />
      <path d="M6.5 7l1 13h9l1-13M10.5 11v5M13.5 11v5" />
    </Icon>
  )
}

export function PencilIcon() {
  return (
    <Icon>
      <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z" />
      <path d="m13.5 6.5 4 4" />
    </Icon>
  )
}
