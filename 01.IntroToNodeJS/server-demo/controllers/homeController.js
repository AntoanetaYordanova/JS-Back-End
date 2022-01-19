const layout = require("../views/layout");

const homePage = `
    <h1>My Page</h1>
    <p>Welcome to my page!</p>`;

module.exports = (req, res) => {
  res.write(layout(homePage, 'Home Page - Welcome'));
  res.end();
};
