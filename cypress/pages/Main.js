class Main {
  header = `div[class='main-header']`;

  get headerElement() {
    cy.get(this.header);
  }
}

export { Main };
