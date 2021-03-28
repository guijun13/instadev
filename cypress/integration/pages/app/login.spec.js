/// <reference types="cypress" />

import LoginScreenPageObject from '../../../../src/components/screens/app/LoginScreen/LoginScreen.PageObject';

describe('/pages/app/login', () => {
  // it = teste que estamos fazendo
  it('fill the login fields and go to /app/profile page', () => {
    cy.intercept(
      'https://instalura-api-git-master-omariosouto.vercel.app/api/login'
    ).as('userLogin'); // interceptar a url

    /* Montagem do cenário de teste */
    const loginScreen = new LoginScreenPageObject(cy);
    loginScreen
      .fillLoginForm({
        user: 'guijun13',
        password: 'senhasegura',
      })
      .submitLoginForm();
    /* ---------------------------- */

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
