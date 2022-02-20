const { isUser } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const { createTrip, getAllTrips } = require('../services/trip');
const mapErrors = require('../utils/mappers');

const router = require('express').Router();

router.get('/', async (req, res) => {
   const trips = await getAllTrips();

   res.render('shared-trips', { title : 'Shared Trips', trips });
});

router.get('/offer',isUser(), (req, res) => {
    res.render('trip-create', { title : 'Offer Trip' });
});

router.post('/offer',isUser(), async (req, res) => {
    const trip = {
        startPoint: req.body.startPoint, 
        endPoint: req.body.endPoint,   
        date: req.body.date,
        time:  req.body.time,     
        carImage:  req.body.carImage,
        carBrand:  req.body.carBrand,
        seats:  req.body.seats,
        price:  req.body.price,
        description:  req.body.description,
        owner : req.session.user._id
      }
    try {
        await createTrip(trip);
        res.redirect('/trips');
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('trip-create', { title : 'Offer Trip', trip, errors});
    }
});

router.get('/details/:id', preload(), (req, res) => {
    res.render('trip-details', { title : 'Trip Details' });
});

module.exports = router;