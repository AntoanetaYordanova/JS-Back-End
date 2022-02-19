const { isUser } = require('../middlewares/guards');
const { createPost, getPostById, editPost, deletePost } = require('../services/post');
const { mapErrors, postViewModel } = require('../utils/mappers');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title : 'Create Post'});
});


router.post('/create', isUser(), async (req, res) => {  
    const userId = req.session.user._id;
    const data = {
        title : req.body.title,
        keyword : req.body.keyword,
        location : req.body.location,
        date : req.body.date,
        image : req.body.image,
        descrpition : req.body.description,
        author : userId
    }
    try {
        await createPost(data);

        res.redirect('/catalog');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create',{title : 'Create Post', data, errors});
    }
});

router.get('/edit/:id',isUser(), async (req, res) => {
    const post = postViewModel(await getPostById(req.params.id));

    if(req.session.user._id != post.author._id) {
        return res.redirect('/');
    } 

    res.render('edit', { title : 'Edit Page', post });
});

router.post('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const existing = postViewModel(await getPostById(req.params.id));

    if(req.session.user._id != existing.author._id) {
        return res.redirect('/');
    }

    const post = {
        title : req.body.title,
        keyword : req.body.keyword,
        location : req.body.location,
        date : req.body.date,
        image : req.body.image,
        description : req.body.description
    };

    try {
        await editPost(id, post);

        res.redirect('/details/' + id);
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        post._id = id;
        res.render('edit', { title : 'Edit Page', post, errors});
    }
});

router.get('/delete/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const post = postViewModel(await getPostById(id));

    if(req.session.user._id != post.author._id) {
        return res.redirect('/');
    }
    
    try {
        await deletePost(req.params.id);
        res.redirect('/catalog');
    } catch (err) {
        res.redirect('/details/' + id);
    }
});

router.get('/vote/:id/:type', isUser(), (req, res) => {
    
});

module.exports = router;
