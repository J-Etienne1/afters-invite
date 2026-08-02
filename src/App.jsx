import AfterPartyPage from './pages/AfterPartyPage'

/*
 * Single page by design. The invite is short enough that scrolling beats
 * navigating, and everything stays reachable from one shared link — which
 * matters when the link is pasted into WhatsApp and revisited months later.
 *
 * No router: the in-page "#details"-style anchors are plain fragments, and a
 * HashRouter would swallow them as route changes.
 */
export default function App() {
  return <AfterPartyPage />
}
