const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
    const cubes = await req.storage.getAll(req.query);

    const ctx = {
        title: 'Cubicle',
        cubes,
        search: req.query.search || '',
        from: req.query.from || '',
        to: req.query.to|| ''
    };

    res.render('index', ctx);
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube' });
});

router.post('/create', async (req, res) => {
    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: Number(req.body.difficulty)
    };

    try {
        await req.storage.create(cube);
    } catch (err) {
        if (err.name == 'ValidationError') {
            return res.render('create', { title: 'Create Cube', error: 'All fields are required. Image URL must be a valid URL.' });
        }
    }

    res.redirect('/');
});

router.get('/details/:id', async (req, res) => {
    const cube = await req.storage.getById(req.params.id);

    if (cube == undefined) {
        res.redirect('/404');
    } else {
        const ctx = {
            title: 'Cubicle',
            cube
        };
        res.render('details', ctx);
    }
});

router.get('/edit/:id', async (req, res) => {
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
});

router.post('/edit/:id', async (req, res) => {
    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: Number(req.body.difficulty)
    };
    try {
        await req.storage.edit(req.params.id, cube);
        res.redirect('/');
    } catch (err) {
        res.redirect('404');
    }
});


router.get('/attach/:id', async (req, res) => {
    const cube = await req.storage.getById(req.params.id);
    const accessories = await req.storage.getAllAccessories((cube.accessories || []).map(a => a._id));

    res.render('attach', {
        title: 'Attach Stickers',
        cube,
        accessories
    });
});

router.post('/attach/:id', async (req, res) => {
    const cubeId = req.params.cubeId;
    const stickerId = req.body.accessory;

    await req.storage.attachSticker(cubeId, stickerId);

    res.redirect(`/details/${cubeId}`);
});

module.exports = router;