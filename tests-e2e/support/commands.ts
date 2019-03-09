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
    getBtn: (label: string) => Cypress.Chainable<JQuery>;
  }
}

function getBtn(label: string) {
  cy.contains(label)
    .parent()
    .within(() => {
      cy.get('button');
    });
}

Cypress.Commands.add('getBtn', getBtn);
