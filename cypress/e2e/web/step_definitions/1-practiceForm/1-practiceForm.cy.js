import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import practiceForm from "../../../poo/1-practiceForm.po.js";

Given("que o usuário visita a página do formulário", () => {
  cy.visit("https://demoqa.com/automation-practice-form");
});

When("o usuário preenche todos os campos", () => {
  practiceForm.firstName().type("Kaique");
  practiceForm.lastName().type("Ferraz");
  practiceForm.userEmail().type("teste@teste.com");
  practiceForm.gender().contains("Male").click();
  practiceForm.userNumber().type("1105843213");
  practiceForm.dateOfBirthInput().click();
  practiceForm.selectDateFromDatepicker("12", "October", "1997");
  practiceForm.input_Assuntos().type("Arts");
  practiceForm.selecionaInput_Assuntos().click();
  practiceForm.hobbies().contains("Sports").click();
  practiceForm.selecionaArquivo();
  practiceForm.input_Endereco().type("Rua teste 100");
  practiceForm.input_Estado().click();
  practiceForm.opcao_Estado("NCR").click();
  practiceForm.input_City().click();
  practiceForm.opcao_City("Delhi").click();
  practiceForm.BTN_Submit().click();
});

Then("o sistema valida que o formulário foi preechido com sucesso", () => {
  practiceForm
    .validaCadastro()
    .contains("Thanks for submitting the form")
    .should("be.visible");
});
