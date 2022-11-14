import { faker } from '@faker-js/faker'
import * as Helper from '../support/helpers'
import * as Http from '../support/survey-list-mocks'
 
describe('SurveyList', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', { accessToken: faker.random.numeric(), name: faker.name.firstName() })
  })
  it('Should preset error on UnexpectedError', () => {
    Http.mockUnexpctedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em instantes')
  })
  it('Should preset error on UnexpectedError', () => {
    Http.mockAccessDeniedError()
    cy.visit('')
    Helper.testUrl('/login')
  })
  it('Should preset correct name', () => {
    Http.mockUnexpctedError()
    cy.visit('')
    const { name } = Helper.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })
  it('Should logout on logout link click', () => {
    Http.mockUnexpctedError()
    cy.visit('')
    cy.getByTestId('logout').click()
    Helper.testUrl('/login')
  })
})