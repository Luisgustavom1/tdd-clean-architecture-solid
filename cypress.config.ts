import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const webpackPreprocessor = require('@cypress/webpack-preprocessor')

      const options = {
        webpackOptions: require('./webpack.dev.js'),
        watchOptions: {},
      } 

      on('file:preprocessor', webpackPreprocessor(options))
      
      return config
    },
    baseUrl: 'http://localhost:8080',
    supportFile: 'src/main/test/cypress/support/e2e.js',
    specPattern: 'src/main/test/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    video: false
  },
})
