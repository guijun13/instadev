import { isStagingEnv } from '../../../infra/env/isStagingEnv';
import HttpClient from '../../../infra/http/HttpClient';
import { authService } from '../auth/authService';

const BASE_URL = isStagingEnv
  ? // Back-end de DEV
    'https://instalura-api-git-master-omariosouto.vercel.app'
  : // Back-end de PROD
    'https://instalura-api.omariosouto.vercel.app';

// eslint-disable-next-line import/prefer-default-export
export const userService = {
  async getProfilePage(context) {
    const url = `${BASE_URL}/api/users/posts`;
    try {
      const token = await authService(context).getToken();
      const response = await HttpClient(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return {
        user: {
          totalLikes: 100,
        },
        posts: response.data,
      };
    } catch (err) {
      throw new Error('Não conseguimos trazer os dados');
    }
  },
};
