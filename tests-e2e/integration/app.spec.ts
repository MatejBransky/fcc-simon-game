/// <reference types="Cypress" />

describe('game', () => {
  beforeEach(() => {
    cy.viewport(1000, 1400);
    cy.visit('/');
  });

  it('shows the specified interface', () => {
    cy.contains('Simon');
    cy.contains('Count');
    cy.getBtn('Start');
    cy.getBtn('Strict');
    cy.getBtn('Off');
    cy.getBtn('On');
    cy.getBtn(':green');
    cy.getBtn(':red');
    cy.getBtn(':blue');
    cy.getBtn(':yellow');
  });

  it('is turned off by default', () => {
    cy.getByTestId('display').should('have.text', '');
    cy.getByTestId('switch').should('have.class', 'Switch--off');
  });

  it("doesn't start if it's turned off", () => {
    cy.getBtn('Start').click();
    cy.getByTestId('display').should('have.text', '');
  });

  it('starts after turning on', () => {
    cy.getBtn('On')
      .click()
      .getByTestId('switch')
      .should('have.class', 'Switch--on');

    cy.getByTestId('display').should('have.text', '--');

    cy.clock(); // mock setTimeout, setInterval,.. (related cy.tick(ms))
    cy.getBtn('Start').click();
    /**
     * blinks with the text '--' for 3 seconds
     */
    const timeout = 3000; // ms
    const interval = 300; // ms
    for (let i = 0; i < timeout / interval; i++) {
      cy.getByTestId('display', { timeout: 0 }).should(
        'have.text',
        i % 2 ? '' : '--'
      );
      cy.tick(interval);
    }
    cy.getByTestId('display', { timeout: 0 }).should('have.text', '01');
  });
});
