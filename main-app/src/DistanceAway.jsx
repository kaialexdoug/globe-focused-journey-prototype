import { DistanceIcon } from './Icons.jsx'
import { distanceParts, metersAway, useHere } from './distance.js'
import { useUnits } from './units.js'

// How far a journey is from you (distance.js), with the little arrow before
// it and the number in bold: "5,832 mi", or with `away`, "5,832 mi away".
// Nothing at all until where you are is known. `className` says where it
// goes: on the feed after the place (feedAway), or in the top corner of a
// journey card (cardAway).
function DistanceAway({ journey, className, away = false }) {
  const units = useUnits()
  const here = useHere()
  const meters = metersAway(here, journey)
  if (meters === null) {
    return null
  }
  const { value, unit } = distanceParts(meters, units)
  return (
    <span className={className}>
      <DistanceIcon />
      <span>
        <b>{value}</b> {unit}
        {away && ' away'}
      </span>
    </span>
  )
}

export default DistanceAway
