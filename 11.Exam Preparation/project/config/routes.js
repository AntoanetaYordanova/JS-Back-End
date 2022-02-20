const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const tripController = require('../controllers/trip');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/trips', tripController);
    app.all('*', (req, res) => {
       res.render('404'); 
    });
}