const { post: commentPost } = require('../controllers/comments');

const productController = require('../controllers/productController');
const accessoryController = require('../controllers/accessoryController');
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const { isAuth } = require('../middlewares/guards');


module.exports = (app) => {
    app.use('/products', productController);
    app.use('/accessory', accessoryController);
    app.use('/auth', authController);

    app.post('/comments/:cubeId/create', isAuth(), commentPost);

    app.use('/', homeController);

    app.use((err, req, res, next) => {
        console.log('---', err.message);

        res.status(500).send('Something happened');
    });
};