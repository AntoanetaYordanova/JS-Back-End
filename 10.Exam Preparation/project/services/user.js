
const User = require('../models/User');
const { hash, compare} = require('bcrypt');

//TODO: add all required fields
async function register(username, password) {
    const existing = await(getUserByUsername(username));

    if(existing) {
        throw new Error('Username is taken');    
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        username, 
        hashedPassword
    });

    await user.save();

    return user;
}

//TODO: change identifier

async function login(username, password) {
    const user = await getUserByUsername(username);
    const passwordMatch = await compare(password, user.hashedPassword)

    if(!user || !passwordMatch) {
        throw new Error('Wrong username or password');
    }

    return user;
}

//TODO: find user by given identifier 
async function getUserByUsername(username) {
    return User.find({ username });
}

module.exports = {
    login,
    register
}