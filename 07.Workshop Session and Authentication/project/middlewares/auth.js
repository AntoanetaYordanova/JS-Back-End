const userService = require('../services/user');
const bcrypt = require('bcrypt');

module.exports = () => (req, res, next) => {
    req.auth = {
        register : userService.createUser,
        login
    }

    next();
}


async function login(username, password) {
    const user = await userService.getUserByUsername(username);

    if(!user) {
        throw new Error('Wrong username ot password!');
    } else {
        console.log(user);
    }

    if(password == bcrypt.compare(password, user.hashedPassword)) {

    }
}