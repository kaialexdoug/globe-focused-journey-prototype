// The bar along the bottom. Three tabs, thin line icons to match the rest of
// the app, and nothing else.
//
// It is hidden while someone is actually mid-walk — see App.jsx — because the
// journey screen is meant to stay quiet.

// Small stroked icons, drawn inline so there is no extra file to load and they
// inherit their colour from the tab.
const ICONS = {
  home: 'M3 11 L12 3 L21 11 M6 10 V20 H18 V10',
  journeys: 'M5 19 C5 12, 12 16, 12 10 C12 5, 18 7, 19 5',
  map: 'M12 21 S5 14 5 9 A7 7 0 0 1 19 9 C19 14 12 21 12 21 Z',
}

const TABS = [
  { id: 'home', label: 'HOME' },
  { id: 'journeys', label: 'JOURNEYS' },
  { id: 'map', label: 'MAP' },
]

function NavBar({ tab, onSelect }) {
  return (
    <nav className="navBar">
      {TABS.map((item) => (
        <button
          key={item.id}
          className={tab === item.id ? 'navItem isActive' : 'navItem'}
          onClick={() => onSelect(item.id)}
        >
          <svg className="navIcon" viewBox="0 0 24 24" aria-hidden="true">
            <path d={ICONS[item.id]} />
            {item.id === 'journeys' && (
              <>
                <circle cx="5" cy="19" r="1.6" />
                <circle cx="19" cy="5" r="1.6" />
              </>
            )}
            {item.id === 'map' && <circle cx="12" cy="9" r="2.4" />}
          </svg>
          <span className="navLabel">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

export default NavBar
