// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/* eslint @typescript-eslint/no-namespace: 0 */

declare namespace Cypress {
  interface Chainable {
    getByTestId: (
      testId: string,
      options?: Cypress.Timeoutable
    ) => Cypress.Chainable<JQuery>;
    getBtn: (label: string) => Cypress.Chainable<JQuery>;
  }
}

Cypress.Commands.add(
  'getByTestId',
  (testId: string, options?: Cypress.Timeoutable) => {
    cy.get(`[data-testid=${testId}]`, options).as(testId);
  }
);

Cypress.Commands.add(
  'getBtn',
  (label: string, options?: Cypress.Timeoutable) => {
    if (label.charAt(0) === ':') {
      const color = label.slice(1);
      cy.get(`[data-testid=button-${color}]`, options);
    } else {
      cy.contains(label)
        .parent()
        .within(() => {
          cy.get('button');
        });
    }
  }
);
