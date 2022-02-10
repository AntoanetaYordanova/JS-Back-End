const router = require('express').Router();

const asyncWrapper = require('../util/asyncWrapper');


router.get('/', (req, res) => res.redirect('/products'));

router.get('/about', asyncWrapper(async (req, res) => {
    throw new Error('Simulated error');
    res.render('about', { title: 'About Page' });
}));

router.all('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
});

module.exports = router;