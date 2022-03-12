/// <reference types="cypress" />

describe('Minimal Todo App', () => {
    beforeEach(() => {
        cy.visit('localhost:3000')

        cy.get('input').type("Buy Presents{enter}")
        cy.get('input').type("Learn TypeScript{enter}")
        cy.get('input').type("Read a Book{enter}")

    })

    it('can add new todo items', () => {
        const newItem = 'Feed the cat'

        cy.get('input').type(`${newItem}{enter}`)
        cy.get('li').first().should('have.text', newItem)
        cy.get('li').should('have.length', 4)
    })

    it('can clears all', () => {
        cy.contains("Clear all").click()
        cy.get('li').should('not.exist')
        cy.contains("Clear all").should('not.exist')
    })

    it('can mark an item as completed and then delete it', () => {
        cy.get('li').first().click()
        cy.get('li').contains("Delete").should('exist')

        cy.get('li').contains("Delete").click()
        cy.get('li').should('have.length', 2)
    })

    })