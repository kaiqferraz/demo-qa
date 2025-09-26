class webTables {
  // Botões principais
  btnAdd() {
    return cy.get("#addNewRecordButton");
  }

  btnSubmit() {
    return cy.get("#submit");
  }

  // Campos do formulário
  firstName() {
    return cy.get("#firstName");
  }

  lastName() {
    return cy.get("#lastName");
  }

  userEmail() {
    return cy.get("#userEmail");
  }

  age() {
    return cy.get("#age");
  }

  salary() {
    return cy.get("#salary");
  }

  department() {
    return cy.get("#department");
  }

  // Ações da tabela
  editRecord(id = 4) {
    return cy.get(`#edit-record-${id}`);
  }

  deleteRecord(id = 4) {
    return cy.get(`#delete-record-${id}`);
  }

  // Buscar pelo nome ou email
  searchBox() {
    return cy.get("#searchBox");
  }

  // Validação se o registro existe
  validarRegistro(email) {
    return cy.get(".rt-tbody").contains("div", email);
  }
}

export default new webTables();
