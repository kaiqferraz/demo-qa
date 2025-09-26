class practiceForm {
  firstName() {
    return cy.get('input[id*="firstName"]');
  }

  lastName() {
    return cy.get('input[id*="lastName"]');
  }

  userEmail() {
    return cy.get('input[id*="userEmail"]');
  }

  gender() {
    return cy.get('label[for*="gender-radio-1"]');
  }

  userNumber() {
    return cy.get('input[id*="userNumber"]');
  }

  dateOfBirthInput() {
    return cy.get("#dateOfBirthInput");
  }

  selectDateFromDatepicker(day, month, year) {
    cy.get(".react-datepicker__month-select").select(month);
    cy.get(".react-datepicker__year-select").select(year);
    cy.get(`.react-datepicker__day--0${day}`).click();
  }

  input_Assuntos() {
    return cy.get('input[id*="subjectsInput"]');
  }

  selecionaInput_Assuntos() {
    return cy.contains(".subjects-auto-complete__option", "Arts");
  }

  hobbies() {
    return cy.get('label[for*="hobbies-checkbox-1"]');
  }

  input_Endereco() {
    return cy.get('textarea[id*="currentAddress"]');
  }

  selecionaArquivo() {
    return cy.anexar("arquivoTeste.txt");
  }

  input_Estado() {
    return cy.get("#state");
  }

  opcao_Estado(estado) {
    return cy.contains(".css-1n7v3ny-option", estado);
  }

  input_City() {
    return cy.get("#city");
  }

  opcao_City(cidade) {
    return cy.contains(".css-1n7v3ny-option", cidade);
  }

  BTN_Submit() {
    return cy.get('button[id*="submit"]');
  }

  validaCadastro() {
    return cy.get('div[id*="example-modal-sizes-title-lg"]');
  }
}
export default new practiceForm();
