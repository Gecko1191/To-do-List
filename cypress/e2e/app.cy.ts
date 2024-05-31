// https://on.cypress.io/api

describe("Test the app overview", () => {
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

  it("visits the important toDos", () => {
    cy.visit("/");
    cy.contains("h2", "My To Do List App ");
    cy.wait("@toDos");

    cy.contains("li", "Important Tasks ( 2 )").click();

    cy.get("[data-test=toDo-1]").should("not.exist");
    cy.get("[data-test=toDo-2]").should("not.exist");
    cy.get("[data-test=toDo-3]").should("exist");
    cy.get("[data-test=toDo-4]").should("exist");
  });

  it("visits the archived toDos", () => {
    cy.visit("/");
    cy.contains("h2", "My To Do List App ");
    cy.wait("@toDos");

    cy.contains("li", "Archive").click();

    cy.get("[data-test=toDo-1]").should("not.exist");
    cy.get("[data-test=toDo-2]").should("not.exist");
    cy.get("[data-test=toDo-3]").should("not.exist");
    cy.get("[data-test=toDo-4]").should("not.exist");
  });

  it("test if basic todos are shown", () => {
    cy.visit("/");
    cy.wait("@toDos");

    // test if todos are loaded and completed/important flagged
    cy.contains("div", "toDo");

    //test toDo item to render as completed
    cy.contains("div", "toDo completed");
    cy.get("[data-test=completedCheckbox-2]").within(() => {
      cy.get("input").should("be.checked");
    });
    cy.get("[data-test=importantIconBtn-2]").should(
      "not.have.class",
      "onyx-icon-button--danger",
    );

    //test toDo item to render as important
    cy.contains("div", "toDo important");
    cy.get("[data-test=completedCheckbox-3]").within(() => {
      cy.get("input").should("not.be.checked");
    });
    cy.get("[data-test=importantIconBtn-3]").should(
      "have.class",
      "onyx-icon-button--danger",
    );

    //test toDo item to render as completed and important
    cy.contains("div", "toDo important and completed");
    cy.get("[data-test=completedCheckbox-4]").within(() => {
      cy.get("input").should("be.checked");
    });
    cy.get("[data-test=importantIconBtn-4]").should(
      "have.class",
      "onyx-icon-button--danger",
    );
  });
});

describe("Test the app logic for toDos", () => {
  it("create new toDo", () => {
    cy.visit("/");
    cy.wait("@toDos");

    cy.contains("span", "add Task").click();
    cy.get("[data-test=addToDoInput]").type("new task").type("{enter}");

    cy.get("[data-test=toDo-5]")
      .should("exist")
      .within(() => {
        cy.contains("div", "new task");
      });
  });

  it("flag toDo as completed", () => {
    cy.visit("/");
    cy.wait("@toDos");

    cy.get("[data-test=completedCheckbox-1]")
      .click()
      .within(() => {
        cy.get("input").should("be.checked");
      });
  });

  it("flag toDo as important", () => {
    cy.visit("/");
    cy.wait("@toDos");

    cy.get("[data-test=importantIconBtn-1]")
      .click()
      .should("have.class", "onyx-icon-button--danger");
    cy.contains("li", "Important Tasks ( 3 )");
  });

  it("delete toDo", () => {
    cy.visit("/");
    cy.wait("@toDos");

    cy.get("[data-test=deleteBtn-1]").click();
    cy.get("[data-test=toDo-1]").should("not.exist");
  });

  it("move to archive", () => {
    cy.visit("/");
    cy.wait("@toDos");

    cy.get("[data-test=moveToArchiveBtn-1]").click();
    cy.get("[data-test=toDo-1]").should("not.exist");

    cy.contains("li", "Archive ( 1 )");
  });
});
describe("Test the app sort logic for toDos", () => {
  it("search for toDo", () => {
    cy.visit("/");
    cy.wait("@toDos");

    cy.get("[data-test=searchInput]").type("important");
    cy.get("[data-test=toDo-1]").should("not.exist");
    cy.get("[data-test=toDo-2]").should("not.exist");
    cy.get("[data-test=toDo-3]").should("exist");
    cy.get("[data-test=toDo-4]").should("exist");
  });

  it("order toDos by Important", () => {
    cy.visit("/");
    cy.wait("@toDos");

    cy.get("[data-test=orderSelect]").click();

    cy.contains("span", "Important").click();

    cy.get("[data-test=toDoItemContainer]")
      .children()
      .first()
      .should("have.attr", "data-test", "toDo-3");
  });

  it("order toDos by Completed", () => {
    cy.visit("/");
    cy.wait("@toDos");

    cy.get("[data-test=orderSelect]").click();

    cy.contains("span", "Completed").click();

    cy.get("[data-test=toDoItemContainer]")
      .children()
      .first()
      .should("have.attr", "data-test", "toDo-2");
  });

  it("order toDos by Alphabetical", () => {
    cy.visit("/");
    cy.wait("@toDos");

    cy.get("[data-test=orderSelect]").click();

    cy.contains("span", "Alphabetical").click();

    cy.get("[data-test=toDoItemContainer]")
      .children()
      .first()
      .should("have.attr", "data-test", "toDo-4");
  });
});
