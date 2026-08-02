import {
  AfterPartyPage,
  AfterPartyDetails,
  RsvpFormData,
  SectionLink,
} from "../page-objects/AfterPartyPage";

describe("After Party Page", () => {
  const afterPartyPage = new AfterPartyPage();

  const afterPartyDetails: AfterPartyDetails = {
    date: "Saturday, the 30th of October, 2027",
    startTime: "from 9:00pm",
    names: "Debbie & Jason",
    venue: "Urban Brewing",
  };

  const rsvpData: RsvpFormData = {
    buttonText: "RSVP Now",
    deadline: "PLACEHOLDER — set reply-by date",
  };

  const sectionLinks: SectionLink[] = [
    { label: "Details", anchorId: "details" },
    { label: "Party", anchorId: "timeline" },
    { label: "RSVP", anchorId: "rsvp" },
    { label: "Stay", anchorId: "stay" },
  ];

  beforeEach(() => {
    cy.visit("http://localhost:5174/afters-invite/");
  });

  it("displays the names header", () => {
    afterPartyPage.verifyNamesHeaderVisible();
  });

  it("displays the wedding date", () => {
    afterPartyPage.verifyWeddingDateVisible();
    afterPartyPage.verifyWeddingDateText(afterPartyDetails.date);
  });

  it("displays the arrival time in the hero", () => {
    afterPartyPage.verifyStartTimeVisible();
    afterPartyPage.verifyStartTimeText(afterPartyDetails.startTime);
  });

  it("loads the portrait artwork", () => {
    afterPartyPage.verifyPortraitLoaded();
  });

  it("displays the venue details", () => {
    afterPartyPage.verifyDetailsSectionVisible();
    cy.get(afterPartyPage.detailsSection).should(
      "contain.text",
      afterPartyDetails.venue
    );
  });

  it("displays the party timeline and nothing before it", () => {
    afterPartyPage.verifyTimelineSectionVisible();
    afterPartyPage.verifyTimelineEntry("9:00pm", "Doors");
    afterPartyPage.verifyTimelineEntry("Then", "The Party");
    afterPartyPage.verifyTimelineEntry("Late", "Last Orders");
    // Three entries only — the ceremony and the sit-down dinner belong to the
    // full-day invite and must never appear on this page.
    afterPartyPage.verifyTimelineEntryCount(3);
  });

  it("displays the RSVP section and button", () => {
    afterPartyPage.verifyRsvpSectionVisible();
    afterPartyPage.verifyRsvpButtonVisible();
    afterPartyPage.verifyRsvpButtonText(rsvpData.buttonText);
    cy.get(afterPartyPage.rsvpSection).should("contain.text", rsvpData.deadline);
  });

  it("displays accommodation options with callable numbers", () => {
    afterPartyPage.verifyStaySectionVisible();
    afterPartyPage.verifyHotelCount(2);
  });

  it("keeps the section nav visible while scrolling", () => {
    cy.scrollTo("bottom");
    afterPartyPage.verifyStickyNavVisible();
  });

  sectionLinks.forEach(({ label, anchorId }) => {
    it(`jumps to the ${label} section from the nav`, () => {
      afterPartyPage.clickNavLink(label);
      afterPartyPage.verifySectionInView(anchorId);
    });
  });
});
