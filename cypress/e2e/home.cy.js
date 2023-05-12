describe('Homepage', () => {
    it('Loads the homepage', () => {
        cy.visit('localhost:3000')
        cy.contains('Showcase your hobbies').should('exist')
        
    })
  })