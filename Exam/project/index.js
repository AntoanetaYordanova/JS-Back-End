const express = require('express');

const configExpress = require('./config/express');
const configRoutes = require('./config/routes');
const configDatabase = require('./config/database');

start();

async function start() {
  const app = express();

  configExpress(app);
  await configDatabase();
  configRoutes(app);

  app.listen(3000, () => console.log('Server running on port 3000'));
}
