import { faker } from "@faker-js/faker";

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readonly')
    cy.getByTestId('email-error').contains("Campo obrigatório")
    cy.getByTestId('password').should('have.attr', 'readonly')
    cy.getByTestId('password-error').contains("Campo obrigatório")
    cy.getByTestId('submit-form').should('be.disabled')
    cy.getByTestId('status-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('email-error').contains("Email inválido")
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(4))
    cy.getByTestId('password-error').contains("O tamanho mínimo é de 5 caracteres")
    cy.getByTestId('submit-form').should('be.disabled')
    cy.getByTestId('status-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('email-error').should('be.empty')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6))
    cy.getByTestId('password-error').should('be.empty')
    cy.getByTestId('submit-form').should('not.be.disabled')
    cy.getByTestId('status-wrap').should('not.have.descendants')
  })
})
