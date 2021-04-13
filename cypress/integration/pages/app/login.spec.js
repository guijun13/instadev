/// <reference types="cypress" />

import LoginScreenPageObject from '../../../../src/components/screens/app/LoginScreen/LoginScreen.PageObject';

describe('/pages/app/login/', () => {
  describe('when fill and submit a form login request', () => {
    it('go to the profile page', () => {
      /* Pré test */
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

      /* Asserções */
      cy.url().should('include', '/app/profile'); // verificar a url acessada
      // espera a interceptação da url
      cy.wait('@userLogin').then((intercept) => {
        const { token } = intercept.response.body.data; // token do servidor
        cy.getCookie('LOGIN_COOKIE_APP_TOKEN')
          .should('exist') // verifica se existe
          .should('have.property', 'value', token); // verifica se o token do cookie é igual ao do server
      });
    });
  });
});
