import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Blocks Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Add Block: Video link', () => {
    // Intercept cmshare request
    cy.intercept('GET', 'https://cmshare.eea.europa.eu//download').as(
      'cmshare',
    );

    // Change page title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Volto NextCloud Video Demo');
    cy.get('.documentFirstHeading').contains('Volto NextCloud Video Demo');
    cy.getSlate().click();

    // Add block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get(".blocks-chooser .ui.form .field.searchbox input[type='text']").type(
      'video (NextCloud)',
    );
    cy.get('.nextCloudVideo').click();

    // Check if error message is not displayed
    cy.get('.ui.error.message').should('not.exist');
    cy.get('.block.video .toolbar-inner .ui.input').type(
      'https://www.youtube.com/{esc}',
    );

    // Add youtube video link and check if it is valid
    cy.get('.block.video .toolbar-inner .ui.input')
      .click()
      .type('https://www.youtube.com/');
    cy.get('.block.video .toolbar-inner .ui.buttons .ui.basic.primary').click();
    cy.get('.ui.error.message').should('exist');

    // Delete the link and check if the error message is not displayed
    cy.get('.block.video .toolbar-inner .ui.buttons .ui.basic.cancel').click();
    cy.get('.ui.error.message').should('not.exist');

    // Add cmshare video link and check if it is valid
    cy.get('.block.video .toolbar-inner .ui.input').type(
      'https://cmshare.eea.europa.eu/{enter}',
    );
    cy.get('.ui.error.message').should('not.exist');
    cy.get('#blockform-fieldset-default #field-title').type('test cmshare');

    // Wait for cmshare request
    cy.wait('@cmshare');

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // The page view should contain our changes
    cy.contains('Volto NextCloud Video Demo');
    cy.get('.block.video');
  });

  it('Check Subtitles', () => {
    // Intercept cmshare request
    cy.intercept('GET', 'https://cmshare.eea.europa.eu/download').as('cmshare');

    // Add Captions File
    cy.get('#toolbar-save').click();
    cy.get('#toolbar-add').click().get('#toolbar-add-file').click();
    cy.get('#field-file')
      .focus()
      .selectFile('cypress/resources/captions-sample.vtt', { force: true });
    cy.get('#field-title').type('captions');
    cy.get('#toolbar-save').click();

    //Go to test page
    cy.visit('/cypress/my-page');
    cy.waitForResourceToLoad('my-page');
    cy.navigate('/cypress/my-page/edit');
    cy.getSlate().click();

    //Get Video Block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get(".blocks-chooser .ui.form .field.searchbox input[type='text']").type(
      'video (NextCloud)',
    );
    cy.get('.nextCloudVideo').click();

    // Add cmshare video link
    cy.get('.block.video .toolbar-inner .ui.input').type(
      'https://cmshare.eea.europa.eu/',
    );
    cy.get('.block.video .toolbar-inner .ui.buttons .ui.basic.primary').click();

    // Wait for cmshare request
    cy.wait('@cmshare');

    //add subtitles in menu
    cy.get('[aria-label="Add Subtitles"]').click();
    cy.get('#field-language-0-subtitles-0').type('{enter}');
    cy.get('.file-picker-toolbar button').first().click();
    cy.get('.object-listing li').first().dblclick();
    cy.get('.file-picker-toolbar button').next().next().click();

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    //Check the presence of captions
    cy.get('.block.video')
      .get('video')
      .should('be.visible')
      .should('not.be.empty')
      .then(($video) => {
        const $track = $video.contents()?.[0];
        cy.wrap($track).should('have.attr', 'kind', 'subtitles');
      });
  });
});
