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
        <p className="title">UNFOLD</p>
        <p className="subtitle">JAPAN</p>
      </div>
    </div>
  )
}

// A photo right across the top of the screen, with the header sitting on it
// and a title on its shaded bottom edge. See Your Journey and Memory open
// with it.
// `kicker` is the small red heading, `label` the line above the title, and
// `size` is "isTall" or left out.
export function PhotoHero({ photo, photoAlt, photoPosition, kicker, label, title, size }) {
  return (
    <div className={size ? `photoHero ${size}` : 'photoHero'}>
      <img
        className="photoHeroImg"
        src={photo}
        alt={photoAlt}
        style={{ objectPosition: photoPosition }}
      />
      <Header />
      <div className="photoHeroText">
        {kicker && <p className="heroKicker">{kicker}</p>}
        {label && <p className="heroLabel">{label}</p>}
        <h1 className="heroTitle">{title}</h1>
      </div>
    </div>
  )
}

// The strapline with the line running through it, above a screen's content.
export function SectionHeader({ text }) {
  return (
    <div className="testHeaderContainer">
      <h2 className="testHeader">{text}</h2>
      <div className="divider"></div>
    </div>
  )
}

export default Header
