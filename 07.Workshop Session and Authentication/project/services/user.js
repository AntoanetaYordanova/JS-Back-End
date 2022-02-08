const User = require('../models/User');
const bcriypt = require('bcrypt');

async function createUser({username, password, repeatPassword}) {
    if(username == '' || password == '' || repeatPassword == '') {
        throw new Error('All fields are required!');
    } else if (password != repeatPassword) {
        throw new Error('Passwords don\'t match!');
    }

    const user = new User({
        username,
        hashedPassowrd : await bcriypt.hash(password, 10)
    });

    user.save();
}

module.exports = {
    createUser
}