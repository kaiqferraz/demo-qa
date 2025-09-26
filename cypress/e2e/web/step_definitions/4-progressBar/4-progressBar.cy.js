import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import progressBar from "../../../poo/4-progressBar.po.js";

Given("que o usuário acessa a página da progress bar", () => {
  cy.visit("https://demoqa.com/progress-bar");
});

When("o usuário clica no botão Start", () => {
  progressBar.startStopButton().click();
});

Then("a barra deve ser menor ou igual a 25%", () => {
  cy.wait(1000); // tempo para deixar a barra avançar
  progressBar
    .progressValue()
    .invoke("attr", "aria-valuenow")
    .then((value) => {
      const progress = parseInt(value);
      expect(progress).to.be.lte(25);
      progressBar.startStopButton().click(); // para a barra
    });
});

When("o usuário clica no botão Start novamente", () => {
  progressBar.startStopButton().click();
});

Then("a barra deve chegar até 100% e resetar", () => {
  cy.waitUntil(
    () =>
      progressBar
        .progressValue()
        .invoke("attr", "aria-valuenow")
        .then((value) => parseInt(value) === 100),
    {
      timeout: 15000, // até 15s
      interval: 500, // checa a cada 0.5s
      errorMsg: "A barra não chegou a 100% dentro do tempo esperado",
    }
  );

  // valida 100%
  progressBar.progressValue().should("have.attr", "aria-valuenow", "100");

  // botão Reset aparece
  progressBar.resetButton().should("be.visible").click();

  // depois do reset volta para 0
  progressBar.progressValue().should("have.attr", "aria-valuenow", "0");

  // botão Start aparece de novo
  progressBar.startStopButton().should("be.visible");
});
