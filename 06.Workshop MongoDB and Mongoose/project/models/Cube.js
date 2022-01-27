const {Schema, model} = require('mongoose');

const cubeSchema = new Schema({
    name : String,
    description : String,
    imageUrl : String,
    difficulty : Number,
});

module.exports = model('Cube', cubeSchema);