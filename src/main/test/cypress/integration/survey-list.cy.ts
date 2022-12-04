import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

export const mockUnexpctedError = (): void => Http.mockServerError(/surveys/, 'GET')
export const mockAccessDeniedError = (): void => Http.mockForbiddenError(/surveys/, 'GET')
export const mockSuccess = (): void => Http.mockOk(/surveys/, 'GET', 'fx:survey-list')

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account)
    })
  })
  it('Should preset error on UnexpectedError', () => {
    mockUnexpctedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em instantes')
  })
  it('Should reload on button click', () => {
    mockUnexpctedError()
    cy.visit('')
    mockSuccess()
    cy.getByTestId('reload').click()
    cy.get('li:not(:empty)').should('have.length', 2)
  })
  it('Should preset error on UnexpectedError', () => {
    mockAccessDeniedError()
    cy.visit('')
    Helper.testUrl('/login')
  })
  it('Should preset correct name', () => {
    mockUnexpctedError()
    cy.visit('')
    const { name } = Helper.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })
  it('Should logout on logout link click', () => {
    mockUnexpctedError()
    cy.visit('')
    cy.getByTestId('logout').click()
    Helper.testUrl('/login')
  })
  it('Should present survey items', () => {
    mockSuccess()
    cy.visit('')
    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '03')  
      assert.equal(li.find('[data-testid="month"]').text(), 'fev')  
      assert.equal(li.find('[data-testid="year"]').text(), '2018')  
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')  
      assert.exists(li.find('[data-testid="thumb-up-icon"]'))  
    })

    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '20')  
      assert.equal(li.find('[data-testid="month"]').text(), 'out')  
      assert.equal(li.find('[data-testid="year"]').text(), '2020')  
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2')  
      assert.exists(li.find('[data-testid="thumb-down-icon"]'))  
    })
  })
})