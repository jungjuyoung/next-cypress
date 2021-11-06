/// <reference types="cypress"/>

context("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3060");
  });

  it("should find our SEO title", () => {
    cy.get("title").contains("React Twitter Clone Coding");
  });

  it("login attempt", () => {
    cy.get(".ant-form > :nth-child(1) > .ant-input")
      .click()
      .type("jk@naver.com");
    cy.get(":nth-child(2) > .ant-input").click().type("asdf");
    cy.get(".LoginForm__ButtonWrapper-sc-1qh5ev2-0 > .ant-btn-primary").click();
  });
});
