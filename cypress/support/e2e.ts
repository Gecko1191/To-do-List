// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import { createPinia, setActivePinia } from "pinia";

// Alternatively you can use CommonJS syntax:
// require('./commands')
beforeEach(() => {
  // creates a fresh pinia and makes it active
  // so it's automatically picked up by any useStore() call
  // without having to pass it to it: `useStore(pinia)`
  setActivePinia(createPinia());

  // we set the response to be the user.json fixture
  cy.intercept("GET", "/users/1", { fixture: "user.json" }).as("user");
  // we set the response to be the toDos.json fixture
  cy.intercept("GET", "/users/1/todos", { fixture: "toDos.json" }).as("toDos");
});
