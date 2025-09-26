const cucumber = require("cypress-cucumber-preprocessor").default; //Importação cucumber
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
    },
    specPattern: "cypress/e2e/web/step_definitions/*.feature",
  },
});
