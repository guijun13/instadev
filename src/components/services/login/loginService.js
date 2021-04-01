import { destroyCookie, setCookie } from 'nookies';
import { isStagingEnv } from '../../../infra/env/isStagingEnv';

async function HttpClient(url, { headers, body, ...options }) {
  return fetch(url, {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...options,
  }).then((serverResponse) => {
    if (serverResponse.ok) {
      return serverResponse.json();
    }

    throw new Error('Falha em pegar dados do servidor :c');
  });
}

const BASE_URL = isStagingEnv
  ? // Back-end de DEV
    'https://instalura-api-git-master-omariosouto.vercel.app'
  : // Back-end de PROD
    'https://instalura-api.omariosouto.vercel.app';

// eslint-disable-next-line import/prefer-default-export
export const loginService = {
  async login(
    { username, password },
    setCookieModule = setCookie,
    HttpClientModule = HttpClient
  ) {
    return HttpClientModule(`${BASE_URL}/api/login`, {
      method: 'POST',
      body: {
        username,
        password,
      },
    }).then((convertedResponse) => {
      console.log(convertedResponse);
      const { token } = convertedResponse.data;
      const hasToken = token;
      if (!hasToken) {
        throw new Error('Failed to login');
      }
      const DAY_IN_SECONDS = 86400;
      // Salvar o token
      setCookieModule(null, 'APP_TOKEN', token, {
        path: '/', // definir que todas as pag terao acesso ao cookie
        maxAge: DAY_IN_SECONDS * 7, // tempo para cookie expirar
      });
      return { token };
    });
  },
  async logout(destroyCookieModule = destroyCookie) {
    destroyCookieModule(null, 'APP_TOKEN');
  },
};
