// https://on.cypress.io/api

describe("Test the app over view", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h2", "My To Do List App ");
    cy.wait("@toDos");

    cy.contains("li", "My Tasks ( 4 )");
    cy.contains("li", "Important Tasks ( 2 )");
    cy.contains("li", "Archive");
    cy.contains("span", "Test User");
    cy.contains("span", "add Task");
  });

  it("test if basic todos are shown", () => {
    cy.visit("/");
    cy.wait("@toDos");

    cy.contains("div", "toDo");
    cy.contains("div", "toDo completed");
    cy.get("[value=2]").first().should("be.checked");
    cy.contains("div", "toDo important");
    cy.get("[value=3]").first().should("not.be.checked");
    cy.get("[data-test=toDo-3]").within(() => {
      cy.get("[class='onyx-icon-button onyx-icon-button--danger']").should(
        "exist",
      );
    });
    cy.contains("div", "toDo important and completed");
    cy.get("[value=4]").first().should("be.checked");
    cy.get("[data-test=toDo-4]").within(() => {
      cy.get("[class='onyx-icon-button onyx-icon-button--danger']").should(
        "exist",
      );
    });
  });
});
