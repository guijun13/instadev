/// <reference types="cypress" />

describe('/pages/app/login', () => {
  // it = teste que estamos fazendo
  it('fill the login fields and go to /app/profile page', () => {
    cy.visit('/app/login/'); // va para a pag /app/login/
    cy.get('#formCadastro input[name="usuario"]').type('guijun13'); // no elemento input, digite
    cy.get('#formCadastro input[name="senha"]').type('senhasegura'); // no elemento input, digite
    cy.get('#formCadastro button[type="submit"]').click(); // no elemento botao, clique
    cy.url().should('include', '/app/profile'); // verificar a url acessada
  });
});
