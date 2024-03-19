
describe('Forms end-to-end tests', () => {
  it('Submit button disabled when invalid input', () => {
    cy.visit('/forms')
    cy.contains('label', 'First name:')

    cy.get('input[name=name]').type("test name")
    cy.get('input[name=mail]').type("@test.com")
    cy.get('input[name=message]').type("test message")

    cy.get('#submit').should('be.disabled')
  })

  it('Successful response from server', () => {
    cy.visit('/forms')
    cy.contains('label', 'First name:')

    cy.get('input[name=name]').type("test name")
    cy.get('input[name=mail]').type("test@test.com")
    cy.get('input[name=message]').type("test message")

    cy.get('#submit').click()

    cy.contains('p', 'Data sent successfully. [object Object]')
  })
})
