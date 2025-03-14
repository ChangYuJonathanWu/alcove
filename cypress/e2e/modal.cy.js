const PERCY_WIDTHS = [768, 1920]

describe('Modal', () => {

    beforeEach(() => {
        cy.visit('localhost:3000/239jsdfk9Q2jjsk_no_spotify')
        cy.get('[data-cy="profile-photo-loaded"]').should('exist.exist')
    })
    it('can render new item modal and flow', {retries: 2}, () => {
        cy.contains("Edit Profile").should('exist')
        cy.get('[data-cy="new-item-button"]').should('exist').should('have.text', 'New Highlight').click()
        cy.get('[data-cy="new-item-selection-modal"]').should('exist').should('be.visible').within(() => {
            cy.percySnapshot('New Item Type Selection Modal', { widths: PERCY_WIDTHS, fullPage: true });
            cy.get('[data-cy="new-item-selection-modal--header"]').should('exist')
            cy.get('[data-cy="new-item-selection-modal--close-button"]').should('exist')
            cy.get('[data-cy="new-item-type-list"]').should('exist')
            cy.get('[data-cy="new-item-type-link"]').should('exist')

            // Open up the list item form
            cy.get('[data-cy="new-item-type-list"]').should('be.visible').click()
        })
        cy.get('[data-cy="new-item-selection-modal"]').should('exist').should('be.visible').within(() => {

            cy.get('[data-cy="new-item-selection-modal--indicator-toggle"]').should('exist').should('be.visible').within(() => {
                cy.contains("List").should('exist')
            })
            // Verify contents of List Item
            cy.get("[data-cy='list-item-form']").should('exist').within(() => {
                cy.percySnapshot('New Item List Modal', { widths: PERCY_WIDTHS, fullPage: true });
                cy.get('[data-cy="list-item-form--title-field"]').should('exist')
                cy.get('[data-cy="list-item-form--subtitle-field"]').should('exist')
                // Submit button should be disabled
                cy.get('[data-cy="list-item-form--submit-button"]').should('exist').should('be.disabled')

                // Type in a random title and subtitle
                cy.get('[data-cy="list-item-form--title-field"]').type("This is a title")
                cy.get('[data-cy="list-item-form--subtitle-field"]').type("This is a subtitle")

                // Submit button should be enabled
                cy.get('[data-cy="list-item-form--submit-button"]').should('exist').should('not.be.disabled')

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

                // Replace with valid URL
                cy.get('[data-cy="link-item-form--uri-field"]').type("https://www.google.com")

                // Submit button should be enabled
                cy.get('[data-cy="link-item-form--submit-button"]').should('exist').should('not.be.disabled')

                // Cancel button should exist
                cy.get('[data-cy="link-item-form--cancel-button"]').should('exist')
            })
        })

    })
    it('can render new new post type modal and flow', {retries: 2}, () => {
        cy.contains("Edit Profile").should('exist')
        // Open the first list
        cy.get('[data-cy="list-item"]').first().contains("sushi restaurants").click()
        cy.get('[data-cy="list-item-contents"]').first().should('exist').should('be.visible')
        cy.get('[data-cy="new-post-button"]').first().should('exist').should('have.text', 'New Post').click()
        // Should have empty name and subtitle text fields
        cy.get('[data-cy="new-post-selection-modal"]').should('exist').should('be.visible').within(() => {
            cy.percySnapshot('New Post Type Selection Modal', { widths: PERCY_WIDTHS, fullPage: true });
            cy.get('[data-cy="new-post-selection-modal--header"]').should('exist')
            cy.get('[data-cy="new-post-selection-modal--close-button"]').should('exist')
            cy.get('[data-cy="new-post-type-standard"]').should('exist')
            cy.get('[data-cy="new-post-type-instagram"]').should('exist')
            cy.get('[data-cy="new-post-type-spotify"]').should('exist')
            cy.get('[data-cy="new-post-type-youtube"]').should('exist')

            // Open up the standard post
            cy.get('[data-cy="new-post-type-standard"]').click()


            cy.get('[data-cy="new-post-selection-modal--indicator-toggle"]').should('exist').should('be.visible').within(() => {
                cy.contains("Create your own").should('exist')
            })
            // Verify contents of Standard Post
            cy.get("[data-cy='standard-post-form']").should('exist').within(() => {
                cy.percySnapshot('New Post Standard Modal', { widths: PERCY_WIDTHS, fullPage: true });
                cy.get('[data-cy="standard-post-form--title-field"]').should('exist')
                cy.get('[data-cy="standard-post-form--subtitle-field"]').should('exist')
                cy.get('[data-cy="standard-post-form--image-field"]').should('exist')
                cy.get('[data-cy="standard-post-form--caption-field"]').should('exist')
                cy.get('[data-cy="standard-post-form--link-field"]').should('exist')
                // Submit button should be disabled
                cy.get('[data-cy="standard-post-form--submit-button"]').should('exist').should('be.disabled')

                // Type in a random title and subtitle
                cy.get('[data-cy="standard-post-form--title-field"]').type("This is a title")
                cy.get('[data-cy="standard-post-form--subtitle-field"]').type("This is a subtitle")

                // Submit button should be enabled
                cy.get('[data-cy="standard-post-form--submit-button"]').should('exist').should('not.be.disabled')

                // Cancel button should exist
                cy.get('[data-cy="standard-post-form--cancel-button"]').should('exist')

            })
            // Go back to post selection
            cy.get('[data-cy="new-post-selection-modal--indicator-toggle"]').click()
            // Sanity check verify all post types are still there
            cy.get('[data-cy="new-post-type-standard"]').should('exist')
            cy.get('[data-cy="new-post-type-instagram"]').should('exist')
            cy.get('[data-cy="new-post-type-spotify"]').should('exist')
            cy.get('[data-cy="new-post-type-youtube"]').should('exist')

            // Open up the instagram post
            cy.get('[data-cy="new-post-type-instagram"]').click()

            // Indicator toggle should say Instagram
            cy.get('[data-cy="new-post-selection-modal--indicator-toggle"]').should('exist').should('be.visible').within(() => {
                cy.contains("Instagram").should('exist')
            })

            cy.get("[data-cy='instagram-post-form']").should('exist').within(() => {
                cy.percySnapshot('New Post Instagram Modal', { widths: PERCY_WIDTHS, fullPage: true });
                cy.get('[data-cy="instagram-post-form--link-field"]').should('exist')
                // Submit post button should be disabled
                cy.get('[data-cy="instagram-post-form--submit-button"]').should('exist').should('be.disabled')
                // Populate the link field with an instagram url
                cy.get('[data-cy="instagram-post-form--link-field"]').type('https://www.instagram.com/p/CFQZ9Y3H6Zq/')
                // Submit post button should be enabled
                cy.get('[data-cy="instagram-post-form--submit-button"]').should('exist').should('not.be.disabled')
                // Cancel button should exist
                cy.get('[data-cy="instagram-post-form--cancel-button"]').should('exist')
            })

            // Go back to post selection
            cy.get('[data-cy="new-post-selection-modal--indicator-toggle"]').click()
            // Sanity check verify all post types are still there
            cy.get('[data-cy="new-post-type-standard"]').should('exist')
            cy.get('[data-cy="new-post-type-instagram"]').should('exist')
            cy.get('[data-cy="new-post-type-spotify"]').should('exist')
            cy.get('[data-cy="new-post-type-youtube"]').should('exist')

            // Open up the spotify post
            cy.get('[data-cy="new-post-type-spotify"]').click()

            // Indicator toggle should say Spotify
            cy.get('[data-cy="new-post-selection-modal--indicator-toggle"]').should('exist').should('be.visible')

            cy.get("[data-cy='spotify-post-form']").should('exist').within(() => {
                cy.percySnapshot('New Post Spotify Modal', { widths: PERCY_WIDTHS, fullPage: true });
                cy.get('[data-cy="spotify-post-form--link-field"]').should('exist')
                // Submit post button should be disabled
                cy.get('[data-cy="spotify-post-form--submit-button"]').should('exist').should('be.disabled')
                // Populate the link field with an spotify url
                cy.get('[data-cy="spotify-post-form--link-field"]').type('https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=5b2b6e4d3f3c4e4b')
                // Submit post button should be enabled
                cy.get('[data-cy="spotify-post-form--submit-button"]').should('exist').should('not.be.disabled')
                // Cancel button should exist
                cy.get('[data-cy="spotify-post-form--cancel-button"]').should('exist')
            })

            // Go back to post selection
            cy.get('[data-cy="new-post-selection-modal--indicator-toggle"]').click()
            // Sanity check verify all post types are still there
            cy.get('[data-cy="new-post-type-standard"]').should('exist')
            cy.get('[data-cy="new-post-type-instagram"]').should('exist')
            cy.get('[data-cy="new-post-type-spotify"]').should('exist')
            cy.get('[data-cy="new-post-type-youtube"]').should('exist')

            // Open up the youtube post
            cy.get('[data-cy="new-post-type-youtube"]').click()

            // Indicator toggle should say YouTube
            cy.get('[data-cy="new-post-selection-modal--indicator-toggle"]').should('exist').should('be.visible')

            cy.get("[data-cy='youtube-post-form']").should('exist').within(() => {
                cy.percySnapshot('New Post YouTube Modal', { widths: PERCY_WIDTHS, fullPage: true });
                cy.get('[data-cy="youtube-post-form--link-field"]').should('exist')
                // Submit post button should be disabled
                cy.get('[data-cy="youtube-post-form--submit-button"]').should('exist').should('be.disabled')
                // Populate the link field with an youtube url
                cy.get('[data-cy="youtube-post-form--link-field"]').type('https://www.youtube.com/watch?v=3AtDnEC4zak')
                // Submit post button should be enabled
                cy.get('[data-cy="youtube-post-form--submit-button"]').should('exist').should('not.be.disabled')
                // Cancel button should exist
                cy.get('[data-cy="youtube-post-form--cancel-button"]').should('exist')

                // Clicking cancel button should exit the modal
                cy.get('[data-cy="youtube-post-form--cancel-button"]').click()
            })
            cy.get('[data-cy="new-item-modal"]').should('not.exist')
        })
    })

    it('can render edit list item modal', {retries: 2}, () => {
        cy.contains("Edit Profile").should('exist')
        cy.get('[data-cy="edit-item-icon"]').should('have.length', 1)
        // Open up the first list
        cy.get('[data-cy="list-item"]').first().click()
        // There should be two edit-item-icon 
        cy.get('[data-cy="edit-item-icon"]').should('have.length', 2)
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
            cy.get('[data-cy="edit-item-modal--cancel-button"]').should('be.visible').click()
        })
        cy.get('[data-cy="edit-item-modal"]').should('not.exist')
    })

    it('can render edit uri item modal', {retries: 2}, () => {
        cy.contains("Edit Profile").should('exist')
        cy.get('[data-cy="edit-item-icon"]').should('have.length', 1)
        cy.get('[data-cy="uri-item"]').within(() => {
            cy.get('[data-cy="edit-item-icon"]').first().should("be.visible").click()
        })
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
            cy.get('[data-cy="edit-item-modal--cancel-button"]').should('exist').click()
        })
        cy.get('[data-cy="edit-item-modal"]').should('not.exist')
    })

    it('can render change item order modal', {retries: 2}, () => {
        cy.contains("Edit Profile").should('exist')
        cy.get('[data-cy="rearrange-items-button"]').first().should('exist').should('be.visible').should('have.text', 'Change Order').click()

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

    it('can render edit bio modal', {retries: 2}, () => {
        cy.contains('Edit Profile').should('exist').click({ force: true })
        cy.get('#edit-bio-modal').should('exist')
        cy.percySnapshot('Edit Profile Modal', { widths: PERCY_WIDTHS, fullPage: true });
        cy.get('#edit-bio-modal').within(() => {
            cy.get('#edit-bio-profile-photo').should('exist')
            cy.get('img').should('have.attr', 'src', 'https://alcove.place/profiles/photos/tH7kAkdmO20akaAjkd.jpeg')
            cy.get('#edit-bio-remove-profile-photo').should('exist').should('have.text', 'Remove')
            cy.get('#edit-bio-change-profile-photo').should('exist').should('have.text', 'Change')
            cy.get('#edit-bio-name').should('exist').should('have.value', 'jonathan wu')
            cy.get('#edit-bio-bio').should('exist').should('have.value', 'my favorites')

            cy.get('#edit-bio-instagram').should('exist').should('have.value', 'test-ig')
            cy.get('#edit-bio-facebook').should('exist').should('have.value', 'test-facebook')
            cy.get('#edit-bio-twitter').should('exist').should('have.value', 'test-twitter')
            cy.get('#edit-bio-reddit').should('exist').should('have.value', 'test-reddit')
            cy.get('#edit-bio-linkedin').should('exist').should('have.value', 'test-linkedin')
            cy.get('#edit-bio-tiktok').should('exist').should('have.value', 'test-tik-tok')
            cy.get('#edit-bio-snapchat').should('exist').should('have.value', 'test-snapchat')
            cy.get('#edit-bio-bereal').should('exist').should('have.value', 'test-bereal')

            cy.get('#edit-bio-cancel').should('exist').should('have.text', 'Cancel')
            cy.get('#edit-bio-done').should('exist').should('have.text', 'Done')
        })
        cy.get('#edit-bio-cancel').click()
        cy.get('#edit-bio-modal').should('not.exist')
    })
})
