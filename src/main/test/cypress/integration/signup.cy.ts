import { faker } from "@faker-js/faker";
import * as FormHelper from '../support/form-helper'
import * as SignupMocks from "../support/signup-mocks";

const populateFields = () => {
  const pasword = faker.random.alphaNumeric(5)
  cy.getByTestId('name').focus().type(faker.random.alphaNumeric(5))
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(pasword)
  cy.getByTestId('passwordConfirmation').focus().type(pasword)
}

const simulateValidSubmit = () => {
  populateFields()
  cy.getByTestId('submit-form').click()
}

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup')
  })
  it('Should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readonly')
    FormHelper.testInputError('name', "Campo obrigatório")
    cy.getByTestId('email').should('have.attr', 'readonly')
    FormHelper.testInputError('email', "Campo obrigatório")
    cy.getByTestId('password').should('have.attr', 'readonly')
    FormHelper.testInputError('password', "Campo obrigatório")
    cy.getByTestId('passwordConfirmation').should('have.attr', 'readonly')
    FormHelper.testInputError('passwordConfirmation', "Campo obrigatório")
    cy.getByTestId('submit-form').should('be.disabled')
    cy.getByTestId('status-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(3))
    FormHelper.testInputError('name', "O tamanho mínimo é de 5 caracteres")
    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelper.testInputError('email', "Email inválido")
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(4))
    FormHelper.testInputError('password', "O tamanho mínimo é de 5 caracteres")
    cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(4))
    FormHelper.testInputError('passwordConfirmation',"Os valores não são iguais")
    cy.getByTestId('submit-form').should('be.disabled')
    cy.getByTestId('status-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    populateFields()
    cy.getByTestId('email-error').should('be.empty')
    cy.getByTestId('password-error').should('be.empty')
    cy.getByTestId('submit-form').should('not.be.disabled')
    cy.getByTestId('status-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUserError on 403', () => {
    SignupMocks.mockEmailInUserError()
    simulateValidSubmit()
    FormHelper.testMainError('O email já esta em uso, digite um diferente')
    FormHelper.testUrl('/signup')
  })

  it('Should present UnexpectedError on 400', () => {
    SignupMocks.mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em instantes')
    FormHelper.testUrl('/signup')
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    SignupMocks.mockInvalidData()
    simulateValidSubmit()
    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em instantes')
    FormHelper.testUrl('/signup')
  })

  it('Should present save account if valid credentials are povided', () => {
    SignupMocks.mockOk()
    simulateValidSubmit()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('not.exist')
    FormHelper.testUrl('/')
    FormHelper.testLocalStorageItem('account')
  })

  it('Should prevent multiple submits', () => {
    SignupMocks.mockOk()
    populateFields()
    cy.getByTestId('submit-form').dblclick()
    FormHelper.testHttpCallCount(1)
  })

  it('Should not call submit if form is invalid', () => {
    SignupMocks.mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    FormHelper.testHttpCallCount(0)
  })
})
