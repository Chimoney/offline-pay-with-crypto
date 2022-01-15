/* eslint-disable no-undef */

describe('generate payment link', () => {
  beforeEach(() => {
    cy.visit('/#')
  })

  it('renders config component correctly', () => {
    cy.get('#modal-config').should('exist')
  })

  it('completes the form', () => {
    cy.get('input[name="name"]')
      .should('be.visible')
      .type('Chi Technologies Inc.')

    // cy.get('#paymentDescription')
    //   .should('be.visible')
    //   .type(
    //     `${encodeURI('{"issueID":"yyXALP0a26yhFWMlPUsk_15_1642203253656"}')}`
    //   )

    // cy.get('input[name="storeImg"]')
    //   .should('be.visible')
    //   .type(
    //     'https://lh3.googleusercontent.com/-crMj-_7sKco/AAAAAAAAAAI/AAAAAAAAAAA/8wRiFKrmpe8/s40-c-k-mo/photo.jpg'
    //   )

    // cy.get('input[name="amountToCharge"]').should('be.visible').clear().type(1)

    // cy.get('#add-token-btn').should('be.visible').click()
  })
})
