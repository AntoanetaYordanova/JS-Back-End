const express = require('express');

const configExpress = require('./config/express');

start();

async function start() {
  const app = express();

  configExpress(app);

  app.get('/', (req, res) => {
    res.render('home', { layout: false });
  });

  app.listen(3000, () => console.log('Server running on port 3000'));
}
