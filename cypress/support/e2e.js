import "./commands";
require("cypress-wait-until");

Cypress.on("uncaught:exception", (err, runnable) => {
  // retorna false para não falhar o teste
  return false;
});
