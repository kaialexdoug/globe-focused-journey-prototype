import logo from './assets/unfold-logo.png'

// The logo and "Unfold Studio", at the start of the bar across the top.
export default function StudioBrand() {
  return (
    <>
      <img className="studioLogo" src={logo} alt="" />
      <span className="studioName">
        Unfold <span className="studioNameSoft">Studio</span>
      </span>
    </>
  )
}
