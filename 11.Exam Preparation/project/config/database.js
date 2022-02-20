const mongoose = require('mongoose');
require('../models/User');
require('../models/Trip');

const dbName = 'sharedtrip';

module.exports = async () => {

    try {
        mongoose.connect('mongodb://localhost:27017/' + dbName, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Database connected');
    } catch (err) {
        console.log(('>>> Error connecting to database'));
        process.exit(1);
    }
}