
const User = require('../models/User');
const { hash, compare} = require('bcrypt');

async function register(email, password, gender) {
    console.log(gender);
    const existing = await(getUserByUsername(email));
    if(existing) {
        throw new Error('Username is taken');    
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        email, 
        hashedPassword,
        gender
    });
    await user.save();

    return user;
}


async function login(email, password) {
    const user = await getUserByUsername(email);

    if(!user) {
        throw new Error('Wrong username or password');
    }
    const passwordMatch = await compare(password, user.hashedPassword);

    if(!passwordMatch) {
        throw new Error('Wrong username or password');
    }

    return user;
}

async function getUserByUsername(username) {
    return await User.findOne({ username : new RegExp (`^${username}$`, 'i')});
}

module.exports = {
    login,
    register
}