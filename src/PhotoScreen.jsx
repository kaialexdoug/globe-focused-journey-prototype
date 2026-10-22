import Header from './Header.jsx'
import BottomSheet from './BottomSheet.jsx'
import { CloseIcon } from './Icons.jsx'

// A screen like a Reel: a photo filling it, with a small heading (`kicker`),
// `label` and `title` in the corner, and ✕ in the top corner (`onClose`,
// read out as `closeLabel`). Everything else (`children`) is in a panel
// pulled up from the bottom, its handle saying `sheetLabel`. The panel opens
// with the title again, `sheetKicker` above it, since it covers the one on
// the photo. Journey stops and See Your Journey use it.
function PhotoScreen({
  className,
  photo,
  photoAlt,
  photoPosition,
  kicker,
  label,
  title,
  sheetLabel,
  sheetKicker,
  onClose,
  closeLabel,
  children,
}) {
  return (
    <div className={className ? `photoScreen ${className}` : 'photoScreen'}>
      <img
        className="photoScreenPhoto"
        src={photo}
        alt={photoAlt}
        style={{ objectPosition: photoPosition }}
      />
      <Header />
      <button className="photoScreenClose" onClick={onClose} aria-label={closeLabel}>
        <CloseIcon />
      </button>

      <div className="photoScreenTitle">
        <p className="heroKicker">{kicker}</p>
        <p className="heroLabel">{label}</p>
        <h1 className="heroTitle">{title}</h1>
      </div>

      <BottomSheet label={sheetLabel}>
        <div className="sheetHeading">
          <p className="sheetKicker">{sheetKicker}</p>
          <h2 className="sheetTitle">{title}</h2>
        </div>
        {children}
      </BottomSheet>
    </div>
  )
}

export default PhotoScreen
