import Header from './Header.jsx'
import { CloseIcon } from './Icons.jsx'

// A screen in three parts, top to bottom:
//
// - A photo, about a third of the screen, with the header on it and ✕ in the
//   top corner (`onClose`, read out as `closeLabel`).
// - What this screen is about: a small heading (`kicker`), `label` if there is
//   one, and `title`, starting on the photo's faded bottom edge.
// - Everything else (`children`), which scrolls on its own. The photo and
//   the title stay where they are.
//
// Journey steps and See Your Journey use it.
function PhotoScreen({
  className,
  photo,
  photoAlt,
  photoPosition,
  kicker,
  label,
  title,
  onClose,
  closeLabel,
  children,
}) {
  return (
    <div className={className ? `photoScreen ${className}` : 'photoScreen'}>
      <div className="photoScreenPhoto">
        <img className="photoScreenImg" src={photo} alt={photoAlt} style={{ objectPosition: photoPosition }} />
        <Header />
        <button className="photoScreenClose" onClick={onClose} aria-label={closeLabel}>
          <CloseIcon />
        </button>
      </div>

      <div className="photoScreenTitle">
        <p className="heroKicker">{kicker}</p>
        {label && <p className="heroLabel">{label}</p>}
        <h1 className="photoScreenName">{title}</h1>
      </div>

      <div className="photoScreenInfo">{children}</div>
    </div>
  )
}

export default PhotoScreen
