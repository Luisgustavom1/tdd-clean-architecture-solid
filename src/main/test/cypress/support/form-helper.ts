export const testInputError = (inputName: string, error: string) => {
  cy.getByTestId(`${inputName}-error`).contains(error)
}

export const testMainError = (error: string) => {
  cy.getByTestId('status-wrap')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').contains(error)
}

