# After Party Invite Site

A single-page invite for guests joining the wedding **after the ceremony and
dinner**. React + Vite, deployed to GitHub Pages at
**https://j-etienne1.github.io/afters-invite/**

This is the sibling of the full-day invite
([wedding-invite-demo](https://github.com/J-Etienne1/wedding-invite-demo),
live at https://j-etienne1.github.io/wedding-invite-demo/). Two separate repos
and two separate links, so an after-party guest never lands on the ceremony page
and a full-day guest never gets sent the short version.

**Venue, address, maps link, date and dress code are identical between the two
sites on purpose. If one changes, change both.**

---

## Editing the invite

**Almost everything you'll want to change lives in one file: [`src/content.js`](src/content.js).**

Names, date, arrival time, venue, dress code, the party timeline, RSVP details
and the hotel list are all plain text in there — no need to touch any component.

Anything still marked `PLACEHOLDER` needs real information before the invite goes out:

- **RSVP form URL** — this site deliberately does *not* reuse the full-day
  Google Form. That one asks about dinner and dietary requirements, and would
  mix both guest lists into one spreadsheet. Make a second form, paste its URL in.
- RSVP reply-by date
- Both hotel names, phone numbers, booking references and walking distances

Times marked `tbc: true` render a small *"time to be confirmed"* note underneath.
Delete that flag once a time is locked in. The hero arrival time has its own
flag, `couple.startTbc`.

### What is different from the full-day invite

| | Full-day invite | This one |
|---|---|---|
| Hero eyebrow | "…summoned to witness the union of" | "Vows said. Dinner done. …after party of" |
| Hero arrival time | not shown | **from 9:00pm**, its own line under the date |
| Details heading | ~~Ceremony~~ Party | ~~Dinner~~ Dancing |
| Timeline | Drinks · Dinner · The Party | Doors · The Party · Last Orders |
| Timeline heading | The Evening | The Night |
| Nav labels | Details · Evening · RSVP · Stay | Details · **Party** · RSVP · Stay |
| RSVP note | mentions dietary requirements | plus-one only |
| RSVP form | shared full-day form | separate after-party form |

Everything else — the artwork, the fonts, the colour variables, the bats and the
blood rain — is the same, so the two links feel like one event.

---

## Project Structure

```
afters-invite/
├── index.html              ← Root HTML + link-preview (og:) meta tags
├── vite.config.js          ← Vite config (sets base path for GitHub Pages)
├── package.json
├── public/                 ← Copied to the site root as-is
│   ├── portrait-1200.jpg   ← Portrait artwork (desktop)
│   ├── portrait-800.jpg    ← Portrait artwork (mobile)
│   ├── og-image.jpg        ← 1200×630 crop used by WhatsApp / email previews
│   └── bat.svg             ← Favicon
└── src/
    ├── main.jsx            ← App entry point (mounts React)
    ├── App.jsx             ← Renders the single page
    ├── content.js          ← ALL EDITABLE AFTER-PARTY DETAILS
    ├── index.css           ← Global styles & CSS variables
    ├── test-setup.js       ← Registers DOM matchers for tests
    └── pages/
        ├── AfterPartyPage.jsx
        └── AfterPartyPage.module.css
```

### Why one page

The invite is short enough that scrolling beats navigating. Guests get the link
in WhatsApp, read it once, then come back later to look up a single fact — the
time, the address, which hotel. A second page adds a tap and, worse, a "which
screen was that on?" memory cost. The sticky nav bar (Details · Party · RSVP ·
Stay) makes every section one tap away without a page load.

There is deliberately **no router**: the in-page `#details`-style anchors are
plain fragments, and a HashRouter would swallow them as route changes.

### Why a separate repo rather than a second page

A second page in the full-day repo would sit at a guessable URL, and every edit
to the after-party copy would mean touching a repo that is already shipped and
linked. Separate repos cost a duplicated component and stylesheet; they buy two
links that cannot leak into each other.

---

## 1. Initial Setup (do this once)

Make sure you have Node.js installed. Check with:
```bash
node --version   # should be v18 or higher
npm --version
```

Install dependencies:
```bash
npm install
```

---

## 2. Run Locally

```bash
npm run dev
```

Open http://localhost:5173/afters-invite/ in your browser.
Any changes you save will hot-reload automatically.

Note the `/afters-invite/` on the end — the bare `http://localhost:5173/` shows
a blank page, because Vite is serving from the GitHub Pages sub-path.

---

## 3. Run Tests

### Unit Tests (Vitest)

```bash
npm test              # run once
npm run test:watch    # re-run on file changes
```

Unit tests live in `src/**/__tests__/*.test.jsx`. They read their expected values
from `src/content.js`, so editing the invite text does **not** break them.

### End-to-End Tests (Cypress)

```bash
npm run cypress:open  # interactive
npm run cypress:run   # headless
```

Before running Cypress, start the production preview server. The test
specs are written to visit the compiled site from `dist/` on port 5174,
not the Vite dev server on port 5173.

```bash
npm run build
npx vite preview --port 5174
```

Then open Cypress in another terminal. This ensures Cypress tests the same
built output that GitHub Pages will serve.

Unlike the unit tests, the Cypress spec has the copy hard-coded (that is the
point of an end-to-end test), so it **will** need updating when you change
timeline entries or nav labels in `src/content.js`.

---

## 4. Link previews (WhatsApp / email)

The `og:` and `twitter:` meta tags in `index.html` control how the link looks
when pasted into WhatsApp, iMessage or an email.

Keep the words **"After Party"** in `og:title`. Some guests will end up with both
links in the same chat, and the preview title is the only thing telling them
apart at a glance.

**These URLs must be absolute.** If the repo is renamed or moved to a custom
domain you must update, in three places:

1. `base` in `vite.config.js`
2. `SITE_URL` in `src/content.js`
3. the `og:url`, `og:image` and `twitter:image` tags in `index.html`

WhatsApp caches previews aggressively. After changing the image, test with a
fresh URL (e.g. add `?v=2`) or use Facebook's Sharing Debugger to force a refetch.

---

## 5. Deploy to GitHub Pages

```bash
npm run deploy
```

This builds the project and pushes `dist/` to the `gh-pages` branch. Live ~60
seconds later. First-time setup is in [WINDOWS-SETUP.md](WINDOWS-SETUP.md).

---

## Notes

- **Portrait**: `public/portrait-*.jpg` and `public/og-image.jpg` are the same
  files as the full-day invite. When the final artwork lands, re-export for both
  repos at the same sizes:
  ```bash
  sips -s format jpeg -s formatOptions 82 --resampleWidth 1200 <final>.jpg --out public/portrait-1200.jpg
  sips -s format jpeg -s formatOptions 80 --resampleWidth 800  <final>.jpg --out public/portrait-800.jpg
  ```
- **Fonts**: Loaded from Google Fonts — requires an internet connection.
- **Easter eggs**: Tapping the names triggers blood rain (keyboard users get a
  "Summon the bats" button that appears on focus); the headstone in the corner
  releases bats.
