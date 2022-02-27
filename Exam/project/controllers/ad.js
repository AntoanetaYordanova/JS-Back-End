const { isUser, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const { addAd, updateAd, deleteAd, applyForAd } = require('../services/ad');
const mapErrors = require('../utils/mappers');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', { tittle : 'Create Page', data : {}});
});

router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id;
    const data = {
        headline : req.body.headline,
        location : req.body.location,
        companyName : req.body.companyName,
        companyDescription : req.body.companyDescription,
        author : userId
    }

    try {
        await addAd(data, userId);

        res.redirect('/catalog');
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Page', data, errors});
    }
    console.log(req.body);
});

router.get('/details/:id', preload(), (req, res) => {
    const userId = req.session.user && req.session.user._id;
    const ad = res.locals.data;
    const userData = {};

    
    if(userId == ad.author._id){
       
        userData.isOwner = true;
    }

    if(ad.usersApplied.some(u => u._id == userId)) {
        userData.hasApplied = true;
    }  
    res.locals.userData = userData;

    ad.hasApplicants = ad.usersApplied.length > 0;
    ad.numUsersApplied = ad.usersApplied.length;
    
    res.render('details', { title : 'Details Page'});
});

router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    res.render('edit', { title : 'Edit page' })
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;
    const data = {
        headline : req.body.headline,
        location : req.body.location,
        companyName : req.body.companyName,
        companyDescription : req.body.companyDescription
    }

    try {
        await updateAd(id, data);

        res.redirect('/ad/details/' + id);
    } catch (err) {
        data._id = id;
        console.log(err);
        const errors = mapErrors(err);
        res.render('edit', { title: 'Edit Page', data, errors});
    }
});

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;

    try {
        await deleteAd(id);
        res.redirect('/catalog');
    } catch (err) {
        console.log(err);
        res.redirect('/ad/details/' + id);
    }
});

router.get('/apply/:id', preload(), isUser(), async (req, res) => {
    const adId = req.params.id;
    const userId = req.session.user._id;

    try {
        await applyForAd(adId, userId);
        res.redirect('/ad/details/'+ adId);
    } catch (err) {
        console.log(err);
        res.redirect('/catalog');
    }

});


module.exports = router;
