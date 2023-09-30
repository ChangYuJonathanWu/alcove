const PERCY_WIDTHS = [768, 1920]

describe('New Post Flow', () => {

    beforeEach(() => {
        cy.visit('localhost:3000/239jsdfk9Q2jjsk_no_spotify')
    })

    it('can render new new post type modal and flow', () => {
        cy.contains("Edit Profile").should('exist')
        // Open the first list
        cy.contains("sushi restaurants").click()
        cy.contains("New Post").click()
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

                // Clicking cancel button should exit the modal
                cy.get('[data-cy="spotify-post-form--cancel-button"]').click()
            })
            cy.get('[data-cy="new-item-modal"]').should('not.exist')
        })
    })
})
