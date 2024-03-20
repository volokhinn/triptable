const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/transnextgen/v3/auth',
    createProxyMiddleware({
      target: 'https://transstage1.iwayex.com',
      changeOrigin: true,
      pathRewrite: {
        '^/transnextgen/v3/auth': '/transnextgen/v3/auth',
      },
    }),
  );

  app.use(
    '/transnextgen/v3/orders',
    createProxyMiddleware({
      target: 'https://transstage1.iwayex.com',
      changeOrigin: true,
      pathRewrite: {
        '^/transnextgen/v3/orders': '/transnextgen/v3/orders',
      },
    }),
  );
};
