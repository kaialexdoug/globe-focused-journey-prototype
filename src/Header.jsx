import { APP_LOGO, APP_NAME } from './config.js'

// The app's name at the top of every screen, with its logo: the origami
// map, in the same navy tile as the app's icon on a phone's home screen.
// (It used to say JAPAN underneath, until there were journeys elsewhere.)
function Header() {
  return (
    <div className="header">
      <img className="headerLogo" src={APP_LOGO} alt="" />
      <p className="title">{APP_NAME.toUpperCase()}</p>
    </div>
  )
}

// "AI", on a journey put together with AI that hasn't been checked yet
// (`aiMade` on its card). On a photo card it sits in the top corner.
export function AiBadge() {
  return <span className="aiBadge">AI</span>
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
