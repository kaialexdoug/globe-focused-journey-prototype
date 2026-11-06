import { STOP_TYPES } from './journeyStore.js'

// A stop's type (and, for Other, the name of the type) and its title: the
// fields on a new stop's temporary card, and in the Step Editor, which changes
// the title by clicking its heading instead (`withTitle` false). `missing` is
// the fields to outline in red, because they still need filling in.
export default function StopFields({
  idPrefix,
  fields,
  onChange,
  missing = [],
  autoFocus = false,
  withTitle = true,
}) {
  const fieldId = (field) => `${idPrefix}-${field}`

  return (
    <>
      <label className="stopFieldLabel" htmlFor={fieldId('type')}>
        Step type
      </label>
      <select
        id={fieldId('type')}
        className="stopInput"
        value={fields.type}
        onChange={(event) => onChange({ type: event.target.value })}
        aria-invalid={missing.includes('type')}
        autoFocus={autoFocus}
      >
        <option value="" disabled>
          Choose a type
        </option>
        {STOP_TYPES.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>

      {fields.type === 'other' && (
        <>
          <label className="stopFieldLabel" htmlFor={fieldId('otherType')}>
            Type name
          </label>
          <input
            id={fieldId('otherType')}
            className="stopInput"
            value={fields.otherType}
            onChange={(event) => onChange({ otherType: event.target.value })}
            placeholder="e.g. Detour"
            maxLength={40}
            autoComplete="off"
            aria-invalid={missing.includes('otherType')}
          />
        </>
      )}

      {withTitle && (
        <>
          <label className="stopFieldLabel" htmlFor={fieldId('title')}>
            Step title
          </label>
          <input
            id={fieldId('title')}
            className="stopInput"
            value={fields.title}
            onChange={(event) => onChange({ title: event.target.value })}
            placeholder="e.g. Kawagoe Station"
            maxLength={80}
            autoComplete="off"
            aria-invalid={missing.includes('title')}
          />
        </>
      )}
    </>
  )
}

const MISSING_WORDS = {
  type: 'choose a step type',
  otherType: 'type the name of the type',
  title: 'give it a title',
}

// What still needs filling in, in words: "To confirm, choose a step type and
// give it a title." `lead` is how it starts.
export function MissingNote({ missing, lead }) {
  return (
    <p className="stopMissing" role="alert">
      {lead}
      {missing.map((field) => MISSING_WORDS[field]).join(' and ')}.
    </p>
  )
}
