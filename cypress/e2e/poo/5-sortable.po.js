class sortable {
  listItems() {
    return cy.get("#demo-tabpane-list .list-group-item");
  }

  gridItems() {
    return cy.get("#demo-tabpane-grid .list-group-item");
  }

  listTab() {
    return cy.get("#demo-tab-list");
  }

  gridTab() {
    return cy.get("#demo-tab-grid");
  }
}

export default new sortable();
