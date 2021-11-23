/* eslint-disable no-undef */

describe('test for the modal component', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders modal component correctly', () => {
    cy.get('#modal-container').should('exist')
  })

  it('renders qr code image', () => {
    cy.get('#qr-code').should('exist')
  })

  it('displays payment address', () => {
    cy.get('.code').should('exist')
  })

  it('can switch between payment option tabs', () => {
    cy.get('.inactive').click()
    cy.get('.inactive').click()
  })

  it('can select a currency', () => {
    /* ==== Test Created with Cypress Studio ==== */
  })

  it('renders footer', () => {
    cy.findAllByText('Secured by cryptography').should('exist')
  })

  it('can enter email and accept payment through agent', function () {
    cy.get('.inactive').click()
    cy.get('#agent-email').clear()
    cy.get('#agent-email').type('test@gmail.com')
    cy.get('#agent-email').should('have.value', 'test@gmail.com')
    cy.get('button').click()
  })
})
