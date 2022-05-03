const Hapi = require('@hapi/hapi');
require('dotenv').config();
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  server.route(routes);

  await server.start();
  // eslint-disable-next-line no-console
  console.log(`Server running on ${server.info.uri}`);
};

init();
