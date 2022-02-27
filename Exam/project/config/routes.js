const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const adController = require('../controllers/ad');

module.exports = (app) => {
    app.use(homeController);
    app.use(authController);
    app.use('/ad', adController);
    app.all('*', (req, res) => {
       res.render('404', { title : 'Not Found Page' }); 
    });
}