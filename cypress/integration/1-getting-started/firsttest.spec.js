/// <reference types="cypress" />

describe('Backer Authentication Test', () => {
    beforeEach(() => {
        cy.visit('https://preprod.backmarket.fr/register')
        cy.get('[data-qa="accept-cta"]').click()
      })

    const faker = require("faker");
    const firstName = faker.name.firstName();
    const lastName = faker.name.firstName();
    const email = faker.internet.email()
    const password = faker.internet.password()

    it('should create an account', () => {
    
        cy.get('#firstName').type(firstName)
        cy.get('#lastName').type(lastName) 
        cy.get('#signup-email').type(email) 
        cy.get('#signup-password').type(password) 
        cy.get('[data-qa="signup-submit-button"]').click()

        cy.url().should("contain", "/dashboard/orders");
        cy.get('[data-qa="dashboard-navigation-profil"]').click()
        cy.get('[data-test="dashboard-profile"]').should("exist");

     })

     it("should display error message for empty name", () => {

        cy.get('#lastName').type(lastName) 
        cy.get('#signup-email').type(email) 
        cy.get('#signup-password').type(password) 
        cy.get('[data-qa="signup-submit-button"]').click()
    
        cy.contains("obligatoire").should("be.visible")
      });

      it("should authenticate user with valid credentials", () => {
        cy.get('#signin-email').type(email) 
        cy.get('#signin-password').type(password) 
        cy.get('[data-qa="signin-submit-button"]').click()
    
        cy.url().should("contain", "/dashboard/orders");
        cy.get('[data-qa="dashboard-navigation-profil"]').click()
        cy.get('[data-test="dashboard-profile"]').should("exist");

      });

      it("should display error message for invalid password", () => {
        cy.get('#signin-email').type(email) 
        cy.get('#signin-password').type("falsepw") 
        cy.get('[data-qa="signin-submit-button"]').click()
    
        cy.contains("Informations d'identification erronées").should('be.visible');

      });


})
