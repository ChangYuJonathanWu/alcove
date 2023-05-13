describe('Homepage', () => {
    it('Loads the homepage', () => {
        cy.visit('localhost:3000')
        cy.contains('Showcase your hobbies').should('exist')
        cy.get('#call-to-action').should('exist')
        cy.get('#home-logo').should('exist')
        cy.get('#handle-input').should('exist')
        cy.get('#signup-submit-button').should('exist')
        cy.percySnapshot('Homepage responsive test', { widths: [768, 1200, 1920] });
        

        
    })
  })