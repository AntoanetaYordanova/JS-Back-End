const express = require('express');
const fs = require('fs/promises');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqid = require('uniqid');
const {engine} = require('express-handlebars');
const secret = 'mysecret';

const app = express();

app.set('view engine', 'hbs');

app.use('/public', express.static('public'));

app.use(cookieParser());

app.use(session({
    resave : false,
    saveUninitialized : true,
    secret : 'hdashdiaihdahas',

}));

app.engine('hbs', engine({
    extname : 'hbs'
}));


app.get('/cookie', async (req, res) => {
    res.cookie('parser-name', 'parser-value');

    console.log(req.cookies);

    let htmlResult = await fs.readFile('./view/home.html', {encoding : 'utf-8'});

    res.send(htmlResult);
});


app.get('/set-session/:name', (req, res) => {
    req.session.user = req.params.name;
    res.send('Set session');
});

app.get('/get-session', (req, res) => {
    console.log(req.session);
    res.send('Get session');

});

app.get('/bcrypt', (req, res) => {
    let password = 'cometomamma';
    let saltRounds = 9;

    //const hashedPass = await bcrypt.hash(password, 9);

    bcrypt.genSalt(saltRounds)
    .then(salt => {
        return bcrypt.hash(password, salt);
    })
    .then(hash => {
        console.log(hash);
        res.send(hash);
    })
});

app.get('/bcrypt/verify/:pass', (req, res) => {
    const hash = '$2b$09$rysvCV7UFwkwEMy0MpGZZukLI6ES3daUsCuJLb.r73ndwfzwVeb.q';

    bcrypt.compare(req.params.pass, hash)
    .then(result => {
        res.send(result);
    })
});

app.get('/token/create/:password', (req, res) => {
    let payload = {
        id : uniqid(),
        password : req.params.password
    }
    let options = {expiresId : '1d'};    

    const token = jwt.sign(payload, secret, options);

    res.cookie('jwt', token);
    res.send(token);
});

app.get('/token/verify', (req, res) => {
    const token = req.cookies['jwt'];

    jwt.verify(token, secret, (err, decoded) => {
        if(err) {
           return res.status(400) .send(err);
        }

        res.json(decoded);
    });

});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    
});

app.listen(5000, console.log.bind(console, 'Server is listening on port 5000...'));