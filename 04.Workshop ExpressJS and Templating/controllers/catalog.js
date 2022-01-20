module.exports = {
    catalog :  async(req, res) => {
        console.log(req.query);
        const cubes = await req.storage.getAll(req.query);
        const ctx = {
            title : 'Catalog',
            cubes
        }
        res.render('catalog', ctx);
    }
}