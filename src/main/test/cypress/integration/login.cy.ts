import { faker } from "@faker-js/faker";
import * as FormHelper from '../support/form-helper'
import * as LoginMock from "../support/login-mocks";

const simulateValidSubmit = () => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
  cy.getByTestId('submit-form').click()
}

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
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6))
    cy.getByTestId('email-error').should('be.empty')
    cy.getByTestId('password-error').should('be.empty')
    cy.getByTestId('submit-form').should('not.be.disabled')
    cy.getByTestId('status-wrap').should('not.have.descendants')
  })
 
  it('Should present InvalidCredentialsError on 401', () => {
    LoginMock.mockInvalidCredentialsError()
    simulateValidSubmit()
    FormHelper.testMainError('Credenciais inválidas')
    FormHelper.testUrl('/login')
  })

  it('Should present UnexpectedError on 400', () => {
    LoginMock.mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em instantes')
    FormHelper.testUrl('/login')
  })

  it('Should present save accessToken if valid credentials are povided', () => {
    LoginMock.mockOk()
    simulateValidSubmit()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('not.exist')
    FormHelper.testUrl('/')
    FormHelper.testLocalStorageItem('accessToken')
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    LoginMock.mockInvalidData()
    simulateValidSubmit()
    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em instantes')
    FormHelper.testUrl('/login')
  })

  it('Should prevent multiple submits', () => {
    LoginMock.mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit-form').dblclick()
    FormHelper.testHttpCallCount(1)
  })

  it('Should not call submit if form is invalid', () => {
    LoginMock.mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    FormHelper.testHttpCallCount(0)
  })
})
