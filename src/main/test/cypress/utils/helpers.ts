const baseUrl = Cypress.config().baseUrl

export const testHttpCallCount = (count: number) => {
  cy.get('@request.all').should('have.length', count)
}

export const testUrl = (url: string) => {
  cy.url().should('eq', `${baseUrl}${url}`)
}

export const testLocalStorageItem = (key: string) => {
  cy.window().then(w => assert.isOk(w.localStorage.getItem(key)))
}

export const setLocalStorageItem = (key: string, value: object) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorageItem = (key: string) => {
  return JSON.parse(localStorage.getItem(key))
}