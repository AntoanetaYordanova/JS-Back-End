const { getPosts, getPostById } = require('../services/post');
const { postViewModel } = require('../utils/mappers');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Home Page' });
});

router.get('/catalog', async (req, res) => {
  const posts = (await getPosts()).map(postViewModel);
  res.render('all-posts', { title: 'Catalog Page', posts });
});

router.get('/details/:id', async (req, res) => {
  const post = postViewModel(await getPostById(req.params.id));

  if (req.session.user) {
    post.hasUser = true;
    if (req.session.user._id == post.author._id) {
      post.isAuthor = true;
    }
    
  }
  res.render('details', {
    title: 'Details',
    post,
    hasUser: res.locals.hasUser,
  });
});

module.exports = router;
