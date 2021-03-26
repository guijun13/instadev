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

// eslint-disable-next-line import/prefer-default-export
export const loginService = {
  async login({ username, password }) {
    return HttpClient(
      'https://instalura-api-git-master-omariosouto.vercel.app/api/login',
      {
        method: 'POST',
        body: {
          username,
          password,
        },
      }
    ).then((convertedResponse) => {
      console.log(convertedResponse);
      return convertedResponse;
    });
  },
};
