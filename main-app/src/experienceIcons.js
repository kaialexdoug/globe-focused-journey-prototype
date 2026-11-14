import {
  CompassIcon,
  CulinaryIcon,
  HiddenGemIcon,
  InteractiveIcon,
  LeafIcon,
  ParthenonIcon,
  ScenicIcon,
  ToriiIcon,
} from './Icons.jsx'

// The kinds of experience a journey can be, each with its symbol and what it
// means. A journey has as many as fit it (`experiences` on its card), its main
// one first: that's the one shown with it, beside its time, difficulty and
// stops. They're kept apart from the moods on Find My Journey, and are there
// to help match journeys to people later.
export const EXPERIENCES = {
  Scenic: { Icon: ScenicIcon, about: 'Views & landscapes' },
  Cultural: { Icon: ToriiIcon, about: 'Local traditions' },
  Historical: { Icon: ParthenonIcon, about: 'Stories & events' },
  Nature: { Icon: LeafIcon, about: 'Trails & wildlife' },
  Culinary: { Icon: CulinaryIcon, about: 'Food & local flavors' },
  Interactive: { Icon: InteractiveIcon, about: 'Hands-on experiences' },
  'Hidden Gems': { Icon: HiddenGemIcon, about: 'Local secrets' },
  Adventure: { Icon: CompassIcon, about: 'Exploration & discovery' },
}

// A journey's main experience, the one shown with it.
export const mainExperience = (journey) => journey.experiences[0]

// The symbol for each experience, by its name.
export const EXPERIENCE_ICONS = Object.fromEntries(
  Object.entries(EXPERIENCES).map(([name, { Icon }]) => [name, Icon]),
)
