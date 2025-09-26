import "./commands";

Cypress.on("uncaught:exception", (err, runnable) => {
  // retorna false para não falhar o teste
  return false;
});
