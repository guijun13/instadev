module.exports = [
  {
    // redireciona a url 'source' para 'destination' automaticamente
    source: '/home/',
    destination: '/',
    permanent: true,
  },
  {
    source: '/about/',
    destination: '/sobre',
    permanent: true,
  },
  {
    source: '/login/',
    destination: '/app/login',
    permanent: true,
  },
];
