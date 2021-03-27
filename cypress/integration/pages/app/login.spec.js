/// <reference types="cypress" />

describe('/pages/app/login', () => {
  // it = teste que estamos fazendo
  it('fill the login fields and go to /app/profile page', () => {
    cy.intercept(
      'https://instalura-api-git-master-omariosouto.vercel.app/api/login'
    ).as('userLogin'); // interceptar a url
    cy.visit('/app/login/'); // va para a pag /app/login/
    cy.get('#registerForm input[name="user"]').type('guijun13'); // no elemento input, digite
    cy.get('#registerForm input[name="password"]').type('senhasegura'); // no elemento input, digite
    cy.get('#registerForm button[type="submit"]').click(); // no elemento botao, clique
    cy.url().should('include', '/app/profile'); // verificar a url acessada
    // espera a interceptação da url
    cy.wait('@userLogin').then((intercept) => {
      const { token } = intercept.response.body.data; // token do servidor
      cy.getCookie('APP_TOKEN')
        .should('exist') // verifica se existe
        .should('have.property', 'value', token); // verifica se o token do cookie é igual ao do server
    });
  });
});
