// Unfold's photo treatment (Journey Engine V2 handoff, section 4.2): makes
// the copy of each journey photo the app uses from its untouched original,
// with the base look and the journey's mood on top (photo-originals/
// looks.json), and checks the result against the original.
//
//   npm run photos                       every photo in the manifest
//   npm run photos -- --only marunouchi  one journey's
//   npm run photos -- --compare <dir>    also save each original beside its
//                                        treated copy in <dir>, to look over
//   npm run photos -- --fetch            first download any original that
//                                        isn't on this computer, from its
//                                        `download_url` (the originals aren't
//                                        kept in git)
//
// For each photo in photo-originals/manifest.json, it:
//   1. turns it the right way up (from its EXIF) and sizes it for its role,
//   2. applies the base look, then the primary mood's recipe at its role's
//      strength (the hero at full strength, stop and nearby photos at half),
//   3. saves it as a JPEG where the app imports it from (`processed`),
//   4. checks it against the original, sized the same: how much of it is
//      clipped to white or crushed to black, and how far its saturation's
//      moved. Past the limits in looks.json, it tries again with half the
//      mood, then the base look alone, and if none pass, it's marked for
//      review.
// Then it writes into the manifest what was done (the look and mood
// versions, the settings, the size) and the check's results, so any photo
// can be made again the same way, or again when the looks change.

import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const appRoot = path.resolve(import.meta.dirname, '..')
const originalsDir = path.join(appRoot, 'photo-originals')
const manifestPath = path.join(originalsDir, 'manifest.json')
const looks = JSON.parse(fs.readFileSync(path.join(originalsDir, 'looks.json'), 'utf8'))
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

const args = process.argv.slice(2)
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null
const compareDir = args.includes('--compare') ? args[args.indexOf('--compare') + 1] : null
const fetchMissing = args.includes('--fetch')

// Downloads an original that isn't here yet, from exactly where it first
// came from. Wikimedia asks for a client name; this one says nothing about
// whose computer it is.
async function fetchOriginal(image, file) {
  // Wikimedia sometimes answers a quick run of requests with an error page,
  // so a failed try waits a little longer each time, up to four tries.
  for (let attempt = 1; ; attempt += 1) {
    // A dropped connection is tried again like a refused download.
    let response
    let bytes
    try {
      response = await fetch(image.download_url, { headers: { 'User-Agent': 'UnfoldPhotoPipeline/1.0' } })
      bytes = Buffer.from(await response.arrayBuffer())
    } catch (error) {
      if (attempt === 4) throw new Error(`${image.image_id}: download failed (${error.message})`)
      await new Promise((resolve) => setTimeout(resolve, 4000 * attempt))
      continue
    }
    if (response.ok && bytes[0] === 0xff && bytes[1] === 0xd8) {
      fs.mkdirSync(path.dirname(file), { recursive: true })
      fs.writeFileSync(file, bytes)
      console.log(`fetched ${image.original}`)
      // Gently, one at a time.
      await new Promise((resolve) => setTimeout(resolve, 1500))
      return
    }
    if (attempt === 4) throw new Error(`${image.image_id}: download failed (${response.status}, or not a JPEG)`)
    // When Wikimedia says how long to wait (it asks for 10 minutes after too
    // many full-size downloads), wait that long, up to 15 minutes.
    const asked = Number(response.headers.get('retry-after'))
    const wait = asked > 0 ? Math.min(asked, 900) * 1000 : 4000 * attempt
    if (asked > 0) console.log(`${image.image_id}: Wikimedia asked to wait ${Math.round(wait / 60000)} min; waiting`)
    await new Promise((resolve) => setTimeout(resolve, wait))
  }
}

const STEPS = ['contrast', 'saturation', 'brightness', 'warmth', 'green', 'sharpen']

// The base look with the mood on top, at `strength`.
function settingsFor(mood, strength) {
  const settings = {}
  for (const step of STEPS) {
    settings[step] = Math.round(((looks.base[step] ?? 0) + (mood[step] ?? 0) * strength) * 10000) / 10000
  }
  return settings
}

// The photo, the right way up and sized to fit within `longEdge`.
function sized(file, longEdge) {
  return sharp(file).rotate().resize({ width: longEdge, height: longEdge, fit: 'inside', withoutEnlargement: true })
}

// Where the tone curve starts easing off, at each end: tones between these
// are changed exactly as the settings say, and the ones beyond are eased in
// so the brightest still just reach white and the darkest just reach black,
// rather than being cut off (so the treatment never clips or crushes more
// than the original).
const KNEE = 0.85
const TOE = 0.12

// Eases `value`, which can run from `low` (below 0) to `high` (above 1),
// back into 0 to 1: unchanged between the toe and the knee, and bending
// smoothly (with no jump in slope) towards black and white beyond them.
function eased(value, low, high) {
  if (value > KNEE && high > 1) {
    const over = value - KNEE
    const span = high - KNEE
    const bend = (span - (1 - KNEE)) / (span * span)
    return Math.min(1, KNEE + over - bend * over * over)
  }
  if (value < TOE && low < 0) {
    const under = TOE - value
    const span = TOE - low
    const bend = (span - TOE) / (span * span)
    return Math.max(0, TOE - (under - bend * under * under))
  }
  return Math.min(1, Math.max(0, value))
}

// The treatment itself, pixel by pixel. Contrast pivots on the middle grey;
// warmth and green are gains on their channels, so they move the bright
// tones most ("warm highlights"); brightness lifts everything; then the
// tones are eased back in at the ends, and the colour's strengthened or
// softened around each pixel's own brightness. Then a gentle sharpen.
async function treated(image, settings) {
  const { data, info } = await image.removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const contrast = settings.contrast
  const gains = [1 + settings.warmth, 1 + settings.green, 1 - settings.warmth]
  const lift = 1 + settings.brightness
  const saturation = 1 + settings.saturation
  // How far past white, and below black, the settings can push a tone.
  const high = (0.5 + 0.5 * (1 + contrast)) * Math.max(...gains) * lift
  const low = (0.5 - 0.5 * (1 + contrast)) * Math.max(...gains) * lift
  const out = Buffer.alloc(data.length)
  const rgb = [0, 0, 0]
  for (let i = 0; i < data.length; i += info.channels) {
    for (let c = 0; c < 3; c += 1) {
      const toned = ((data[i + c] / 255 - 0.5) * (1 + contrast) + 0.5) * gains[c] * lift
      rgb[c] = eased(toned, Math.min(low, 0), Math.max(high, 1))
    }
    const light = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
    for (let c = 0; c < 3; c += 1) {
      const coloured = light + (rgb[c] - light) * saturation
      out[i + c] = Math.round(Math.min(1, Math.max(0, coloured)) * 255)
    }
  }
  let result = sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } })
  if (settings.sharpen > 0) {
    result = result.sharpen({ sigma: settings.sharpen })
  }
  return result
}

// How much of a photo is clipped to white or crushed to black, and how
// saturated it is on average, from a small copy.
async function measure(buffer) {
  const { data, info } = await sharp(buffer)
    .resize(320, 320, { fit: 'inside' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const pixels = info.width * info.height
  let clipped = 0
  let crushed = 0
  let saturation = 0
  for (let i = 0; i < data.length; i += info.channels) {
    const max = Math.max(data[i], data[i + 1], data[i + 2])
    const min = Math.min(data[i], data[i + 1], data[i + 2])
    if (max >= 254) clipped += 1
    if (max <= 3) crushed += 1
    saturation += max === 0 ? 0 : (max - min) / max
  }
  return { clipped: clipped / pixels, crushed: crushed / pixels, saturation: saturation / pixels }
}

const round = (value) => Math.round(value * 10000) / 10000

let count = 0
for (const image of manifest.images) {
  if (only && image.journey_id !== only) continue
  const mood = looks.moods[image.primary_mood]
  if (!mood) throw new Error(`${image.image_id}: no recipe for the mood "${image.primary_mood}"`)
  const { longEdge, quality } = looks.export[image.role]
  const original = path.join(originalsDir, image.original)
  const output = path.join(appRoot, image.processed)
  if (!fs.existsSync(original)) {
    if (!fetchMissing) throw new Error(`${image.image_id}: ${image.original} isn't here. Run with --fetch to download it.`)
    await fetchOriginal(image, original)
  }
  const before = await sized(original, longEdge).jpeg({ quality: 95 }).toBuffer()
  const was = await measure(before)

  // At its role's strength first. If that fails the check, again at half the
  // mood, then with the base look alone; if even that fails, it's kept at
  // its role's strength and marked for review by eye.
  const fullStrength = looks.strength[image.role]
  let strength
  let settings
  let after
  let now
  let reasons
  for (const tryStrength of [fullStrength, fullStrength / 2, 0, fullStrength]) {
    strength = tryStrength
    settings = settingsFor(mood, strength)
    after = await (await treated(sized(original, longEdge), settings)).jpeg({ quality, mozjpeg: true }).toBuffer()
    now = await measure(after)
    reasons = []
    if (now.clipped - was.clipped > looks.qa.maxExtraClipped) reasons.push('clips more of the highlights')
    if (now.crushed - was.crushed > looks.qa.maxExtraCrushed) reasons.push('crushes more of the shadows')
    if (Math.abs(now.saturation - was.saturation) > looks.qa.maxSaturationShift) reasons.push('saturation moved too far')
    if (!reasons.length) break
  }
  fs.mkdirSync(path.dirname(output), { recursive: true })
  fs.writeFileSync(output, after)
  const { width, height } = await sharp(after).metadata()

  image.treatment = {
    base_look_id: looks.base.id,
    base_look_version: looks.base.version,
    mood_filter_id: mood.id,
    mood_filter_version: mood.version,
    strength,
    // Less than its role's strength if the full treatment failed the check.
    reduced: strength !== fullStrength,
    settings,
  }
  image.processed_size = { width, height, bytes: after.length }
  image.qa = {
    clipped: { before: round(was.clipped), after: round(now.clipped) },
    crushed: { before: round(was.crushed), after: round(now.crushed) },
    saturation: { before: round(was.saturation), after: round(now.saturation) },
    reasons,
  }
  image.quality_status = reasons.length ? 'review' : 'passed'
  image.processed_at = new Date().toISOString()

  if (compareDir) {
    fs.mkdirSync(compareDir, { recursive: true })
    const half = await sharp(before).resize({ height: 600 }).toBuffer()
    const halfAfter = await sharp(after).resize({ height: 600 }).toBuffer()
    const { width: w } = await sharp(half).metadata()
    await sharp({ create: { width: w * 2 + 10, height: 600, channels: 3, background: '#ffffff' } })
      .composite([
        { input: half, left: 0, top: 0 },
        { input: halfAfter, left: w + 10, top: 0 },
      ])
      .jpeg({ quality: 85 })
      .toFile(path.join(compareDir, `${image.image_id}.jpg`))
  }

  count += 1
  const note = reasons.length ? `  (${reasons.join(', ')})` : strength !== fullStrength ? `  (mood at ${strength} to pass the check)` : ''
  console.log(`${image.quality_status === 'passed' ? 'ok    ' : 'REVIEW'} ${image.image_id}  ${width}x${height}  ${Math.round(after.length / 1024)} KB${note}`)
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`${count} photo${count === 1 ? '' : 's'} treated; manifest updated.`)
