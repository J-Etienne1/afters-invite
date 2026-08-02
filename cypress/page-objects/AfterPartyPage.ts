export interface AfterPartyDetails {
  date: string;
  startTime: string;
  names: string;
  venue: string;
}

export interface RsvpFormData {
  buttonText: string;
  deadline: string;
}

export interface SectionLink {
  label: string;
  anchorId: string;
}

export class AfterPartyPage {
  namesHeader: string;
  weddingDate: string;
  startTime: string;
  portrait: string;
  stickyNav: string;
  detailsSection: string;
  timelineSection: string;
  rsvpSection: string;
  staySection: string;
  rsvpButton: string;

  constructor() {
    this.namesHeader = '[data-testid="names-header"]';
    this.weddingDate = '[data-testid="wedding-date"]';
    this.startTime = '[data-testid="start-time"]';
    this.portrait = '[data-testid="portrait"]';
    this.stickyNav = '[data-testid="sticky-nav"]';
    this.detailsSection = '[data-testid="details-section"]';
    this.timelineSection = '[data-testid="timeline-section"]';
    this.rsvpSection = '[data-testid="rsvp-section"]';
    this.staySection = '[data-testid="stay-section"]';
    this.rsvpButton = '[data-testid="rsvp-button"]';
  }

  verifyNamesHeaderVisible() {
    cy.get(this.namesHeader).should('be.visible');
  }

  verifyWeddingDateVisible() {
    cy.get(this.weddingDate).should('be.visible');
  }

  verifyWeddingDateText(expected: string) {
    cy.get(this.weddingDate).should('have.text', expected);
  }

  verifyStartTimeVisible() {
    cy.get(this.startTime).should('be.visible');
  }

  verifyStartTimeText(expected: string) {
    // `contain.text`, not `have.text` — the element also carries the quiet
    // "time to be confirmed" note until the venue locks the time in.
    cy.get(this.startTime).should('contain.text', expected);
  }

  verifyPortraitLoaded() {
    cy.get(this.portrait)
      .should('be.visible')
      .and(($img) => {
        // naturalWidth is 0 when the file failed to load — catches a broken
        // asset path under the GitHub Pages sub-path.
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  }

  verifyDetailsSectionVisible() {
    cy.get(this.detailsSection).should('be.visible');
  }

  verifyTimelineSectionVisible() {
    cy.get(this.timelineSection).should('be.visible');
  }

  verifyTimelineEntry(time: string, title: string) {
    cy.get(this.timelineSection).should('contain.text', time).and('contain.text', title);
  }

  verifyTimelineEntryCount(expected: number) {
    cy.get(`${this.timelineSection} li`).should('have.length', expected);
  }

  verifyStaySectionVisible() {
    cy.get(this.staySection).should('be.visible');
  }

  verifyHotelCount(expected: number) {
    cy.get(`${this.staySection} a[href^="tel:"]`).should('have.length', expected);
  }

  verifyRsvpSectionVisible() {
    cy.get(this.rsvpSection).should('be.visible');
  }

  verifyRsvpButtonVisible() {
    cy.get(this.rsvpButton).should('be.visible');
  }

  verifyRsvpButtonText(expected: string) {
    cy.get(this.rsvpButton).should('have.text', expected);
  }

  verifyStickyNavVisible() {
    cy.get(this.stickyNav).should('be.visible');
  }

  clickNavLink(label: string) {
    cy.get(this.stickyNav).contains('a', label).click();
  }

  verifySectionInView(anchorId: string) {
    cy.url().should('include', `#${anchorId}`);
    cy.get(`#${anchorId}`).should('be.visible');
  }
}
