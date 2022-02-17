
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

    console.log(user);

    await user.save();

    return user;
}

//TODO: change identifier

async function login(username, password) {
    // console.log(username);
    const user = await getUserByUsername(username);

    if(!user) {
        throw new Error('Wrong username or password');
    }
    const passwordMatch = await compare(password, user.hashedPassword);

    if(!passwordMatch) {
        throw new Error('Wrong username or password');
    }

    return user;
}

//TODO: find user by given identifier 
async function getUserByUsername(username) {
    return await User.findOne({ username });
}

module.exports = {
    login,
    register
}