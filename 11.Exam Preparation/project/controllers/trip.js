const { isUser, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const {
  createTrip,
  getAllTrips,
  updateTrip,
  deleteTrip,
  joinTrip,
} = require('../services/trip');
const mapErrors = require('../utils/mappers');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const trips = await getAllTrips();

  res.render('shared-trips', { title: 'Shared Trips', trips });
});

router.get('/offer', isUser(), (req, res) => {
  res.render('trip-create', { title: 'Offer Trip' });
});

router.post('/offer', isUser(), async (req, res) => {
  const trip = {
    startPoint: req.body.startPoint,
    endPoint: req.body.endPoint,
    date: req.body.date,
    time: req.body.time,
    carImage: req.body.carImage,
    carBrand: req.body.carBrand,
    seats: req.body.seats,
    price: req.body.price,
    description: req.body.description,
    owner: req.session.user._id,
  };
  try {
    await createTrip(trip);
    res.redirect('/trips');
  } catch (err) {
    console.log(err);
    const errors = mapErrors(err);
    res.render('trip-create', { title: 'Offer Trip', trip, errors });
  }
});

router.get('/details/:id', preload(true), (req, res) => {
  const trip = res.locals.trip;
  let userInfo = {};

  if (req.session.user && req.session.user._id) {
    userInfo.isUser = true;
    if (req.session.user._id == res.locals.trip.owner._id) {
      userInfo.isOwner = true;
    }
    if(trip.buddies.some(b => b._id == req.session.user._id)) {
      userInfo.hasJoined = true;
    }
  }

  trip.userInfo = userInfo;

  trip.remainingSeats = trip.seats - trip.buddies.length;

  if(trip.buddies.length > 0) {
      trip.viewBuddies = trip.buddies.map(b => b.email) .join(', ');
  }

  res.render('trip-details', { title: 'Trip Details' });
});

router.get('/edit/:id', preload(), isOwner(), (req, res) => {
  res.render('trip-edit', { title: 'Edit Page' });
});

router.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  let trip = {
    startPoint: req.body.startPoint,
    endPoint: req.body.endPoint,
    date: req.body.date,
    time: req.body.time,
    carImage: req.body.carImage,
    carBrand: req.body.carBrand,
    seats: req.body.seats,
    price: req.body.price,
    description: req.body.description,
  };

  try {
    await updateTrip(id, trip);

    res.redirect('/trips/details/' + id);
  } catch (err) {
    console.log(err);
    const errors = mapErrors(err);
    trip._id = id;
    res.render('trip-edit', { title: 'Edit Trip', trip, errors });
  }
});

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
  await deleteTrip(req.params.id);
  res.redirect('/trips');
});

router.get('/join/:id', isUser(), async (req, res) => {
  const id = req.params.id;

  try {
    await joinTrip(id, req.session.user._id);
  } catch (err) {
    console.log(err);
  } finally {
    res.redirect('/trips/details/' + id);
  }
});

module.exports = router;
