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