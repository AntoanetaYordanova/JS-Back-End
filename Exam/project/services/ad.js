const Ad = require('../models/Ad');
const User = require('../models/User');

async function addAd(data, userID) {
    const user = await User.findById(userID);
    const ad = new Ad(data);
    user.adsCreated.push(ad);

    await user.save();
    await ad.save();
}

async function getLastThreeAds() {
    return Ad.find({}).limit(3).lean();
}

async function getAllAds() {
    return Ad.find({}).lean();
}

async function getAdById(id) {
    return Ad.findById(id).populate('author').populate('usersApplied').lean();
}

async function updateAd(id, data){
    const existing = await Ad.findById(id);

    existing.headline = data.headline;  
    existing.location = data.location;  
    existing.companyName = data.companyName; 
    existing.companyDescription = data.companyDescription;  

    await existing.save();
}

async function deleteAd(id) {
    await Ad.findByIdAndRemove(id);
}

async function applyForAd(adId, userId) {
    const ad = await Ad.findById(adId);
    ad.usersApplied.push(userId);
    await ad.save();
}

async function searchAd(email) {
    if(email) {
        const ads = await Ad.find({}).populate('author', 'email').lean();
        const filtered = ads.filter(e => e.author.email.toLowerCase() == email.toLowerCase());
        return filtered;
    }  
}

module.exports = {
    addAd,
    getAdById,
    getAllAds,
    getLastThreeAds,
    updateAd,
    deleteAd,
    applyForAd,
    searchAd
}