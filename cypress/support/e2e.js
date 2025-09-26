import "./commands";
require("cypress-wait-until");
import "@4tw/cypress-drag-drop";

Cypress.on("uncaught:exception", (err, runnable) => {
  // retorna false para não falhar o teste
  return false;
});
