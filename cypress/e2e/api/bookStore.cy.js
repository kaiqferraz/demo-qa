/// <reference types="cypress" />

describe("Book Store API V1", () => {
  let userData;
  let username;
  let password;
  let token;

  it("DQ-1 - Deve cadastrar um usuário aleatório com sucesso", () => {
    cy.criarUsuario().then(({ response, username: u, password: p }) => {
      expect(response.status).to.eq(201);
      userData = response.body; // salva o userId
      username = u;
      password = p;
      cy.log("UserID:", userData.userID);
    });
  });

  it("DQ-1 - Deve gerar um token com sucesso", () => {
    cy.gerarToken(username, password).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.token;
      cy.log("Token:", token);
    });
  });

  it("DQ-1 - Confirmar se o usuário criado está autorizado", () => {
    cy.authorized(username, password).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq(true);
    });
  });

  it("DQ-1 - Deve listar os livros disponíveis", () => {
    cy.listarLivros().then((response) => {
      expect(response.status).to.eq(200);
      cy.log(JSON.stringify(response.body, null, 2));
    });
  });

  it("DQ-1 - Deve alugar dois livros de livre escolha", () => {
    const livrosEscolhidos = ["9781449331818", "9781449325862"];

    cy.alugarLivros(userData.userID, token, livrosEscolhidos).then(
      (response) => {
        expect(response.status).to.eq(201);
        expect(response.body.books).to.have.length(2);
        cy.log("Livros alugados:", JSON.stringify(response.body, null, 2));
      }
    );
  });

  it("DQ-1 - Deve listar os detalhes do usuário com os livros alugados", () => {
    cy.detalhesUsuario(userData.userID, token).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.books).to.have.length(2);
      cy.log("Usuário com livros:", JSON.stringify(response.body, null, 2));
    });
  });
});
