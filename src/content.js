/*
 * ─────────────────────────────────────────────────────────────
 *  ALL EDITABLE AFTER-PARTY DETAILS LIVE IN THIS FILE.
 *  Change text here — no need to touch any other file.
 *
 *  Anything marked TODO or PLACEHOLDER still needs real
 *  information before the invite goes out.
 *
 *  This is the *after-party* invite — sent to guests joining
 *  after the ceremony and dinner. The full-day invite is a
 *  separate site: https://j-etienne1.github.io/wedding-invite-demo/
 *  Venue, address, maps link and dress code are deliberately
 *  identical between the two. If one changes, change both.
 * ─────────────────────────────────────────────────────────────
 */

// Live site (GitHub Pages). If the repo is ever renamed or moved to a custom
// domain, update this AND the `base` option in vite.config.js AND the absolute
// og:/twitter: URLs in index.html — link previews break silently otherwise.
export const SITE_URL = 'https://j-etienne1.github.io/afters-invite'

// Vite serves this project from a sub-path, so asset URLs must be built from
// BASE_URL rather than hard-coded with a leading slash.
const asset = (file) => `${import.meta.env.BASE_URL}${file}`

export const couple = {
  eyebrow: 'Vows said. Dinner done. You are cordially summoned to the after party of',
  nameOne: 'Debbie',
  nameTwo: 'Jason',
  date: 'Saturday, the 30th of October, 2027',
  shortDate: '30 October 2027',
  // Rendered under the date, in the hero. Set `startTbc: false` once the
  // venue confirms the time and the small print disappears.
  startTime: 'from 9:00pm',
  startTbc: true,
  location: 'Dublin, Ireland',
}

export const venue = {
  name: 'Urban Brewing',
  addressLines: ['CHQ Building, Custom House Quay, IFSC', 'Dublin, D01 Y6P5'],
  mapsUrl: 'https://maps.app.goo.gl/BRx5t59BWMYhSsfR6',
}

export const dressCode = {
  headline: 'Black',
  lines: [
    'We wear black',
    'You, however, are free come as you feel most yourself.',
  ],
}

// `tbc: true` renders a quiet "time to be confirmed" note under the entry.
// Remove the flag once a time is locked in.
export const timeline = [
  {
    time: '9:00pm',
    title: 'Doors',
    detail: 'Dinner is cleared away. Walk in, find a glass, find us.',
    tbc: true,
  },
  {
    time: 'Then',
    title: 'The Party',
    detail: 'DJ, dancing, no early nights.',
  },
  {
    time: 'Late',
    title: 'Last Orders',
    detail: 'Until the venue turns the lights on and asks us to leave.',
    tbc: true,
  },
]

export const rsvp = {
  // TODO: create a separate after-party form and paste its live URL here.
  // Deliberately NOT the full-day form — that one asks about dinner and
  // dietary requirements, and mixes both headcounts into one spreadsheet.
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeGid-bxazsXqYfLX3eICcKbAyqKVQil1meKuwHMB8bXvM81A/viewform?usp=publish-editor',
  // TODO: set the real reply-by date.
  deadline: 'PLACEHOLDER — set reply-by date',
  note: "Let us know if you can join us, and whether you're bringing a plus one.",
  buttonText: 'RSVP Now',
}

export const accommodation = {
  intro:
    'The venue has arranged rates at a couple of nearby hotels. Ring them directly, quote the reference below, and the discount is applied. Worth booking early — it is a Saturday on a bank holiday weekend.',
  // TODO: replace all three fields per hotel with the real details from the venue.
  hotels: [
    {
      name: 'PLACEHOLDER — First Hotel',
      distance: 'PLACEHOLDER — minutes walk from the venue',
      phone: '+353 1 000 0001',
      reference: 'PLACEHOLDER — first booking reference',
    },
    {
      name: 'PLACEHOLDER — Second Hotel',
      distance: 'PLACEHOLDER — minutes walk from the venue',
      phone: '+353 1 000 0002',
      reference: 'PLACEHOLDER — second booking reference',
    },
  ],
}

export const portrait = {
  src: asset('portrait-1200.jpg'),
  srcSmall: asset('portrait-800.jpg'),
  alt: 'Illustrated portrait of Debbie and Jason in wedding dress and suit, hands joined over a headstone reading "30.10.27 — Till Death", surrounded by bats and roses.',
  credit: 'Portrait by Loki Pookadubh',
  creditUrl: 'https://www.instagram.com/loki_pookadubh/',
}

export const nav = [
  { id: 'details', label: 'Details' },
  { id: 'timeline', label: 'Party' },
  { id: 'rsvp', label: 'RSVP' },
  { id: 'stay', label: 'Stay' },
]
