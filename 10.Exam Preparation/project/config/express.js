const express = require('express');
const { create: handlesbars } = require('express-handlebars');
const session = require('express-session');

module.exports = (app) => {
    app.engine('.hbs', handlesbars({
        extname : '.hbs'
    }).engine);

    app.set('view engine', '.hbs');

    app.use('/static', express.static('static'));
    app.use(session({
        secret : 'secret',
        resave : false,
        saveUninitialized : true,
        cookie : {secure : 'auto'}
    }));
    app.use(express.urlencoded({extended : true}));
}