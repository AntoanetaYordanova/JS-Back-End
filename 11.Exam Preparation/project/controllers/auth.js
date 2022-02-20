const router = require('express').Router();
const { isUser, isGuest } = require('../middlewares/guards');
const {register, login} = require('../services/user');
const mapErrors = require('../utils/mappers');

router.get('/register', isGuest(), (req, res) => {
    const data = {
        checked : {
            default : true
        }
    }
   res.render('register', { title : 'Register PAge', data}); 
});


router.post('/register', isGuest() ,async (req, res) => {
    try {
        if(req.body.password.length < 4) {
            throw new Error('Password must be st least 4 characters long');
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
        }
        const user = await register(req.body.email, req.body.password, req.body.gender);
        req.session.user = user;
        res.redirect('/')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        const data = { 
            email : req.body.email,
            checked : {
                isMale : req.body.gender == 'male',
                isFemale : req.body.gender == 'female'
        }
    }

        res.render('register',{title : 'Register Page', data, errors});
    }
})

router.get('/login', isGuest(),(req, res) => {
    res.render('login', { title: 'Login Page'});
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/'); 
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('login', { title: 'Login Page', data : { email : req.body.email }, errors });
    }
});

router.get('/logout', isUser(),(req, res) => {
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;