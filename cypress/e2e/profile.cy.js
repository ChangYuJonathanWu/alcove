const PERCY_WIDTHS = [768, 1920]

describe('Profile', () => {
    it('Loads my profile', () => {
        cy.visit('http://localhost:3000/jonathanwu')
        cy.contains('jonathan wu', { timeout: 10000}).should('exist')
        cy.contains('Edit Profile').should('not.exist')
        cy.percySnapshot('Profile', { widths: PERCY_WIDTHS });
    })
    it('Loads my profile on public view', () => {
        cy.visit('http://localhost:3000/jonathanwu/public')
        cy.contains('jonathan wu').should('exist')
        cy.percySnapshot('Profile (Public)', { widths: PERCY_WIDTHS });
    })
    it('Loads the test profile and renders expected elements', () => {
        cy.visit('http://localhost:3000/jHak91janUhqmOakso')
        cy.contains('jonathan wu').should('exist')
        cy.get("#jonathanwu-profile-photo").should('exist')
        cy.contains("@jonathanwu").should('exist')
        cy.contains("my favorites").should('exist')
        cy.contains("Edit Profile").should('exist')
        cy.get("#instagram-bio-link").should('exist')
        cy.get('#instagram-bio-link').should('have.attr', 'href', 'https://www.instagram.com/jonathannwuu')
        cy.get("#facebook-bio-link").should('exist')
        cy.get("#facebook-bio-link").should('have.attr', 'href', 'https://www.facebook.com/jonathannwuu')
        cy.contains("sushi restaurants").should('exist')
        cy.contains("songs of all time").should('exist')
        cy.contains("hiking trails").should('exist')
        cy.contains("old but charming cars").should('exist')
        cy.contains("shows in recent memory").should('exist')
        cy.contains("@988lifeline").should('exist').should('have.attr', 'href', 'https://www.instagram.com/988lifeline')
    })

    it('Loads the test no-spotify profile and renders all social links possible', () => {
        cy.visit('http://localhost:3000/239jsdfk9Q2jjsk_no_spotify')
        cy.contains('jonathan wu').should('exist')
        cy.get("#jonathanwu-profile-photo").should('exist')
        cy.contains("@jonathanwu").should('exist')
        cy.contains("my favorites").should('exist')
        cy.contains("Edit Profile").should('exist')
        cy.get("#instagram-bio-link").should('exist')
        cy.get('#instagram-bio-link').should('have.attr', 'href', 'https://www.instagram.com/test-ig')
        cy.get("#facebook-bio-link").should('exist')
        cy.get("#facebook-bio-link").should('have.attr', 'href', 'https://www.facebook.com/test-facebook')
        cy.get("#tiktok-bio-link").should('exist')
        cy.get("#tiktok-bio-link").should('have.attr', 'href', 'https://www.tiktok.com/@test-tik-tok')
        cy.get("#twitter-bio-link").should('exist')
        cy.get("#twitter-bio-link").should('have.attr', 'href', 'https://www.twitter.com/test-twitter')
        cy.get("#bereal-bio-link").should('exist')
        cy.get("#bereal-bio-link").should('have.attr', 'href', 'https://www.BeRe.cal/test-bereal')
        cy.get("#linkedin-bio-link").should('exist')
        cy.get("#linkedin-bio-link").should('have.attr', 'href', 'https://www.linkedin.com/in/test-linkedin')
        cy.get("#reddit-bio-link").should('exist')
        cy.get("#reddit-bio-link").should('have.attr', 'href', 'https://www.reddit.com/user/test-reddit')
        cy.get("#snapchat-bio-link").should('exist')
        cy.get("#snapchat-bio-link").should('have.attr', 'href', 'https://www.snapchat.com/add/test-snapchat')
        cy.contains("sushi restaurants").should('exist')
        cy.contains("hiking trails").should('exist')
        cy.contains("old but charming cars").should('exist')
        cy.contains("shows in recent memory").should('exist')
        cy.contains("@988lifeline").should('exist').should('have.attr', 'href', 'https://www.instagram.com/988lifeline')
    })

    it('Can open a restaurant list and render posts', () => {
        // Open up list
        cy.visit('http://localhost:3000/jHak91janUhqmOakso')
        cy.get("#background-photo").should('exist')
        cy.contains("sushi restaurants").click()
        cy.contains("sushi restaurants").should('exist')
        cy.percySnapshot('Sushi Restaurants List', { widths: PERCY_WIDTHS, fullPage: true });

        // Verify first post
        cy.contains("they're sentimental").should('exist')
        cy.contains("Saburo's Sushi House").should('exist')
        cy.contains("Japanese - Portland, OR, USA").should('exist')
        cy.contains("where my earliest memories of sushi begin, earmarking many celebrations and occasions.").should('exist')
        cy.get('#list-id-l7 img:first').should('have.attr', 'src', '/content/saburos.jpg')
    })
    it('Can open song list and render Spotify iFrames', () => {
        // Open up list
        cy.visit('http://localhost:3000/jHak91janUhqmOakso')
        cy.contains("songs of all time").click()
        cy.contains("some of them atleast").should('exist')
        cy.percySnapshot('Sushi Restaurants List', { widths: PERCY_WIDTHS, fullPage: true });

        // iFrame should exist
        cy.wait(3000) // Give time for iFrames to load
        cy.percySnapshot('Songs List', { widths: PERCY_WIDTHS, fullPage: true });
        cy.get('#list-id-l1 iframe').should('have.length', 5)
        cy.get('#list-id-l1 iframe:first').should('have.attr', 'src', 'https://open.spotify.com/embed/track/1EXMjx4nCIvYTaY5CZMUSl')
    })
})
