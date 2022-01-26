const {Schema, model} = require('mongoose');

const cubseSchema = new Schema({
    name : String,
    description : String,
    imageUrl : String,
    difficulty : Number,
});

module.exports = model('Cube', cubseSchema);