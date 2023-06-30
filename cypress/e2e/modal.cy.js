const PERCY_WIDTHS = [768, 1920]

describe('Modal', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/239jsdfk9Q2jjsk_no_spotify')
    })
    it('can open edit bio modal', () => {
        cy.contains('Edit Profile').should('exist').click()
        cy.get('#edit-bio-modal').should('exist')
        cy.percySnapshot('Edit Profile Modal', { widths: PERCY_WIDTHS, fullPage: true });
        cy.get('#edit-bio-modal').within(() => {
            cy.get('#edit-bio-profile-photo').should('exist')
            cy.get('img').should('have.attr', 'src', 'https://alcove.place/profiles/photos/tH7kAkdmO20akaAjkd.jpeg')
            cy.get('#edit-bio-remove-profile-photo').should('exist').should('have.text', 'Remove')
            cy.get('#edit-bio-change-profile-photo').should('exist').should('have.text', 'Change')
            cy.get('#edit-bio-name').should('exist').should('have.value', 'jonathan wu')
            cy.get('#edit-bio-bio').should('exist').should('have.value', 'my favorites')
            cy.get('#edit-bio-instagram').should('exist').should('have.value', 'jonathannwuu')
            cy.get('#edit-bio-facebook').should('exist').should('have.value', 'jonathannwuu')
            cy.get('#edit-bio-cancel').should('exist').should('have.text', 'Cancel')
            cy.get('#edit-bio-done').should('exist').should('have.text', 'Done')
        })  
        cy.get('#edit-bio-cancel').click()
        cy.get('#edit-bio-modal').should('not.exist')
    })

    it('can open edit item modal', () => {
        cy.get('[data-cy="edit-item-icon"]').should('have.length', 5)
    })
})
