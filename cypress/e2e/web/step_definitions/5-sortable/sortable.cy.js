import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import sortable from "../../../poo/5-sortable.po.js";

Given("que o usuário acessa a página de Sortable", () => {
  cy.visit("https://demoqa.com/sortable");
  sortable.listTab().click(); // garante que está no modo "List"
});

When("o usuário desordena a lista movendo o Six para o topo", () => {
  const dataTransfer = new DataTransfer();

  // arrasta "Six"
  sortable.listItems().contains("Six").trigger("dragstart", { dataTransfer });

  // passa por cima do "One" (dragover é obrigatório no DemoQA)
  sortable.listItems().eq(0).trigger("dragover", { dataTransfer });

  // solta no topo
  sortable.listItems().eq(0).trigger("drop", { dataTransfer });

  // finaliza arrasto
  sortable.listItems().contains("Six").trigger("dragend");
});

When("o usuário reorganiza a lista em ordem crescente", () => {
  const ordemCorreta = ["One", "Two", "Three", "Four", "Five", "Six"];

  ordemCorreta.forEach((texto, index) => {
    const dataTransfer = new DataTransfer();

    sortable.listItems().contains(texto).trigger("dragstart", { dataTransfer });
    sortable.listItems().eq(index).trigger("dragover", { dataTransfer });
    sortable.listItems().eq(index).trigger("drop", { dataTransfer });
    sortable.listItems().contains(texto).trigger("dragend");
  });
});

Then("a lista deve estar na ordem correta", () => {
  const ordemEsperada = ["One", "Two", "Three", "Four", "Five", "Six"];

  sortable.listItems().should(($items) => {
    const textos = [...$items].map((el) => el.innerText.trim());
    expect(textos).to.deep.equal(ordemEsperada);
  });
});
