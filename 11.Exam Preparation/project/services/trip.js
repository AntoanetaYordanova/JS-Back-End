const Trip = require('../models/Trip');

async function getAllTrips() {
    return Trip.find({}).lean();
}

async function getTripById(id) {
    return Trip.findById(id).lean();
}

async function getTripAndUsers(id) {
    return Trip.findById(id).populate('owner').populate('buddies').lean();
}

async function getTripsByUser(id) {
    return Trip.find({ owner : id}).lean();
}

async function createTrip(trip) {
    const result = new Trip(trip);
    await result.save();
}

async function updateTrip(id, data) {
    const existing = await Trip.findById(id);

    existing.startPoint = data.startPoint;
    existing.endPoint = data.endPoint;
    existing.date = data.date;
    existing.time = data.time;
    existing.carImage = data.carImage;
    existing.carBrand = data.carBrand;
    existing.seats = data.seats;
    existing.price = data.price;
    existing.description = data.description

    await existing.save();
}

async function deleteTrip(id) {
    await Trip.findByIdAndDelete(id);
}

async function joinTrip(tripId, userId) {
    const trip = await Trip.findById(tripId);
    if(trip.buddies.includes(userId)){
        throw new Error('User has already joined');
    }

    trip.buddies.push(userId);
    await trip.save();
}

module.exports = {
    getTripById,
    createTrip,
    getAllTrips,
    getTripAndUsers,
    updateTrip,
    deleteTrip,
    joinTrip,
    getTripsByUser
}

