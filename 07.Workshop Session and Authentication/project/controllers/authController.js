const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('register', {title : 'Register'});
});

router.post('/register', (req, res) => {
    console.log(req.body);

    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('login', { title : 'Login'});
});

router.post('/login', (req, res) => {
    
});

module.exports = router;