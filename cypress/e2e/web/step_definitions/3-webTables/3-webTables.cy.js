import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import webTables from "../../../poo/3-webTables.po.js";

// CRUD PADRÃO

Given("que o usuário visita a pagina web tables", () => {
  cy.visit("https://demoqa.com/webtables");
});

When("o usuário cria um novo registro", () => {
  webTables.btnAdd().click();
  webTables.firstName().type("Kaique");
  webTables.lastName().type("Ferraz");
  webTables.userEmail().type("kaique@example.com");
  webTables.age().type("28");
  webTables.salary().type("5000");
  webTables.department().type("QA");
  webTables.btnSubmit().click();
});

And("edita o registro criado", () => {
  webTables.searchBox().type("kaique@example.com");
  webTables.editRecord().click();
  webTables.department().clear().type("Automation");
  webTables.btnSubmit().click();
});

And("deleta o registro criado", () => {
  webTables.searchBox().clear().type("kaique@example.com");
  webTables.deleteRecord().click();
});

Then("o registro não deve estar mais listado", () => {
  webTables.validarRegistro("kaique@example.com").should("not.exist");
});

// Cria 12 novos registros de forma dinâmica e deleta

When("o usuário cria 12 novos registros", () => {
  for (let i = 1; i <= 12; i++) {
    webTables.btnAdd().click();
    webTables.firstName().type(`User${i}`);
    webTables.lastName().type(`Test${i}`);
    webTables.userEmail().type(`user${i}@example.com`);
    webTables.age().type(`${20 + i}`);
    webTables.salary().type(`${3000 + i * 100}`);
    webTables.department().type(`Dept${i}`);
    webTables.btnSubmit().click();
  }
});

Then("os 12 registros devem estar listados", () => {
  let totalUsers = 0;

  const countUsersInPage = () => {
    cy.get(".rt-tbody .rt-tr-group")
      .each(($row) => {
        // verifica se a linha contém "User" em qualquer célula
        const text = $row.text().trim();
        if (text.includes("User")) {
          totalUsers += 1;
        }
      })
      .then(() => {
        // verifica se há próxima página
        cy.get(".-next .-btn").then(($next) => {
          if (!$next.is(":disabled")) {
            cy.wrap($next).click();
            countUsersInPage();
          }
        });
      });
  };

  countUsersInPage();

  // depois que contar todas as páginas, validar o total
  cy.then(() => {
    expect(totalUsers).to.eq(12);
  });

  // voltar para a primeira página
  cy.get(".-previous .-btn").then(($prev) => {
    if (!$prev.is(":disabled")) {
      cy.wrap($prev).click();
    }
  });
});

And("todos os usuários são deletados", () => {
  // Função recursiva para deletar todos os registros que contenham 'User', percorrendo páginas
  const deleteUsers = () => {
    cy.get(".rt-tbody .rt-tr-group").then(($rows) => {
      const userRow = $rows.filter((index, row) => {
        return Cypress.$(row).text().includes("User");
      });

      if (userRow.length > 0) {
        // Deleta o primeiro usuário encontrado
        cy.wrap(userRow[0]).within(() => {
          cy.get("[id^=delete-record-]").click();
        });

        // Aguarda o DOM atualizar e chama novamente a função
        deleteUsers();
      } else {
        // Se não encontrou mais usuários na página atual, tenta próxima página
        cy.get(".-next .-btn").then(($next) => {
          if (!$next.is(":disabled")) {
            cy.wrap($next).click();
            deleteUsers();
          }
        });
      }
    });
  };

  deleteUsers();

  // Validação final: não deve conter mais nenhum registro criado
  cy.get(".rt-tbody .rt-tr-group").each(($row) => {
    cy.wrap($row).should("not.contain", "User");
  });

  // Voltar para a primeira página
  cy.get(".-previous .-btn").then(($prev) => {
    if (!$prev.is(":disabled")) {
      cy.wrap($prev).click();
    }
  });
});
