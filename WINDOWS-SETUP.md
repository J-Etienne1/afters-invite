# Moving this onto the Windows PC

This folder has no git history. It is a **brand new project**, not an update to
the existing wedding invite repo, so it gets its own GitHub repo and its own
GitHub Pages URL.

---

## Step 1 — Copy the folder to the USB stick, then to the PC

**Delete `node_modules` and `dist` from the folder first.** They were created
while building and testing on the Mac. `node_modules` is hundreds of megabytes
of macOS binaries that will not run on Windows, and `dist` is regenerated on
every build. Both get rebuilt on the other side.

```bash
rm -rf node_modules dist
```

Then copy the **whole `afters-invite` folder**, not just its contents — on the
Windows side it becomes the repo folder.

**`.gitignore` is a hidden file.** It is in this folder and must come across. If
you copy by dragging in File Explorer, turn on "Hidden items" under the View tab
first, or you will silently miss it and end up committing `node_modules`.

---

## Step 2 — Install dependencies

```powershell
cd path\to\afters-invite
npm install
```

If `npm install` fails with an `ERESOLVE` peer dependency error, `package.json`
did not come across intact — recopy it.

---

## Step 3 — Check it works before you publish anything

```powershell
npm test
```

Expect **24 passed**.

```powershell
npm run dev
```

Open **http://localhost:5173/afters-invite/**

The `/afters-invite/` on the end matters. The bare `http://localhost:5173/` is a
blank page, because Vite serves from the GitHub Pages sub-path.

Read the page properly at this point — this is your last easy chance to fix
wording. Check in particular that the hero says **from 9:00pm** and that the
timeline starts at Doors, not at drinks and canapés.

Then the end-to-end tests, which could not be run on the Mac (the Cypress binary
refuses to launch there):

```powershell
npm run build
npx vite preview --port 5174
```

and in a second terminal:

```powershell
npm run cypress:run
```

---

## Step 4 — Create the GitHub repo

> **Name the repo `afters-invite`.** The name is baked into three files so that
> GitHub Pages serves the assets from the right sub-path. If you name it
> anything else, you must change all three before deploying:
>
> 1. `base` in `vite.config.js` → `'/your-repo-name/'`
> 2. `SITE_URL` in `src/content.js`
> 3. the `og:url`, `og:image` and `twitter:image` tags in `index.html`
>
> Get this wrong and the site loads as unstyled text with a broken portrait.

Create it on github.com as a **public** repo (GitHub Pages needs public on a free
account), with **no** README, .gitignore or licence — this folder already has them.

---

## Step 5 — Push

```powershell
git init
git add -A
git commit -m "After-party invite site"
git branch -M main
git remote add origin https://github.com/J-Etienne1/afters-invite.git
git push -u origin main
```

Check `git status` before committing. You should see the project files and
**not** `node_modules` or `dist` — if you do see them, `.gitignore` did not make
it across (Step 1).

---

## Step 6 — Deploy

```powershell
npm run deploy
```

This builds the project and pushes `dist/` to a `gh-pages` branch.

Then, on github.com: **Settings → Pages → Build and deployment → Deploy from a
branch → `gh-pages` / `(root)` → Save.**

Live at **https://j-etienne1.github.io/afters-invite/** roughly 60 seconds later.

Every later change is just:

```powershell
git add -A
git commit -m "..."
git push
npm run deploy
```

---

## Step 7 — Before you send it to anyone

`src/content.js` still has placeholders. Fill them in, re-run `npm test`, and
deploy again:

- **The after-party RSVP form URL.** Make a *new* Google Form for this list —
  do not reuse the full-day one. It asks about dinner and dietary requirements,
  and reusing it merges both headcounts into one spreadsheet with no way to tell
  the two groups apart.
- The RSVP reply-by date.
- Both hotels: name, walking distance, phone, booking reference.
- Once the venue confirms 9:00pm, set `couple.startTbc: false` and delete the
  `tbc: true` flags from the timeline entries. The "time to be confirmed" notes
  then disappear on their own.

---

## Things to watch for

**Test the link in WhatsApp before you send it to guests.** Paste it to yourself
first. You should get the portrait image and the title *"Debbie & Jason — After
Party · 30 October 2027"*. That title is the only thing distinguishing this link
from the full-day one if a guest has both in the same chat.

WhatsApp caches previews hard. If you fix the image or title after having pasted
the link once, test the fix with `?v=2` on the end of the URL, or run it through
Facebook's Sharing Debugger to force a refetch.

**Keep the two sites in step.** Venue, address, maps link, date and dress code
are duplicated in this repo's `src/content.js` and in
`wedding-invite-demo/src/content.js`. Nothing enforces that they match. If the
venue moves, or the dress code changes, edit and redeploy **both**.

**Line endings.** Git on Windows may report every file as modified because of
CRLF vs LF. Harmless. If it is noisy:

```powershell
git config core.autocrlf true
```
