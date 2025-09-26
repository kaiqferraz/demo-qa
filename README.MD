## Demo QA - Automação com Cypress + Cucumber

Automação de testes end-to-end da aplicação `https://demoqa.com` usando Cypress 15 e Cucumber (BDD) com o preprocessor `cypress-cucumber-preprocessor` v4. O projeto cobre cenários Web e API, com organização por features e step definitions, além de Page Objects simples em `cypress/e2e/poo`.

### Stack e principais libs

- **Cypress**: ^15.3.0
- **Cucumber Preprocessor**: ^4.3.1 (modo clássico, specs `.feature`)
- **@4tw/cypress-drag-drop**: suporte a drag-and-drop
- **cypress-wait-until**: aguardas condicionais

### Estrutura de pastas

```
cypress/
  e2e/
    api/
      step_definitions/
        bookStore/
          bookStore.cy.js          # Steps (API)
        bookStore.feature          # Feature (API)
    web/
      step_definitions/
        1-practiceForm/
          1-practiceForm.cy.js    # Steps (WEB)
        2-browserWindows/
          2-browserWindows.cy.js  # Steps (WEB)
        3-webTables/
          3-webTables.cy.js       # Steps (WEB)
        4-progressBar/
          4-progressBar.cy.js     # Steps (WEB)
        5-sortable/
          sortable.cy.js          # Steps (WEB)
      1-practiceForm.feature      # Feature (WEB)
      2-browserWindows.feature    # Feature (WEB)
      3-webTables.feature         # Feature (WEB)
      4-progressBar.feature       # Feature (WEB)
      5-sortable.feature          # Feature (WEB)
    poo/
      1-practiceForm.po.js        # Page Objects (PO)
      2-browserWindows.po.js
      3-webTables.po.js
      4-progressBar.po.js
      5-sortable.po.js
  fixtures/
    arquivoTeste.txt              # Fixture de upload
  support/
    commands.js                   # Comandos customizados (API/Web)
    e2e.js                        # Config. de suporte e listeners
cypress.config.js                 # Configuração do Cypress/Cucumber
package.json                      # Scripts e deps
```

### Configuração relevante

- `baseUrl`: `https://demoqa.com`
- `specPattern`: `cypress/e2e/**/*.feature` (roda arquivos `.feature`)
- Preprocessor: registrado via `on("file:preprocessor", cucumber())`
- `env.stepDefinitions`: `cypress/e2e` (passo-a-passo coexistindo junto às features)

```12:17:cypress.config.js
  e2e: {
    baseUrl: "https://demoqa.com",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
    },
    specPattern: "cypress/e2e/**/*.feature",
  },
  env: { stepDefinitions: "cypress/e2e" },
```

### Pré-requisitos

- Node.js 18+ (recomendado) e npm
- Git Bash (ou PowerShell) no Windows

### Instalação

```bash
git clone <seu-fork-ou-ssh> demo-qa
cd demo-qa
npm install
```

### Scripts npm

- `npm run cypress:open`: abre o Test Runner interativo
- `npm run cypress:headless`: executa em modo headless

### Como executar

1. Interativo (UI):

```bash
npm run cypress:open
```

Selecione a spec `.feature` desejada no runner.

2. Headless (todas as features):

```bash
npm run cypress:headless
```

3. Headless por feature específica:

```bash
# exemplo WEB
npx cypress run --spec "cypress/e2e/web/step_definitions/3-webTables/3-webTables.feature"

# exemplo API
npx cypress run --spec "cypress/e2e/api/step_definitions/bookStore/bookStore.feature"
```

4. Filtrando por TAGS (Cucumber):
   O preprocessor suporta filtro de tags via env `TAGS`.

```bash
npx cypress run --env TAGS='@smoke'
npx cypress open --env TAGS='@regression'
```

Observação: garanta que as `@tags` estejam declaradas nos cenários das suas `.feature`.

### Comandos customizados (support/commands.js)

APIs (baseadas em `cy.request`):

- `cy.criarUsuario()` → cria usuário aleatório. Retorna `{ response, username, password }`.
- `cy.gerarToken(username, password)` → gera token JWT.
- `cy.authorized(username, password)` → valida credenciais.
- `cy.listarLivros()` → lista livros (`GET BookStore/v1/Books`).
- `cy.alugarLivros(userID, token, livros)` → adiciona coleção de ISBNs para o usuário.
- `cy.detalhesUsuario(userID, token)` → detalhe do usuário autenticado.

Web:

- `cy.anexar(rotaArquivo)` → faz upload simulando seleção de arquivo via `fixtures`.

Exemplos rápidos:

```javascript
// Criar usuário e gerar token
cy.criarUsuario().then(({ username, password }) => {
  cy.gerarToken(username, password).then((tokenRes) => {
    const token = tokenRes.body.token;
    // usar token em chamadas subsequentes
  });
});

// Upload usando fixture
cy.visit("/upload-download");
cy.anexar("arquivoTeste.txt");
```

### Convenções BDD

- Features `.feature` descrevem a regra de negócio em Gherkin (Dado/Quando/Então).
- Steps `.cy.js` implementam os passos e podem reutilizar Page Objects em `cypress/e2e/poo`.
- Para novos cenários: crie a `.feature` e um arquivo de steps correspondente no mesmo domínio.

### Boas práticas

- Prefira `data-testid` ou seletores estáveis.
- Centralize interações complexas em Page Objects (`poo`).
- Use `cypress-wait-until` para condições assíncronas específicas.

### Troubleshooting (Windows)

- Caso tenha bloqueio de execução em PowerShell, rode o terminal pelo Git Bash (recomendado) ou ajuste a política: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- Se houver erro de segurança do Chrome, já está configurado `chromeWebSecurity: false`.
- Problemas com upload: confirme o caminho/arquivo em `cypress/fixtures` e o seletor do `input[type="file"]`.

### Licença

ISC — conforme `package.json`.
