module.exports = {
    details: async (req, res) => {
        const cube = await req.storage.getById(req.params.id);

        if (cube == undefined) {
            res.redirect('/404');
        } else {
            console.log(cube);
            const ctx = {
                title: 'Cubicle',
                cube
            };
            res.render('details', ctx);
        }
    }
};