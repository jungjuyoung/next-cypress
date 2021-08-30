/// <reference types="cypress"/>

context('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('should find out Hello, Next World message', () => {
    cy.get('h1').contains('Next World')
  })
})