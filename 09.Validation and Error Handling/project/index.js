const express = require('express');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');

const logger = require('./middlewares/logger');
const storage = require('./middlewares/storage');

start();

async function start() {
    const port = 3000;
    const app = express();

    app.use(logger());

    await databaseConfig(app);
    expressConfig(app);
    
    app.use(await storage());
    routesConfig(app);

    app.listen(port, () => console.log(`Server listening on port ${port}`));
}