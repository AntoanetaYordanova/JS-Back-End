const {Schema, model} = require('mongoose');

const cubeSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true,
        maxlength : 500
    },
    imageUrl : {
        type : String,
        required : true,
        match : /^https?:\/\//
    },
    difficulty : {
        type : Number,
        min : 1,
        max : 6
    },
});

module.exports = model('Cube', cubeSchema);