const layout = require("../views/layout");
const database = require('../util/database');

const catalogPage = (items) =>
`<div>
    <h1>Catalog</h1>
    <form method="POST" action="/create">
        <label> Name<input type="text" name="name"></label>
        <label> Serial Number<input type="text" name="serialNum"></label>
        <input type="submit" value="Create Item">
    </form>
        <ul>
            ${items.map(i => `<li>${i.name} - ${i.serialNum}</li>`).join('')}
        </ul>
</div>`;


module.exports = (req, res) => {
    res.write(layout(catalogPage(database), 'Catalog'));
    res.end();
} 