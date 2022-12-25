import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

export const mockLoadSuccess = (): void => Http.mockOk(/surveys/, 'GET', 'fx:load-survey-result')

describe('SurveyResult', () => {
  describe('Load', () => {
    const mockUnexpectedError = (): void => Http.mockServerError(/surveys/, 'GET')
    const mockAccessDeniedError = (): void => Http.mockForbiddenError(/surveys/, 'GET')

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
      mockLoadSuccess()
      cy.getByTestId('reload').click()
      cy.getByTestId('question').should('exist')
    })
    it('Should preset error on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.visit('/surveys/any_id')
      Helper.testUrl('/login')
    })
    it('Should present survey result', () => {
      mockLoadSuccess()
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
    it('Should go to SurveyList on back button click', () => {
      cy.visit('/')
      mockLoadSuccess()
      cy.visit('/surveys/any_id')
      cy.getByTestId('back-button').click()
      Helper.testUrl('/')
    })
  })
  describe('Save', () => {
    const mockUnexpectedError = (): void => Http.mockServerError(/surveys/, 'PUT')
    const mockAccessDeniedError = (): void => Http.mockForbiddenError(/surveys/, 'PUT')
    const mockSaveSuccess = (): void => Http.mockOk(/surveys/, 'GET', 'fx:save-survey-result')

    beforeEach(() => {
      cy.fixture('account').then(account => {
        Helper.setLocalStorageItem('account', account)
      })
      mockLoadSuccess()
      cy.visit('/surveys/any_id')
    })
    it('Should present error on UnexpectedError', () => {
      mockUnexpectedError()
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em instantes')
    })
    it('Should preset error on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.get('li:nth-child(2)').click()
      Helper.testUrl('/login')
    })
    it('Should present survey result', () => {
      mockSaveSuccess()
      cy.get('li:nth-child(2)').click()

      cy.getByTestId('question').should('have.text', 'Other Question')
      cy.getByTestId('day').should('have.text', '12')  
      cy.getByTestId('month').should('have.text', 'abr')  
      cy.getByTestId('year').should('have.text', '2022') 
  
      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'other_any_answer')  
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'other_any_image')  
        assert.equal(li.find('[data-testid="percent"]').text(), '90%')  
      })
      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'other_any_answer_2')  
        assert.notExists(li.find('[data-testid="image"]')) 
        assert.equal(li.find('[data-testid="percent"]').text(), '23%')  
      })
    })
  })
})