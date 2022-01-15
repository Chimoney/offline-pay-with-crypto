/* eslint-disable no-undef */

describe('test for the modal component', () => {
  beforeEach(() => {
    cy.visit(
      '/?paymentDescription=Send%20a%20payment%20to%20chimoney.io&name=Test%20app&storeImg=https://lh3.googleusercontent.com/-crMj-_7sKco/AAAAAAAAAAI/AAAAAAAAAAA/8wRiFKrmpe8/s88-p-k-no-ns-nd/photo.jpg&supportedCurrencies=%7B"CELO"%3A%7B"code"%3A"CELO"%2C"walletAddress"%3A"0x363f932743599EBc88C85A35C201615dA4f2Bc5E"%2C"amount"%3A1%7D%2C"cUSD"%3A%7B"code"%3A"cUSD"%2C"walletAddress"%3A"0x363f932743599EBc88C85A35C201615dA4f2Bc5E"%2C"amount"%3A1%7D%7D'
    )
  })

  it('renders modal component correctly', () => {
    cy.get('#modal-container').should('exist')
  })

  it('renders qr code image', () => {
    cy.get('.qr-code').should('exist')
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
    cy.findAllByText('Secured by Cryptography').should('exist')
  })

  it('can enter email and accept payment through agent', function () {
    cy.get('.inactive').click()
    cy.get('#agent-email').clear()
    cy.get('#agent-email').type('test@gmail.com')
    cy.get('#agent-name').clear()
    cy.get('#agent-name').type('Anita Udeme')
    cy.get('#agent-name').should('have.value', 'Anita Udeme')
    cy.get('.agent-btn > button').click()
  })
})
