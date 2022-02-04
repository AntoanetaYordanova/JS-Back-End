const uniqueid = require('uniqid');
const bcrypt = require('bcrypt');

let users = [{
    username: 'tony',
    password: '$2b$09$AlP2V4enwlrmETQQHES66.jAtUzRjv8JSrI2e25CGdYj7nN7FC342',
    id: '289tt8ewkz8ghr3l'
  }];

function register(username, password) {
  if (users.some((x) => x.username == username)) {
    throw new Error('User already registered');
  }

  bcrypt.hash(password, 9).then((hash) => {
    const user = { username, password: hash, id: uniqueid() };

    users.push(user);

    return user;
  });
}

function login(username, password) {
  const user = users.find((x) => x.username == username);
  if (!user) {
    throw new Error('Wrong username or password');
  }

  if(bcrypt.compare(password, user.password)) {
    return user;
  } else {
    return undefined
  }

}

const authService = {
  register,
  login,
};

module.exports = authService;
