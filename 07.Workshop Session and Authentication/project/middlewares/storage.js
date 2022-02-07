const productService = require('../services/product');
const accessoryService = require('../services/accessory');

/* Model structure

{
    "name": "string",
    "description": "string",
    "imageUrl": "string",
    "difficulty": "number"
}
*/

async function init() {
    return (req, res, next) => {
        const storage = Object.assign({}, productService, accessoryService);
        req.storage = storage;
        next();
    };
}

module.exports = init;



