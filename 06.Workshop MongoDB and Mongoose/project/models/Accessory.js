const {Schema, model} = require('mongoose');

const accessorySchema = new Schema({
    name : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true,
        match : /^https?:\/\//
    }, 
    description : {
        type : String ,
        required : true,
        maxlength : 100
    }
});

module.exports = model('Accessory', accessorySchema);