const express = require('express');
const fs = require('fs/promises');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();

app.use(cookieParser());
app.use(session({
    resave : false,
    saveUninitialized : true,
    secret : 'hdashdiaihdahas',

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

app.listen(5000, console.log.bind(console, 'Server is listening on port 5000...'));