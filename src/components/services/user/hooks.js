import { useEffect, useState } from 'react';
import { userService } from './userService';

// criacao da propria hook de gerenciamento de dados
// tipo swr
// eslint-disable-next-line import/prefer-default-export
export const useUserService = {
  getProfilePage() {
    const [response, setResponse] = useState({
      data: null,
      loading: true,
      error: null,
    });

    useEffect(() => {
      userService
        .getProfilePage()
        .then((responseFromServer) => {
          setResponse((currentState) => ({
            ...currentState,
            data: responseFromServer,
            loading: false,
            error: null,
          }));
        })
        .catch((err) => {
          setResponse((currentState) => ({
            ...currentState,
            data: null,
            loading: false,
            error: err.message,
          }));
        });
    }, []);

    return response;
  },
};
