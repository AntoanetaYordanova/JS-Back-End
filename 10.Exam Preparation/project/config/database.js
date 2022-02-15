//TO DO: Change DB name

const dbName = 'wildlife';

module.exports = async () => {
    const mongoose = require('mongoose');

    try {
        mongoose.connect('mongodb://localhost:27017/' + dbName, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    } catch (err) {
        console.log(('>>> Error connecting to database'));
        process.exit(1);
    }
}