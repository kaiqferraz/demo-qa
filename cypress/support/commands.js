// APIS ----

Cypress.Commands.add("criarUsuario", () => {
  const username = `user${Math.floor(Math.random() * 10000)}`;
  const password = "Teste@123";
  return cy
    .request({
      method: "POST",
      url: "Account/v1/User",
      body: { userName: username, password },
      failOnStatusCode: false,
    })
    .then((response) => ({ response, username, password }));
});

Cypress.Commands.add("gerarToken", (username, password) => {
  return cy.request({
    method: "POST",
    url: "Account/v1/GenerateToken",
    body: { userName: username, password },
  });
});

Cypress.Commands.add("authorized", (username, password) => {
  return cy.request({
    method: "POST",
    url: "Account/v1/Authorized",
    body: { userName: username, password },
  });
});

Cypress.Commands.add("listarLivros", () => {
  return cy.request("GET", "BookStore/v1/Books");
});

Cypress.Commands.add("alugarLivros", (userID, token, livros) => {
  return cy.request({
    method: "POST",
    url: `BookStore/v1/Books`,
    headers: { Authorization: `Bearer ${token}` },
    body: {
      userId: userID,
      collectionOfIsbns: livros.map((isbn) => ({ isbn })),
    },
  });
});

Cypress.Commands.add("detalhesUsuario", (userID, token) => {
  return cy.request({
    method: "GET",
    url: `Account/v1/User/${userID}`,
    headers: { Authorization: `Bearer ${token}` },
  });
});

// WEB ----
Cypress.Commands.add("anexar", (rotaArquivo) => {
  cy.fixture(rotaArquivo).then((exampleFile) => {
    const nomeArquivo = rotaArquivo.split("/").pop();
    const testFile = new File([exampleFile], nomeArquivo, {
      type: "text/plain",
    });
    cy.get('input[type="file"]').then((input) => {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(testFile);
      input[0].files = dataTransfer.files;
      cy.wrap(input).trigger("change", { force: true });
      cy.wrap(input).then((input) => {
        expect(input[0].files[0].name).to.equal(nomeArquivo);
      });
    });
  });
});
