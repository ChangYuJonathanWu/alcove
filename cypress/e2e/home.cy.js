describe('Homepage', () => {
    it('Loads the homepage', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Showcase your hobbies').should('exist')
        cy.get('#call-to-action').should('exist')
        cy.get('#home-logo').should('exist')
        cy.get('#handle-input').should('exist')
        cy.get('#signup-submit-button').should('exist')
        cy.percySnapshot('Homepage', { widths: [768, 1200, 1920] });
    })
    it('Loads my profile', () => {
        cy.visit('http://localhost:3000/jonathanwu')
        cy.contains('jonathan wu').should('exist')
        cy.percySnapshot('Profile', { widths: [768, 1200, 1920] });
    })
    it('Loads login page', () => {
        cy.visit('http://localhost:3000/login')
        cy.contains('LOGIN').should('exist')
        cy.percySnapshot('Login', { widths: [768, 1200, 1920] });
    })
  })