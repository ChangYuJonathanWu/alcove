const PERCY_WIDTHS = [768, 1920]

describe('Modal', () => {

    beforeEach(() => {
        cy.visit('localhost:3000/239jsdfk9Q2jjsk_no_spotify')
    })


    it('can render edit list item modal', () => {
        cy.get('[data-cy="edit-item-icon"]').should('have.length', 5)
        cy.get('[data-cy="edit-item-icon"]').first().click()
        cy.get('[data-cy="edit-item-modal"]').should('exist').should('be.visible')
        cy.percySnapshot('Edit List Item Modal', { widths: PERCY_WIDTHS, fullPage: true });

        // Test buttons
        cy.get('[data-cy="edit-item-modal"]').within(() => {
            cy.get('[data-cy="edit-item-modal--cancel-button"]').should('exist').should('have.text', 'Cancel')
            cy.get('[data-cy="edit-item-modal--delete-button"]').should('exist').should('have.text', 'Delete')
            cy.get('[data-cy="edit-item-modal--update-button"]').should('exist').should('have.text', 'Update')
            cy.get('[data-cy="edit-item-modal--item-name"]').should('exist').within(() => {
                cy.get('input').should('exist').should('have.value', 'sushi restaurants')
            })
            cy.get('[data-cy="edit-item-modal--item-subtitle"]').should('exist').within(() => {
                cy.get('input').should('exist').should('have.value', "they're sentimental")
            })
            cy.get('[data-cy="edit-item-modal--error"]').should('not.exist')
            cy.contains('Cancel').click()
        })
        cy.get('[data-cy="edit-item-modal"]').should('not.exist')
    })

    it('can render edit uri item modal', () => {
        cy.get('[data-cy="edit-item-icon"]').should('have.length', 5)
        cy.get('[data-cy="edit-item-icon"]').last().click()
        cy.get('[data-cy="edit-item-modal"]').should('exist').should('be.visible')
        cy.percySnapshot('Edit URI Item Modal', { widths: PERCY_WIDTHS, fullPage: true });
        cy.get('[data-cy="edit-item-modal"]').within(() => {
            cy.get('[data-cy="edit-item-modal--cancel-button"]').should('exist').should('have.text', 'Cancel')
            cy.get('[data-cy="edit-item-modal--delete-button"]').should('exist').should('have.text', 'Delete')
            cy.get('[data-cy="edit-item-modal--update-button"]').should('exist').should('have.text', 'Update')

            cy.get('[data-cy="edit-item-modal--item-name"]').should('exist').within(() => {
                cy.get('input').should('exist').should('have.value', '@988lifeline')
            })
            cy.get('[data-cy="edit-item-modal--item-uri"]').should('exist').within(() => {
                cy.get('input').should('exist').should('have.value', 'https://www.instagram.com/988lifeline')
            })
            cy.get('[data-cy="edit-item-modal--error"]').should('not.exist')
            cy.contains('Cancel').click()
        })
        cy.get('[data-cy="edit-item-modal"]').should('not.exist')
    })

    it('can render change item order modal', () => {
        cy.get('[data-cy="rearrange-items-button"]').should('exist').should('have.text', 'Change Order').click()

        cy.get('[data-cy="rearrange-items-modal"]').should('exist').should('be.visible').within(() => {
            cy.percySnapshot('Rearrange Items Modal', { widths: PERCY_WIDTHS, fullPage: true });
            cy.get('[data-cy="rearrange-items-modal--cancel"]').should('exist').should('have.text', 'Cancel')
            cy.get('[data-cy="rearrange-items-modal--update"]').should('exist').should('have.text', 'Update')
            cy.get('[data-cy="rearrange-items-modal--error"]').should('not.exist')
            cy.get('[data-cy="rearrange-items-modal--list"]').should('exist').within(() => {
                cy.get('[data-cy="rearrange-items-modal--list-item"]').should('have.length', 5)
                cy.get('[data-cy="rearrange-items-modal--list-item"]').first().should('have.text', 'sushi restaurants')
                cy.get('[data-cy="rearrange-items-modal--list-item"]').eq(1).should('have.text', 'hiking trails')
                cy.get('[data-cy="rearrange-items-modal--list-item"]').eq(2).should('have.text', 'old but charming cars')
                cy.get('[data-cy="rearrange-items-modal--list-item"]').eq(3).should('have.text', 'shows in recent memory')
                cy.get('[data-cy="rearrange-items-modal--list-item"]').last().should('have.text', '@988lifeline')
                // test the up and down buttons
                cy.get('[data-cy="rearrange-items-modal--list-item"]').each(($el, index, $list) => {

                    cy.wrap($el).within(() => {
                        cy.get('[data-cy="rearrange-items-modal--up-button"]').should('exist')
                        cy.get('[data-cy="rearrange-items-modal--down-button"]').should('exist')
                    })
                })

                // up button on first list item should be disabled
                cy.get('[data-cy="rearrange-items-modal--list-item"]').first().within(() => {
                    cy.get('[data-cy="rearrange-items-modal--up-button"]').should('be.disabled')
                    cy.get('[data-cy="rearrange-items-modal--down-button"]').should('not.be.disabled')
                })

                // down button on last item should be disabled
                cy.get('[data-cy="rearrange-items-modal--list-item"]').last().within(() => {
                    cy.get('[data-cy="rearrange-items-modal--up-button"]').should('not.be.disabled')
                    cy.get('[data-cy="rearrange-items-modal--down-button"]').should('be.disabled')
                })
            })

            cy.contains('Cancel').click()
            cy.get('[data-cy="rearrange-items-modal"]').should('not.exist')
        })

    })


    it('can render edit bio modal', () => {
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

    it('can render new item modal', () => {
        cy.get('[data-cy="new-item-button"]').should('exist').should('have.text', 'New Item').click()
        // Should have empty name and subtitle text fields
        cy.get('[data-cy="new-item-modal"]').should('exist').should('be.visible').within(() => {
            cy.percySnapshot('New Item Modal: List', { widths: PERCY_WIDTHS, fullPage: true });
            cy.get('[data-cy="new-item-modal--item-name"]').should('exist').within(() => {
                cy.get('input').should('exist').should('have.value', '')
            })
            cy.get('[data-cy="new-item-modal--item-subtitle"]').should('exist').within(() => {
                cy.get('input').should('exist').should('have.value', '')
            })
            
            cy.get('[data-cy="new-item-modal--cancel"]').should('exist').should('have.text', 'Cancel')
            cy.get('[data-cy="new-item-modal--create"]').should('exist').should('have.text', 'Create').should('be.disabled')
            
            // RadioGroup should have List selected by default
            cy.get('[data-cy="new-item-modal--item-type"]').should('exist').within(() => {
                cy.get('input').should('exist').should('have.value', 'list').should('have.attr', 'checked')
            })
            // Should have radio buttons specifying List or Link
            cy.get('[data-cy="new-item-modal--item-type"]').should('exist').within(() => {
                cy.get('[data-cy="new-item-modal--item-type--list"]').should('exist').should('have.text', 'List')
                cy.get('[data-cy="new-item-modal--item-type--link"]').should('exist').should('have.text', 'Link')
            })

            // Click on the Link radio button to switch types
            cy.get('[data-cy="new-item-modal--item-type--link"]').click()
            
            cy.get('[data-cy="new-item-modal--item-name"]').should('exist').within(() => {
                cy.get('input').should('exist').should('have.value', '')
            })
            cy.get('[data-cy="new-item-modal--item-uri"]').should('exist').within(() => {
                cy.get('input').should('exist').should('have.value', '')
            })
            cy.percySnapshot('New Item Modal: URI', { widths: PERCY_WIDTHS, fullPage: true });
        })
        cy.get('[data-cy="new-item-modal--cancel"]').click()
        cy.get('[data-cy="new-item-modal"]').should('not.exist')
    })
})




