const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const auth = require('../middlewares/auth');


module.exports = (app) => {
    app.engine('hbs', hbs({
        extname: '.hbs'
    }));
    app.set('view engine', 'hbs');
    app.use('/static', express.static('static'));
    app.use('/js', express.static('js'));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(auth());
};