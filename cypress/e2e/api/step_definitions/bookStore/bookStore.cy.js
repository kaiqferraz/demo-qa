import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

let userData;
let username;
let password;
let token;

Given("que eu criei um usuário aleatório", () => {
  cy.criarUsuario().then(({ response, username: u, password: p }) => {
    expect(response.status).to.eq(201);
    userData = response.body;
    username = u;
    password = p;
    cy.log("UserID:", userData.userID);
  });
});

When("eu gero um token para o usuário", () => {
  cy.gerarToken(username, password).then((response) => {
    expect(response.status).to.eq(200);
    token = response.body.token;
    cy.log("Token:", token);
  });
});

Then("o usuário deve estar autorizado", () => {
  cy.authorized(username, password).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.eq(true);
  });
});

Then("eu listo os livros disponíveis", () => {
  cy.listarLivros().then((response) => {
    expect(response.status).to.eq(200);
    cy.log(JSON.stringify(response.body, null, 2));
  });
});

Then("eu alugo dois livros", () => {
  const livrosEscolhidos = ["9781449331818", "9781449325862"];
  cy.alugarLivros(userData.userID, token, livrosEscolhidos).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body.books).to.have.length(2);
    cy.log("Livros alugados:", JSON.stringify(response.body, null, 2));
  });
});

Then("eu verifico os livros alugados do usuário", () => {
  cy.detalhesUsuario(userData.userID, token).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.books).to.have.length(2);
    cy.log("Usuário com livros:", JSON.stringify(response.body, null, 2));
  });
});
