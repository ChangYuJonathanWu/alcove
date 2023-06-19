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
    it('Loads my profile on public view', () => {
        cy.visit('http://localhost:3000/jonathanwu/public')
        cy.contains('jonathan wu').should('exist')
        cy.percySnapshot('Profile (Public)', { widths: [768, 1200, 1920] });
    })
    it('Loads the test profile and renders expected elements', () => {
        cy.visit('http://localhost:3000/jHak91janUhqmOakso')
        cy.contains('jonathan wu').should('exist')
        cy.percySnapshot('Test Profile', { widths: [768, 1200, 1920] });
        cy.get("jonathanwu-profile-photo").should('exist')
        cy.contains("@jonathanwu").should('exist')
        cy.contains("my favorites").should('exist')
        cy.get("#instagram-bio-link").should('exist')
        cy.get('#instagram-bio-link').should('have.attr', 'href', 'https://www.instagram.com/jonathannwuu/')
        cy.get("#facebook-bio-link").should('exist')
        cy.get("facebook-bio-link").should('have.attr', 'href', 'https://www.facebook.com/jonathannwuu')
        cy.contains("sushi restaurants").should('exist')
        cy.contains("songs if all time").should('exist')
        cy.contains("hiking trails").should('exist')
        cy.contains("old but charming cars").should('exist')
        cy.contains("shows in recent memory").should('exist')
        cy.contains("@988lifeline").should('exist')
        // Open up list
        cy.contains("sushi restaurants").click()
        cy.contains("sushi restaurants").should('exist')
        // Verify first post
        cy.contains("they're sentimental").should('exist')
        cy.contains("Saburo's Sushi House").should('exist')
        cy.contains("Japanese - Portland, OR, USA").should('exist')
        cy.contains("where my earliest memories of sushi begin, earmarking many celebrations and occasions.").should('exist')
    })
    it('Loads login page', () => {
        cy.visit('http://localhost:3000/login')
        cy.contains('Login').should('exist')
        cy.percySnapshot('Login', { widths: [768, 1200, 1920] });
    })
  })