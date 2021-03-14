import React from 'react';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function Login() {
  return <div>Login</div>;
}

export default websitePageHOC(Login, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Login',
    },
    menuProps: {
      display: false,
    },
  },
});
