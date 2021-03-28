export default class LoginScreenPageObject {
  constructor(cy) {
    this.cy = cy;

    this.cy.visit('/app/login'); // va para a pag /app/login/
  }

  fillLoginForm({ user, password }) {
    this.cy.get('#registerForm input[name="user"]').type(user); // no elemento input, digite
    this.cy.get('#registerForm input[name="password"]').type(password); // no elemento input, digite
    return this;
  }

  submitLoginForm() {
    this.cy.get('#registerForm button[type="submit"]').click(); // no elemento botao, clique
    return this;
  }
}
