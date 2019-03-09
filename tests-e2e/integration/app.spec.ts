/// <reference types="Cypress" />

describe('game', () => {
  it('should start after turning on', () => {
    cy.visit('/')
      .getBtn('Start')
      .click()
      .wait(500)
      .click();
  });
});
