const PERCY_WIDTHS = [768, 1920]
describe('Homepage', () => {
    it('Loads the homepage', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Your highlight reel').should('exist')
        cy.get('[data-cy="navbar"]').should('exist')
        cy.get('[data-cy="navbar--logo').should('exist')
        cy.get('[data-cy="login-button"]').should('exist')
        cy.get('[data-cy="cta"]').should('exist')
        cy.get('[data-cy="signup-handle-input').should('exist')
        cy.get('#signup-submit-button').should('exist')
        cy.percySnapshot('Homepage', { widths: PERCY_WIDTHS });
    })
    it('Loads login page', () => {
        cy.visit('http://localhost:3000/login')
        cy.contains('Login').should('exist')
        cy.percySnapshot('Login', { widths: PERCY_WIDTHS });
    })
    it('Loads forgot password page', () => {
        cy.visit('http://localhost:3000/forgot-password')
        cy.contains('Send Reset Link').should('exist')
        cy.percySnapshot('Password Reset', { widths: PERCY_WIDTHS });
    })
    it('Loads account reset page without oob code', () => {
        cy.visit('http://localhost:3000/account/reset')
        cy.contains('Please check your email for a link to reset your password.').should('exist')
        cy.percySnapshot('Account reset, missing OOB', { widths: PERCY_WIDTHS });
    })
    it('Loads account reset page with oob code', () => {
        cy.visit('http://localhost:3000/account/reset?oobCode=123456')
        cy.contains('Create').should('exist')
        cy.percySnapshot('Account reset, with OOB', { widths: PERCY_WIDTHS });
    })
})