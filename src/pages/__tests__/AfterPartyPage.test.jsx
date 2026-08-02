import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AfterPartyPage from '../AfterPartyPage'
import { couple, venue, timeline, rsvp, accommodation, nav } from '../../content'

// Mock the child components
vi.mock('../../components/EasterEgg', () => ({
  default: () => <div data-testid="easter-egg">EasterEgg</div>
}))

vi.mock('../../components/BloodRain', () => ({
  default: ({ active }) => (
    <div data-testid="blood-rain" data-active={active}>
      BloodRain
    </div>
  )
}))

const renderAfterPartyPage = () => render(<AfterPartyPage />)

describe('AfterPartyPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render the main heading with names', () => {
      renderAfterPartyPage()
      const namesHeader = screen.getByTestId('names-header')
      expect(namesHeader).toBeInTheDocument()
      expect(namesHeader).toHaveTextContent(couple.nameOne)
      expect(namesHeader).toHaveTextContent(couple.nameTwo)
    })

    it('should render the wedding date', () => {
      renderAfterPartyPage()
      expect(screen.getByTestId('wedding-date')).toHaveTextContent(couple.date)
    })

    // The whole point of this invite: arrive at nine, not at five. If this
    // line ever goes missing, guests turn up to a ceremony they are not at.
    it('should render the arrival time in the hero', () => {
      renderAfterPartyPage()
      expect(screen.getByTestId('start-time')).toHaveTextContent(couple.startTime)
    })

    it('should flag an unconfirmed arrival time as to be confirmed', () => {
      renderAfterPartyPage()
      const startTime = screen.getByTestId('start-time')
      if (couple.startTbc) {
        expect(startTime).toHaveTextContent('time to be confirmed')
      } else {
        expect(startTime).not.toHaveTextContent('time to be confirmed')
      }
    })

    it('should render the portrait with descriptive alt text', () => {
      renderAfterPartyPage()
      const portraitImage = screen.getByTestId('portrait')
      expect(portraitImage).toBeInTheDocument()
      expect(portraitImage.getAttribute('alt')).not.toHaveLength(0)
      expect(portraitImage).toHaveAttribute('srcSet')
    })

    it('should render the venue details with a maps link', () => {
      renderAfterPartyPage()
      const detailsSection = screen.getByTestId('details-section')
      expect(detailsSection).toHaveTextContent(venue.name)
      venue.addressLines.forEach((line) => {
        expect(detailsSection).toHaveTextContent(line)
      })

      const mapLink = within(detailsSection).getByText('Open in maps')
      expect(mapLink).toHaveAttribute('href', venue.mapsUrl)
      expect(mapLink).toHaveAttribute('target', '_blank')
      expect(mapLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should render every timeline entry with its time', () => {
      renderAfterPartyPage()
      const timelineSection = screen.getByTestId('timeline-section')
      timeline.forEach((entry) => {
        expect(timelineSection).toHaveTextContent(entry.time)
        expect(timelineSection).toHaveTextContent(entry.title)
      })
    })

    // Guard against the ceremony and dinner entries creeping back in from the
    // full-day invite — this page must show the party and nothing before it.
    it('should render no timeline entries beyond the ones in content', () => {
      renderAfterPartyPage()
      const entries = within(screen.getByTestId('timeline-section')).getAllByRole('listitem')
      expect(entries).toHaveLength(timeline.length)
    })

    it('should flag unconfirmed times as to be confirmed', () => {
      renderAfterPartyPage()
      const timelineSection = screen.getByTestId('timeline-section')
      const unconfirmedCount = timeline.filter((entry) => entry.tbc).length
      expect(
        within(timelineSection).getAllByText('time to be confirmed')
      ).toHaveLength(unconfirmedCount)
    })

    it('should render RSVP section with the reply-by date', () => {
      renderAfterPartyPage()
      expect(screen.getByTestId('rsvp-section')).toHaveTextContent(rsvp.deadline)
    })

    it('should render an accommodation card per hotel with a tel: link', () => {
      renderAfterPartyPage()
      const staySection = screen.getByTestId('stay-section')

      accommodation.hotels.forEach((hotel) => {
        expect(staySection).toHaveTextContent(hotel.name)
        expect(staySection).toHaveTextContent(hotel.reference)

        const phoneLink = within(staySection).getByText(hotel.phone)
        expect(phoneLink).toHaveAttribute(
          'href',
          `tel:${hotel.phone.replace(/\s/g, '')}`
        )
      })
    })
  })

  describe('RSVP Button', () => {
    it('should render RSVP button with correct link', () => {
      renderAfterPartyPage()
      const rsvpButton = screen.getByTestId('rsvp-button')
      expect(rsvpButton).toHaveAttribute('href', rsvp.formUrl)
      expect(rsvpButton).toHaveAttribute('target', '_blank')
      expect(rsvpButton).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('RSVP button should have correct text', () => {
      renderAfterPartyPage()
      expect(screen.getByTestId('rsvp-button')).toHaveTextContent(rsvp.buttonText)
    })
  })

  describe('Section navigation', () => {
    it('should render a nav link per section, pointing at an in-page anchor', () => {
      renderAfterPartyPage()
      const stickyNav = screen.getByTestId('sticky-nav')

      nav.forEach((item) => {
        const link = within(stickyNav).getByText(item.label)
        expect(link).toHaveAttribute('href', `#${item.id}`)
      })
    })

    it('every nav anchor should resolve to a section on the page', () => {
      const { container } = renderAfterPartyPage()
      nav.forEach((item) => {
        expect(container.querySelector(`#${item.id}`)).not.toBeNull()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have skip to content link', () => {
      renderAfterPartyPage()
      const skipLink = screen.getByText('Skip to content')
      expect(skipLink).toHaveAttribute('href', '#main-content')
    })

    it('main content section should have main-content id', () => {
      renderAfterPartyPage()
      const mainContent = screen.getByTestId('names-header').closest('section')
      expect(mainContent).toHaveAttribute('id', 'main-content')
    })

    it('should expose section headings as real headings', () => {
      renderAfterPartyPage()
      expect(screen.getByRole('heading', { level: 3, name: 'Venue' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 3, name: 'Dress Code' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2, name: /The Night/ })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2, name: /RSVP/ })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2, name: /Accommodation/ })).toBeInTheDocument()
    })

    it('should have a single top-level heading', () => {
      renderAfterPartyPage()
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    })
  })

  describe('Easter Egg', () => {
    it('should render EasterEgg component', () => {
      renderAfterPartyPage()
      expect(screen.getByTestId('easter-egg')).toBeInTheDocument()
    })
  })

  describe('Blood Rain Effect', () => {
    it('should render BloodRain component', () => {
      renderAfterPartyPage()
      expect(screen.getByTestId('blood-rain')).toBeInTheDocument()
    })

    it('should activate blood rain effect when names header is clicked', async () => {
      const user = userEvent.setup()
      renderAfterPartyPage()

      await user.click(screen.getByTestId('names-header'))

      expect(screen.getByTestId('blood-rain')).toHaveAttribute('data-active', 'true')
    })

    it('should activate blood rain from the keyboard', async () => {
      const user = userEvent.setup()
      renderAfterPartyPage()

      screen.getByTestId('summon-button').focus()
      await user.keyboard('{Enter}')

      expect(screen.getByTestId('blood-rain')).toHaveAttribute('data-active', 'true')
    })

    it('should offer a real button as the keyboard route to the easter egg', () => {
      renderAfterPartyPage()
      const summonButton = screen.getByTestId('summon-button')
      expect(summonButton.tagName).toBe('BUTTON')
      // The heading must stay a heading — no role override for the egg.
      expect(screen.getByTestId('names-header')).not.toHaveAttribute('role')
    })
  })
})
