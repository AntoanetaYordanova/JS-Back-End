module.exports = {
    async edit(req, res) {
        const cube = await req.storage.getById(req.params.id);
        cube[`select${cube.difficulty}`] = true;

        if (!cube) {
            res.redirect('404');
        } else {
            const ctx = {
                title: 'Edit Cube',
                cube
            };
            res.render('edit', ctx);
        }

    },
    async post(req, res) {
        const cube = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficulty: Number(req.body.difficulty)
        };
        try {
            try {
                await req.storage.edit(req.params.id, cube);
            } catch (err) {
                if(err.name == 'ValidationError') {
                    return res.render('edit', {title : 'Edit Cube', error : 'All fields are required'});
                }
            }
            res.redirect('/');
        } catch (err) {
            res.redirect('404');
        }
    }
};