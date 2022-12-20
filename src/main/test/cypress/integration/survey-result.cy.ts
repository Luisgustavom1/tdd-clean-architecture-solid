import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

export const mockUnexpectedError = (): void => Http.mockServerError(/surveys/, 'GET')
export const mockAccessDeniedError = (): void => Http.mockForbiddenError(/surveys/, 'GET')
export const mockSuccess = (): void => Http.mockOk(/surveys/, 'GET', 'fx:survey-result')

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account)
    })
  })
  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em instantes')
  })
  it('Should reload on button click', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em instantes')
    mockSuccess()
    cy.getByTestId('reload').click()
    cy.getByTestId('question').should('exist')
  })
  it('Should preset error on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('/surveys/any_id')
    Helper.testUrl('/login')
  })
  it('Should present survey result', () => {
    mockSuccess()
    cy.visit('/surveys/any_id')
    cy.getByTestId('question').should('have.text', 'Question 1')
    cy.getByTestId('day').should('have.text', '03')  
    cy.getByTestId('month').should('have.text', 'fev')  
    cy.getByTestId('year').should('have.text', '2018') 

    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer')  
      assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image')  
      assert.equal(li.find('[data-testid="percent"]').text(), '70%')  
    })
    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer_2')  
      assert.notExists(li.find('[data-testid="image"]')) 
      assert.equal(li.find('[data-testid="percent"]').text(), '59%')  
    })
  })
})