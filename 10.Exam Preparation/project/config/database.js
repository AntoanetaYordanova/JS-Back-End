const mongoose = require('mongoose');
require('../models/User');

//TO DO: Change DB name
const dbName = 'wildlife';

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