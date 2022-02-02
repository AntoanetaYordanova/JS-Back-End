module.exports = {
  create: (req, res) => {
    res.render('create', { title: 'Create Cube' });
  },
  post: async (req, res) => {
    const cube = {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      difficulty: Number(req.body.difficulty),
    };

    try {
      await req.storage.create(cube);
    } catch (err) {
        console.log(err.name);
      if(err.name == 'ValidationError') {
          return res.render('create', { title: 'Create Cube', error : 'All fields are required' })
      }
    }

    res.redirect('/');
  },
};
