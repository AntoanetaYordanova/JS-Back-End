const { getAdById } = require("../services/ad");


function preload() {
    return async function (req, res, next) {
        try {
            const id = req.params.id;
            const data = await getAdById(id);
            res.locals.data = data;
            next();
        } catch (err) {
            res.render('404', { title : 'Not Found Page' });
        }
    }
}

module.exports = preload;