// The pins for a stop on Google's maps, shared by the map of the whole route
// on See Your Journey (RouteMap.jsx) and the live map on a stop's directions
// screen (LiveMap.jsx): the stop's photo in a circle, with its number on the
// route in a little badge if it has one, and its name beside it, on
// whichever side is clearest. Their look is in App.css (.mapPin).

// A stop's pin: the photo (with its number) and the name, as two pins on the
// map. The names go over all the photos, so a name that brushes another
// stop's photo is never hidden behind it. `photoPin` and `namePin` are what
// to put on the map; `photo` and `name` are what's measured to place the
// name. A detour's pin is smaller, with a dashed ring, and a `large` one is
// for a map with just the one stop. The name's a shorter one for maps
// (`mapName`) if the stop has one.
export function makePin(stop, { number = null, detour = false, large = false } = {}) {
  const kind = ['mapPin', detour && 'isDetour', large && 'isLarge'].filter(Boolean).join(' ')

  const photoPin = document.createElement('div')
  photoPin.className = kind
  const photo = document.createElement('img')
  photo.className = 'mapPinPhoto'
  photo.src = stop.photo
  photo.alt = ''
  if (stop.photoPosition) {
    photo.style.objectPosition = stop.photoPosition
  }
  photoPin.append(photo)
  if (number) {
    const badge = document.createElement('span')
    badge.className = 'mapPinNumber'
    badge.textContent = number
    photoPin.append(badge)
  }

  // The name, in a holder the same size as the photo, so it lines up.
  const namePin = document.createElement('div')
  namePin.className = `${kind} isName`
  namePin.dataset.side = 'right'
  const name = document.createElement('span')
  name.className = 'mapPinName'
  name.textContent = stop.mapName ?? stop.name
  namePin.append(name)

  return { photoPin, namePin, photo, name, detour, numbered: Boolean(number) }
}

// Where a stop's name can go around its photo, best first: beside it, then
// under or over it, then tucked against one of its corners. At the top left,
// where a stop's number is, the name sits just above the number instead.
const SIDES = ['right', 'left', 'below', 'above', 'above-right', 'below-right', 'below-left', 'above-left']

// The gap between a photo and a name beside it, how far a name at a corner
// tucks in over the photo, and, at the top left, how far above the photo the
// name sits and how far it reaches in, all as in App.css.
const NAME_GAP = 5
const CORNER_TUCK = 6
const OVER_NUMBER = 6
const OVER_NUMBER_REACH = 10

// How far a stop's number pokes out from the top left of its photo.
const NUMBER_OVERHANG = 5

// A name this close to another stop's photo could be taken for that stop's.
const TOO_CLOSE = 10

// A detour's name, when it has nowhere clear to go, is left off rather than
// put where it'd hide another stop or look like its name: the detour still
// shows by its dashed ring and the key. (Never just to save a little
// overlap.) A stop on the route always keeps its name, in the clearest spot
// there is.
const LEAVE_OFF_DETOUR = 800

// How much of rectangle `a` overlaps `b`.
function overlap(a, b) {
  const width = Math.min(a.right, b.right) - Math.max(a.left, b.left)
  const height = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
  return width > 0 && height > 0 ? width * height : 0
}

// How close rectangles `a` and `b` come, or 0 if they touch.
function gapBetween(a, b) {
  const across = Math.max(0, a.left - b.right, b.left - a.right)
  const down = Math.max(0, a.top - b.bottom, b.top - a.bottom)
  return Math.hypot(across, down)
}

// Where a name `width` by `height` would sit, on one side of a photo.
function nameAt(side, photo, width, height) {
  let left = (photo.left + photo.right - width) / 2
  let top = (photo.top + photo.bottom - height) / 2
  if (side === 'right') left = photo.right + NAME_GAP
  if (side === 'left') left = photo.left - NAME_GAP - width
  if (side === 'below') top = photo.bottom + NAME_GAP
  if (side === 'above') top = photo.top - NAME_GAP - height
  if (side === 'above-right') top = photo.top + CORNER_TUCK - height
  if (side.endsWith('-right')) left = photo.right - CORNER_TUCK
  if (side.startsWith('below-')) top = photo.bottom - CORNER_TUCK
  if (side === 'below-left') left = photo.left + CORNER_TUCK - width
  if (side === 'above-left') {
    left = photo.left + OVER_NUMBER_REACH - width
    top = photo.top - OVER_NUMBER - height
  }
  return { left, top, right: left + width, bottom: top + height }
}

// How many spots around its photo each name tries: all of them, unless
// there are lots of stops. Every way of combining them is tried, so this
// keeps it quick.
function spotsToTry(stops) {
  return stops <= 6 ? SIDES.length : 4
}

// Puts each stop's name wherever around its photo it covers least: the
// other photos, the other names, and the edges of the map, without sitting
// right by another stop's photo. So stops close together, like the three
// around Waseda, don't hide each other's names or mix them up, and a stop
// near the edge has its name on the side that's on the map.
//
// First, each name's best few spots on its own (clear of the edges and the
// other photos and their numbers), and for a detour, leaving it off. Then
// every way of putting those together, keeping the one where the names
// cover least of everything, each other included.
function placeNames(canvas, pins) {
  const edge = canvas.getBoundingClientRect()
  const map = { left: edge.left + 4, top: edge.top + 4, right: edge.right - 4, bottom: edge.bottom - 4 }
  const photos = pins.map((pin) => pin.photo.getBoundingClientRect())
  // What's in a name's way: each photo, with its number.
  const inTheWay = photos.map((photo, index) =>
    pins[index].numbered
      ? { left: photo.left - NUMBER_OVERHANG, top: photo.top - NUMBER_OVERHANG, right: photo.right, bottom: photo.bottom }
      : photo
  )

  const choices = pins.map((pin, index) => {
    const { offsetWidth: width, offsetHeight: height } = pin.name
    const spots = SIDES.map((side, order) => {
      const spot = nameAt(side, photos[index], width, height)
      // Off the map is worse than over a photo.
      let covered = (width * height - overlap(spot, map)) * 3
      inTheWay.forEach((photo, other) => {
        if (other !== index) {
          covered += overlap(spot, photo)
          // Right up against another stop's photo, it'd look like its name.
          covered += Math.max(0, TOO_CLOSE - gapBetween(spot, photo)) * 100
        }
      })
      // Between two equally good spots, the one earlier in SIDES.
      return { side, spot, covered: covered + order / 100 }
    })
      .sort((a, b) => a.covered - b.covered)
      .slice(0, spotsToTry(pins.length))
    if (pin.detour) {
      spots.push({ side: 'hidden', spot: null, covered: LEAVE_OFF_DETOUR })
    }
    return spots
  })

  let best = { covered: Infinity, picks: null }
  const picks = []
  function tryFrom(index, coveredSoFar) {
    // Already worse than the best so far: no need to go on.
    if (coveredSoFar >= best.covered) {
      return
    }
    if (index === pins.length) {
      best = { covered: coveredSoFar, picks: [...picks] }
      return
    }
    for (const choice of choices[index]) {
      let covered = coveredSoFar + choice.covered
      picks.forEach((pick) => {
        // Over another name is worse than over a photo.
        if (choice.spot && pick.spot) {
          covered += overlap(choice.spot, pick.spot) * 2
        }
      })
      picks.push(choice)
      tryFrom(index + 1, covered)
      picks.pop()
    }
  }
  tryFrom(0, 0)

  best.picks.forEach((pick, index) => {
    pins[index].namePin.dataset.side = pick.side
  })
}

// Something to call whenever the map's settled (Google's 'idle'), that
// places the names (placeNames) once the pins are on it: Google adds them a
// moment after it says the map's ready. It stops once the map's gone.
export function namePlacer(canvas, pins) {
  let waiting = 0
  return function placeWhenShown() {
    cancelAnimationFrame(waiting)
    waiting = requestAnimationFrame(() => {
      if (!canvas.isConnected) {
        return
      }
      if (pins.some((pin) => !pin.namePin.isConnected || !pin.name.offsetWidth)) {
        placeWhenShown()
      } else {
        placeNames(canvas, pins)
      }
    })
  }
}
