class browserWindows {
  btnNewWindow() {
    return cy.get('button[id*="windowButton"]');
  }

  validarMensagem() {
    return cy.get('h1[id*="sampleHeading"]');
  }
}

export default new browserWindows();
