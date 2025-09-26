class progressBar {
  progressValue() {
    return cy.get("#progressBar > .progress-bar");
  }

  startStopButton() {
    return cy.get("#startStopButton");
  }

  resetButton() {
    return cy.get("#resetButton");
  }
}

export default new progressBar();
