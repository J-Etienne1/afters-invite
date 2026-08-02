import AfterPartyPage from './pages/AfterPartyPage'

/*
 * Single page by design. The invite is short enough that scrolling beats
 * navigating, and everything stays reachable from one shared link — which
 * matters when the link is pasted into WhatsApp and revisited months later.
 *
 * No router: the in-page "#details"-style anchors are plain fragments, and a
 * HashRouter would swallow them as route changes.
 *
 * This site is the after-party invite only. The full-day invite (ceremony,
 * dinner, then the party) is a separate repo on a separate link, so neither
 * group of guests can wander into the other's page.
 */
export default function App() {
  return <AfterPartyPage />
}
