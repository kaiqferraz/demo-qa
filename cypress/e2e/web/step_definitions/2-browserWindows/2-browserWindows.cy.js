import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import browserWindows from "../../../poo/2-browserWindows.po";

Given("que o usuário visita a página de Browser Windows", () => {
  cy.visit("https://demoqa.com/browser-windows");
});

When("o usuário clica no botão New Window", () => {
  browserWindows.btnNewWindow().then(() => {
    cy.visit("https://demoqa.com/sample");
  });
});

Then(
  "o sistema abre uma nova janela do browser e a mensagem This is a sample page deve ser exibida",
  () => {
    browserWindows
      .validarMensagem()
      .should("have.text", "This is a sample page");
  }
);
