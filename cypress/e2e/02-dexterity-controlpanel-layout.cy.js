import { slateLayoutBeforeEach, slateLayoutAfterEach } from '../support/e2e';

describe('ControlPanel: Dexterity Content-Types Layout', () => {
  beforeEach(slateLayoutBeforeEach);
  afterEach(slateLayoutAfterEach);

  it('Edit Blocks Layout for Book', () => {
    cy.visit('/controlpanel/dexterity-types');

    cy.get('a[href="/controlpanel/dexterity-types/book"]').should(
      'have.text',
      'book',
    );

    cy.visit('/controlpanel/dexterity-types/book/layout');
    cy.get('#page-controlpanel-layout').contains(
      'Can not edit Layout for book',
    );
    cy.get('#page-controlpanel-layout button').click();

    // Wait a bit for draftjs to load, without this the title block
    // custom placeholder is missing and cypress gives a timeout error
    cy.wait(1000);
    cy.get('input[id="field-placeholder"]').type('Book title');
    cy.get('label[for="field-required"]').click();
    cy.get('label[for="field-fixed"]').click();

    cy.getSlate().click();

    cy.get('.ui.basic.icon.button.block-add-button:visible').click();
    cy.get('.blocks-chooser .title').contains('Media').click();
    cy.get('.content.active.media .button.nextCloudVideo')
      .contains('Video (NextCloud)')
      .click({ force: true });

    cy.get('#toolbar-save').click();

    cy.visit('/cypress');
    // Intercept cmshare request
    cy.intercept('GET', 'https://cmshare.eea.europa.eu//download').as(
      'cmshare',
    );

    cy.get('button[class="add"]').click();
    cy.get('#toolbar-add-book').click();
    cy.get('.block.title').contains('Book title');

    // Change book title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My First Book');
    cy.get('.documentFirstHeading').contains('My First Book');

    // Add video
    cy.get('.block.video .toolbar-inner .ui.input').type(
      'https://cmshare.eea.europa.eu/',
    );
    cy.get('.block.video .toolbar-inner .ui.buttons .ui.basic.primary').click();
    cy.get('.ui.error.message').should('not.exist');

    // Wait for cmshare request
    cy.wait('@cmshare');

    cy.get('#toolbar-save').click();
    cy.get('.documentFirstHeading').contains('My First Book');
    cy.get('.block.video').should('exist');
  });
});
