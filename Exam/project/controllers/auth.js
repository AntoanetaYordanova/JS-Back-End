const router = require('express').Router();
const { isUser, isGuest } = require('../middlewares/guards');
const {register, login} = require('../services/user');
const mapErrors = require('../utils/mappers');

router.get('/register', isGuest(), (req, res) => {
   res.render('register', { title : 'Register Page'}); 
});


router.post('/register', isGuest() ,async (req, res) => {
    try {
        if(req.body.password.trim().length < 5) {
            throw new Error('Password must be at least 5 characters long');
        }
        if (req.body.password.trim() != req.body.repass.trim()) {
            throw new Error('Passwords don\'t match');
        }
        const user = await register(req.body.email.trim(), req.body.skills.trim(), req.body.password.trim());
        req.session.user = user;
        res.redirect('/')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('register',{ data : { email : req.body.email, skills : req.body.skills }, errors});
    }
})

router.get('/login', isGuest(),(req, res) => {
    res.render('login', { title : 'Login Page'});
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.email.trim(), req.body.password.trim());
        req.session.user = user;
        res.redirect('/'); 
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('login', { data : { title : 'Login Page', email : req.body.email }, errors});
    }
});

router.get('/logout', isUser(),(req, res) => {
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;