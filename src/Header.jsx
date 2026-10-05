// The app name at the top of every screen, with its small mark: a globe in a
// viewfinder, with a red sun as the point it's focused on.

export function Logo({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path className="logoFrame" d="M1 8 V1 H8 M24 1 H31 V8 M31 24 V31 H24 M8 31 H1 V24" />
      <circle className="logoLine" cx="16" cy="16" r="10" />
      <ellipse className="logoLine" cx="16" cy="16" rx="4.2" ry="10" />
      <path className="logoLine" d="M6 16 H26" />
      <circle className="logoSun" cx="20.5" cy="11.5" r="3" />
    </svg>
  )
}

function Header() {
  return (
    <div className="header">
      <Logo className="headerLogo" />
      <div>
        <p className="title">GLOBE FOCUSED</p>
        <p className="subtitle">JAPAN</p>
      </div>
    </div>
  )
}

export default Header
