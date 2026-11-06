# Archived: journeys, map and walk screens

This is the earlier, bigger version of the prototype: the Journeys tab, the
Map tab (Leaflet), the live walk screen, and the 7-question quiz with six
result types. None of it had been committed to git, so it was moved here
rather than deleted.

The app in `src/` was cut back to the first part of the flow chart:
Opening Screen → Find My Journey → quiz → traveler type. Everything after
that depends on journeys that haven't been planned yet.

`App.jsx` and `App.css` here are copies of the old versions. Their import
paths point at `src/` and will need fixing if any of this is brought back.
The `leaflet` dependency is still in `package.json` for the same reason.

This folder is ignored by ESLint and never bundled by Vite.
