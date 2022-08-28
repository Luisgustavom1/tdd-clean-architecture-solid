import { faker } from "@faker-js/faker";

const baseUrl = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.server()
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
 
  it('Should present InvalidCredentialsError on 401', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 401,
      response: {
        error: faker.random.words()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6))
    cy.getByTestId('submit-form').click()
    cy.getByTestId('status-wrap')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').contains('Credenciais inválidas')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present UnexpectedError on 400', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 400,
      response: {
        error: faker.random.words()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6)).type('{enter}')
    cy.getByTestId('status-wrap')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').contains('Algo de errado aconteceu. Tente novamente em instantes')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present save accessToken if valid credentials are povided', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.datatype.uuid()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit-form').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(w => assert.isOk(w.localStorage.getItem('accessToken')))
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        invalidProperty: faker.datatype.uuid()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit-form').click()
    cy.getByTestId('status-wrap')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').contains('Algo de errado aconteceu. Tente novamente em instantes')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should prevent multiple submits', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        invalidProperty: faker.datatype.uuid()
      }
    }).as('request')
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit-form').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })
})
