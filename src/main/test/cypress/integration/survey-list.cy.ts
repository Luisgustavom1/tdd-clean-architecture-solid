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
})