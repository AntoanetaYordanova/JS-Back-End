const { init: storage } = require('./services/storage');
const express = require('express');

const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');
const databaseConfig = require('./config/database');

start();

async function start() {
    const port = 5000;
    const app = express();

    app.use(await storage());
    
    expressConfig(app);
    await databaseConfig(app);
    routesConfig(app);
    
    
    app.listen(port, () => console.log(`Server listening on port ${port}`));
}