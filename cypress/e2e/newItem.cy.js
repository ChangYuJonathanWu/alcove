const PERCY_WIDTHS = [768, 1920]

describe('New Item Flow', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/239jsdfk9Q2jjsk_no_spotify')
    })
    it('can render new item modal and flow', () => {
        cy.contains("Edit Profile").should('exist')
        cy.get('[data-cy="new-item-button"]').should('exist').should('have.text', 'New Item').click()
        cy.get('[data-cy="new-item-selection-modal"]').should('exist').should('be.visible').within(() => {
            cy.percySnapshot('New Item Type Selection Modal', { widths: PERCY_WIDTHS, fullPage: true });
            cy.get('[data-cy="new-item-selection-modal--header"]').should('exist')
            cy.get('[data-cy="new-item-selection-modal--close-button"]').should('exist')
            cy.get('[data-cy="new-item-type-list"]').should('exist')
            cy.get('[data-cy="new-item-type-link"]').should('exist')

            // Open up the list item form
            cy.get('[data-cy="new-item-type-list"]').click()

            cy.get('[data-cy="new-item-selection-modal--indicator-toggle"]').should('exist').should('be.visible').within(() => {
                cy.contains("List").should('exist')
            })
            // Verify contents of List Item
            cy.get("[data-cy='list-item-form']").should('exist').within(() => {
                cy.percySnapshot('New Item List Modal', { widths: PERCY_WIDTHS, fullPage: true });
                cy.get('[data-cy="list-item-form--title-field"]').should('exist')
                cy.get('[data-cy="list-item-form--subtitle-field"]').should('exist')
                // Submit button should be disabled
                cy.get('[data-cy="list-item-form--submit-button"]').should('exist').should('have.attr', 'disabled')

                // Type in a random title and subtitle
                cy.get('[data-cy="list-item-form--title-field"]').type("This is a title")
                cy.get('[data-cy="list-item-form--subtitle-field"]').type("This is a subtitle")

                // Submit button should be enabled
                cy.get('[data-cy="list-item-form--submit-button"]').should('exist').should('not.have.attr', 'disabled')

                // Cancel button should exist
                cy.get('[data-cy="list-item-form--cancel-button"]').should('exist')

            })
            // Go back to item selection
            cy.get('[data-cy="new-item-selection-modal--indicator-toggle"]').click()
            // Sanity check verify all item types are still there
            cy.get('[data-cy="new-item-type-list"]').should('exist')
            cy.get('[data-cy="new-item-type-link"]').should('exist')

            // Open up the link item form
            cy.get('[data-cy="new-item-type-link"]').click()

            // Indicator toggle should say Link
            cy.get('[data-cy="new-item-selection-modal--indicator-toggle"]').should('exist').should('be.visible').within(() => {
                cy.contains("Link").should('exist')
            })

            cy.get("[data-cy='link-item-form']").should('exist').within(() => {
                cy.percySnapshot('New Item Link Modal', { widths: PERCY_WIDTHS, fullPage: true });
                cy.get('[data-cy="link-item-form--title-field"]').should('exist')
                cy.get('[data-cy="link-item-form--uri-field"]').should('exist')
                // Submit button should be disabled
                cy.get('[data-cy="link-item-form--submit-button"]').should('exist').should('be.disabled')

                // Type in a random title and subtitle
                cy.get('[data-cy="link-item-form--title-field"]').type("This is a title")

                // Type invalid URL
                cy.get('[data-cy="link-item-form--uri-field"]').type("invalid*url")
                // Submit button should still be disabled
                cy.get('[data-cy="link-item-form--submit-button"]').should('exist').should('be.disabled')
                // Replace with valid URL
                cy.get('[data-cy="link-item-form--uri-field"]').focused().clear()
                cy.get('[data-cy="link-item-form--uri-field"]').type("https://www.google.com")

                // Submit button should be enabled
                cy.get('[data-cy="link-item-form--submit-button"]').should('exist').should('not.be.disabled')

                // Cancel button should exist
                cy.get('[data-cy="link-item-form--cancel-button"]').should('exist')
            })
        })

    })
})
