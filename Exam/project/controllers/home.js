const { isUser } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const { getLastThreeAds, getAllAds, searchAd } = require('../services/ad');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const data = await getLastThreeAds();
  data.forEach((d) => {
    d.candidates = d.usersApplied.length;
  });
  const ctx = {
    title: 'Home Page',
    data,
    hasData: false,
  };

  if (data.length > 0) {
    ctx.hasData = true;
  }
  res.render('home', ctx);
});

router.get('/catalog', async (req, res) => {
  const data = await getAllAds();
  const ctx = {
    title: 'All-Ads Page',
    data,
    hasData: false,
  };

  if (data.length > 0) {
    ctx.hasData = true;
  }

  res.render('catalog', ctx);
});

router.get('/search', isUser(), async (req, res) => {
    let isDefault = true;
  const data = await searchAd(req.query.search);
  if(data) {
      isDefault = false;
  }
  const dataInfo = {
      data,
      hasResault : data && (data.length > 0)
  }
  res.render('search', { title: 'Search', dataInfo, isDefault });
});

module.exports = router;
