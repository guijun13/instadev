import { createContext } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const WebsitePageContext = createContext({
  toggleRegisterModal: () => {},
  getCMSContent: (cmsKey) => cmsKey,
});
