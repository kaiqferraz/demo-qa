const cucumber = require("cypress-cucumber-preprocessor").default;
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
    },

    specPattern: "cypress/e2e/**/*.feature",
  },
  env: {
    stepDefinitions: "cypress/e2e",
  },
});
