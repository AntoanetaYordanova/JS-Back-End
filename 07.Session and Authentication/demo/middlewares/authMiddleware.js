const jwt = require('jsonwebtoken');
const {secret} = require('../constants');

function auth(req, res, next) {
    let token = req.cookies['jwt'];
    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                throw err;
            } 
            req.user = decodedToken;
        });
    }

    next();
}

exports.auth = auth;

