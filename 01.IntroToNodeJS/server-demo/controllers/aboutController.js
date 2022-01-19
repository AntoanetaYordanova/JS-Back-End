const layout = require("../views/layout");

const aboutPage = `<h1>About</h1>
    <p>About our page</p>`;

module.exports = (req, res) => {
    res.write(layout(aboutPage, 'About'));
    res.end();
}