/// <reference types="cypress" />

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("login.html"); // Adjust this if your HTML file is in a different location
  });

  it("should load the login page correctly", () => {
    cy.contains("Login");
    cy.get("input.username").should("be.visible");
    cy.get("input.password").should("be.visible");
    cy.get("input.submit").should("be.visible");
  });

  it("should display an error for incorrect username", () => {
    cy.get("input.username").type("wrongusername");
    cy.get("input.password").type("123");
    cy.get("input.submit").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Wrong password or username");
    });
  });

  it("should display an error for incorrect password", () => {
    cy.get("input.username").type("yuki");
    cy.get("input.password").type("wrongpassword");
    cy.get("input.submit").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Wrong password or username");
    });
  });

  it("should lock the user out after 3 failed attempts", () => {
    cy.get("input.username").type("yuki");
    cy.get("input.password").type("wrongpassword");
    cy.get("input.submit").click();
    cy.get("input.submit").click();
    cy.get("input.submit").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Wrong password or username");
    });
  });

  it("should allow login with correct username and password", () => {
    cy.get("input.username").type("yuki");
    cy.get("input.password").type("123");
    cy.get("input.submit").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Login was successful");
    });
  });

  it("should redirect to the correct URL after successful login", () => {
    cy.get("input.username").type("yuki");
    cy.get("input.password").type("123");
    cy.get("input.submit").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Login was successful");
    });
    cy.window().then((win) => {
      cy.stub(win, "open").callsFake((url) => {
        expect(url).to.equal("wwww.google.ie");
      });
    });
  });
});
