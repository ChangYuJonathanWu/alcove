const PERCY_WIDTHS = [768, 1920]

describe('Profile Menu', () => {

    beforeEach(() => {
        cy.visit('localhost:3000/239jsdfk9Q2jjsk_no_spotify')
    })
    //TODO: Need a better way to determine if menu is open or not. Seems like menu elements exist even when the menu is closed.
    it('Displays and can open profile menu with exected options', () => {
        // The menu FAB should exist
        cy.get('[data-cy=menu-fab--speeddial]').should('exist')
        // The backdrop should be present but not visible
        cy.get('[data-cy=menu-fab--backdrop]').should('exist').should('not.be.visible')

        // Hover over the menu FAB avatar
        cy.get('[data-cy=menu-fab--profile-photo]').should('be.visible').trigger('mouseover')

        //The backdrop should be visible
        cy.get('[data-cy=menu-fab--backdrop]').should('be.visible')

        // The menu should contain options for Logout, Design and View as Public
        cy.get('[data-cy=menu-fab--speeddial]').find('[data-cy=menu-fab--option]').should('have.length', 3)
        cy.get('[data-cy=menu-fab--speeddial]').find('[data-cy=menu-fab--option]').eq(0).should('contain', 'Logout')
        cy.get('[data-cy=menu-fab--speeddial]').find('[data-cy=menu-fab--option]').eq(1).should('contain', 'Theme')
        cy.get('[data-cy=menu-fab--speeddial]').find('[data-cy=menu-fab--option]').eq(2).should('contain', 'View as Public')

        // Take percy snapshot
        cy.percySnapshot('Profile Menu', { widths: PERCY_WIDTHS })

        // Move the mouse off of the menu FAB
        cy.get('[data-cy=menu-fab--profile-photo]').trigger('mouseout')


    })
})