const express = require('express');
const handlebars = require('express-handlebars');

const { catalog } = require('./controllers/catalog');
const { about } = require('./controllers/about');
const { details } = require('./controllers/details');
const { create, post } = require('./controllers/create');
const { notFound } = require('./controllers/notFound');

const { init: storage } = require('./models/storage');

const app = express();

start();

async function start() {
  app.use('/static', express.static('static'));
  app.use(express.urlencoded({extended : false}));
  app.use(await storage());

  app.engine(
    '.hbs',
    handlebars({
      extname: '.hbs',
    })
  );
  app.set('view engine', '.hbs');

  const port = 5000;

  app.get('/', catalog);
  app.get('/about', about);
  app.get('/details/:id', details);
  app.get('/create', create);
  app.post('/create', post);

  app.all('*', notFound);

  app.listen(port, () => console.log('Server listens on port ' + port));
}
