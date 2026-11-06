// The Unfold survey's back end: a Google Apps Script web app attached to the
// Google Sheet the answers go into. Each FINISH SURVEY in the app sends one
// survey here, and it's added to the sheet as a new row. The app's side is
// in src/SurveyPage.jsx.
//
// This file isn't part of the app itself. It's a copy of what's deployed, to
// paste into the sheet's Extensions → Apps Script editor. After changing it
// there, publish the change with Deploy → Manage deployments → (pencil) →
// Version: New version → Deploy. That keeps the same web app URL.

// The first row of the sheet. Added automatically if the sheet is empty.
const HEADERS = [
  'Submitted at',
  'Name',
  'What stood out most',
  'Another journey like this?',
  'Would have bought it for $5? Why?',
  'Traveler type',
  'Detours taken',
  'Journey',
]

function doPost(e) {
  const survey = JSON.parse(e.postData.contents)
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
  }

  sheet.appendRow([
    new Date(),
    asText(survey.name),
    asText(survey.standout),
    asText(survey.anotherJourney),
    asText(survey.wouldBuy),
    asText(survey.travelerType),
    asText(survey.detoursTaken),
    asText(survey.journey),
  ])

  return reply({ ok: true })
}

// Visiting the URL in a browser just says it's working. Nothing is saved.
function doGet() {
  return reply({ ok: true, app: 'Unfold survey' })
}

// An answer as plain text. One starting with = + - or @ would otherwise be
// read by the sheet as a formula, so it gets a ' in front to keep it as text.
function asText(value) {
  const text = String(value ?? '')
  return /^[=+\-@]/.test(text) ? "'" + text : text
}

function reply(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON)
}
