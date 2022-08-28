import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: false,
  e2e: {
    setupNodeEvents(on, config) {
      const webpackPreprocessor = require('@cypress/webpack-preprocessor')

      on('file:preprocessor', webpackPreprocessor())

      return config
    },
    baseUrl: 'http://localhost:8080',
    supportFile: false,
    specPattern: 'src/main/test/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
  },
})
