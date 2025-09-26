// APIS ----

Cypress.Commands.add("criarUsuario", () => {
  // Função para gerar username aleatório (evita colisão)
  const randomUsername = `user_${Date.now()}_${Math.floor(
    Math.random() * 1000
  )}`;

  // Função para gerar senha que respeita as regras
  const gerarSenha = () => {
    const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    // Restringe a um conjunto de caracteres especiais comumente aceitos na API
    const caracteresEspeciais = "@$!%*?&";

    const getRandom = (str) => str[Math.floor(Math.random() * str.length)];

    // Garantindo que cada requisito seja atendido
    let senha = "";
    senha += getRandom(letrasMaiusculas);
    senha += getRandom(letrasMinusculas);
    senha += getRandom(numeros);
    senha += getRandom(caracteresEspeciais);

    // Completa a senha para 8 caracteres ou mais
    const todosCaracteres =
      letrasMaiusculas + letrasMinusculas + numeros + caracteresEspeciais;
    while (senha.length < 8) {
      senha += getRandom(todosCaracteres);
    }

    // Embaralhar os caracteres para não ficar previsível
    senha = senha
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");
    return senha;
  };

  const password = gerarSenha();

  return cy
    .request({
      method: "POST",
      url: "Account/v1/User",
      body: {
        userName: randomUsername,
        password: password,
      },
      failOnStatusCode: false,
    })
    .then((response) => {
      return { response, username: randomUsername, password };
    });
});

Cypress.Commands.add("gerarToken", (userName, password) => {
  return cy.request({
    method: "POST",
    url: "Account/v1/GenerateToken",
    body: {
      userName: userName,
      password: password,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("authorized", (userName, password) => {
  return cy.request({
    method: "POST",
    url: "Account/v1/Authorized",
    body: {
      userName: userName,
      password: password,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("listarLivros", () => {
  return cy.request({
    method: "GET",
    url: "BookStore/v1/Books",
    failOnStatusCode: false,
  });
});

// Alugar livros
Cypress.Commands.add("alugarLivros", (userId, token, isbns) => {
  return cy.request({
    method: "POST",
    url: "BookStore/v1/Books",
    headers: {
      Authorization: `Bearer ${token}`, // precisa do token
    },
    body: {
      userId,
      collectionOfIsbns: isbns.map((isbn) => ({ isbn })),
    },
    failOnStatusCode: false,
  });
});

// Buscar usuário com livros alugados
Cypress.Commands.add("detalhesUsuario", (userId, token) => {
  return cy.request({
    method: "GET",
    url: `Account/v1/User/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`, // precisa do token
    },
    failOnStatusCode: false,
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
