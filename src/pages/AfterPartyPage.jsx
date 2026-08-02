import { useState, useCallback } from 'react'
import styles from './AfterPartyPage.module.css'
import EasterEgg from '../components/EasterEgg'
import BloodRain from '../components/BloodRain'
import {
  couple,
  venue,
  dressCode,
  timeline,
  rsvp,
  accommodation,
  portrait,
  nav,
} from '../content'

function Divider() {
  return (
    <div className={styles.divider} aria-hidden="true">
      <span className={styles.dividerLine} />
      <span className={styles.dividerIcon}>
        <span className={styles.invertedCross}>†</span>
        <span>✦</span>
        <span className={styles.invertedCross}>†</span>
      </span>
      <span className={styles.dividerLine} />
    </div>
  )
}

export default function AfterPartyPage() {
  const [bloodActive, setBloodActive] = useState(false)
  const triggerBlood = useCallback(() => setBloodActive(true), [])
  const handleBloodComplete = useCallback(() => setBloodActive(false), [])

  return (
    <div className={styles.page}>

      <a href="#main-content" className={styles.skipLink}>Skip to content</a>

      {/* ── Hero: portrait, names, date, start time ── */}
      <section className={styles.hero} id="main-content" aria-label="After party invitation">
        <figure className={styles.portraitFigure}>
          <div className={styles.portraitFrame}>
            <img
              className={styles.portraitImage}
              src={portrait.src}
              srcSet={`${portrait.srcSmall} 800w, ${portrait.src} 1200w`}
              sizes="(max-width: 600px) 90vw, 560px"
              alt={portrait.alt}
              width="1200"
              height="1698"
              data-testid="portrait"
            />
          </div>
          <figcaption className={styles.portraitCredit}>{portrait.credit}</figcaption>
        </figure>

        <p className={styles.eyebrow}>{couple.eyebrow}</p>

        {/* The heading stays a plain heading — giving it role="button" for the
            easter egg would strip its heading semantics from screen readers.
            Tap/click triggers the effect; the button below is the keyboard
            equivalent, hidden until focused. */}
        <h1
          className={styles.names}
          data-testid="names-header"
          onClick={triggerBlood}
        >
          {couple.nameOne}
          <span className={styles.ampersand}>&</span>
          {couple.nameTwo}
        </h1>

        <button
          type="button"
          className={styles.summonButton}
          onClick={triggerBlood}
          data-testid="summon-button"
        >
          Summon the bats
        </button>

        {/* testid stays "wedding-date" — same id as the full-day invite, so a
            selector fix in one repo ports straight across to the other. */}
        <p className={styles.date} data-testid="wedding-date">{couple.date}</p>

        {/* The single most important fact on this page: turn up at nine, not
            at five. It gets its own line rather than hiding in the timeline. */}
        <p className={styles.startTime} data-testid="start-time">
          {couple.startTime}
          {couple.startTbc && (
            <span className={styles.startTimeTbc}>time to be confirmed</span>
          )}
        </p>
      </section>

      {/* ── Sticky section nav ── */}
      <nav className={styles.stickyNav} aria-label="Jump to section" data-testid="sticky-nav">
        <ul className={styles.stickyNavList}>
          {nav.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={styles.stickyNavLink}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Venue & dress code ── */}
      <section
        className={styles.section}
        id="details"
        aria-labelledby="details-heading"
        data-testid="details-section"
      >
        <h2 className={styles.sectionLabel} id="details-heading">
          <s aria-hidden="true">Dinner</s>
          <span className="sr-only">Dinner crossed out, replaced with </span>
          {' '}Dancing
        </h2>

        <div className={styles.detailsGrid}>
          <div className={styles.detailCard}>
            <h3 className={styles.detailTitle}>Venue</h3>
            <p>{venue.name}</p>
            {venue.addressLines.map((line) => <p key={line}>{line}</p>)}
            <p>
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                Open in maps
              </a>
            </p>
          </div>

          <div className={styles.detailCard}>
            <h3 className={styles.detailTitle}>Dress Code</h3>
            <p className={styles.dressHeadline}>{dressCode.headline}</p>
            {dressCode.lines.map((line) => <p key={line}>{line}</p>)}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Timeline: the party only. Guests reading this page are not at the
           ceremony or the dinner, so those entries are deliberately absent. ── */}
      <section
        className={styles.section}
        id="timeline"
        aria-labelledby="timeline-heading"
        data-testid="timeline-section"
      >
        <h2 className={styles.sectionLabel} id="timeline-heading">The Night</h2>

        <ol className={styles.timeline}>
          {timeline.map((entry) => (
            <li key={entry.title} className={styles.timelineItem}>
              <span className={styles.timelineTime}>{entry.time}</span>
              <span className={styles.timelineMarker} aria-hidden="true" />
              <div className={styles.timelineBody}>
                <h3 className={styles.timelineTitle}>{entry.title}</h3>
                <p className={styles.timelineDetail}>{entry.detail}</p>
                {entry.tbc && (
                  <p className={styles.timelineTbc}>time to be confirmed</p>
                )}
              </div>
            </li>
          ))}
        </ol>

        <p className={styles.timelineFootnote}>
          The party is at {venue.name} — the same room we have been in all evening.
          Walk straight in, no taxi in between.
        </p>
      </section>

      <Divider />

      {/* ── RSVP ── */}
      <section
        className={styles.section}
        id="rsvp"
        aria-labelledby="rsvp-heading"
        data-testid="rsvp-section"
      >
        <h2 className={styles.sectionLabel} id="rsvp-heading">RSVP</h2>
        <div className={styles.rsvpBlock}>
          <p className={styles.rsvpText}>
            Kindly reply by <strong>{rsvp.deadline}</strong>
          </p>
          <p className={styles.rsvpSub}>{rsvp.note}</p>
          <a
            href={rsvp.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.rsvpButton}
            data-testid="rsvp-button"
          >
            {rsvp.buttonText}
          </a>
        </div>
      </section>

      <Divider />

      {/* ── Accommodation ── */}
      <section
        className={styles.section}
        id="stay"
        aria-labelledby="stay-heading"
        data-testid="stay-section"
      >
        <h2 className={styles.sectionLabel} id="stay-heading">Accommodation</h2>
        <p className={styles.accomIntro}>{accommodation.intro}</p>

        <div className={styles.hotelList}>
          {accommodation.hotels.map((hotel) => (
            <div key={hotel.name} className={styles.hotelCard}>
              <h3 className={styles.hotelName}>{hotel.name}</h3>
              <p className={styles.hotelDistance}>{hotel.distance}</p>
              <p className={styles.hotelReference}>
                Quote <strong>{hotel.reference}</strong> when booking
              </p>
              <a href={`tel:${hotel.phone.replace(/\s/g, '')}`} className={styles.hotelPhone}>
                {hotel.phone}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <p>{couple.nameOne} &amp; {couple.nameTwo} · {couple.location}</p>
      </footer>

      {/* ── Easter eggs ── */}
      <EasterEgg />
      <BloodRain active={bloodActive} onComplete={handleBloodComplete} />

    </div>
  )
}
