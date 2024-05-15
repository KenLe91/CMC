1. Initialize node project and install cypress
npm init -y
npm install cypress --save-dev
npm install -D cypress-xpath
npx cypress open

2. Install packages
npm install @badeball/cypress-cucumber-preprocessor --save-dev
npm install @bahmutov/cypress-esbuild-preprocessor --save-dev  // Bundle Cypress specs using esbuild - to increase performance

3. Update cypress configs
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("file:preprocessor",
      createBundler({
        plugins: [createEsbuildPlugin.default(config)],
      }));
      preprocessor.addCucumberPreprocessorPlugin(on, config);
      return config;
    },
	specPattern: "**/*.feature",
  },
})

4. Update "cypress-cucumber-preprocessor" configs (Set step definitions path and make them global)
"cypress-cucumber-preprocessor": {
    "step_definitions": "cypress/support/step_definitions/",
    "nonGlobalStepDefinitions": false
  }