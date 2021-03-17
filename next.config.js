const redirects = require('./config/redirects');

module.exports = {
  trailingSlash: true, // add uma '/' no final da url
  async redirects() {
    return redirects;
  },
};
