import { Main } from "../../cypress/pages/Main";

class Login extends Main {
  username = "#userName";
  password = "#password";
  login = "#login";
  invalidLoginMessage = "#name";

  get usernameElement() {
    cy.get(this.username);
  }

  get passwordElement() {
    cy.get(this.password);
  }

  get loginElement() {
    cy.get(this.login);
  }

  get invalidLoginMessageElement() {
    cy.get(this.invalidLoginMessage);
  }

  visit() {
    cy.visit(`${Cypress.env("demo")}/login`);
  }

  submitLogin(username, password) {
    cy.get(this.username).type(username);

    cy.get(this.password).type(password);

    cy.get(this.login).click();
  }
}

export const LoginPage = new Login();
