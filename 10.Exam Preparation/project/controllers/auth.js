const router = require('express').Router();
const {register, login} = require('../services/user');

router.get('/register', (req, res) => {
   res.render('register'); 
});


//TODO: Check form action, method, field names
router.post('/register', async (req, res) => {
    try {
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
        }
        const user = await register(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/') //TODO: Check redirect requirements
    } catch (err) {
        console.log(err);
        //TODO: To change data according to requirements
        res.render('register',{ data : { username : req.body.username }});
    }
})

router.get('/login', (req, res) => {
    res.render('login');
});

//TODO: Check form action, method, field names
router.post('/login', async (req, res) => {
    try {
        const user = await login(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/'); //TODO: Check redirect requirements
    } catch (err) {
        console.log(err);
        //TODO: To change data according to requirements
        res.render('login', { data : { username : req.body.username }});
    }
});

module.exports = router;