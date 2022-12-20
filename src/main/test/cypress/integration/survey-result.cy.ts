import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

export const mockUnexpctedError = (): void => Http.mockServerError(/surveys/, 'GET')

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpctedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em instantes')
  })
})