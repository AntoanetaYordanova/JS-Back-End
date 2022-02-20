const { Schema, model } = require('mongoose');

const tripSchema = new Schema ({
    startPoint : {
        type : String,
         required : true
        }, 
    endPoint : {
        type : String,
         required : true
        },
    date : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    carImage : {
        type : String,
        required : true
    },
    carBrand : {
        type : String,
        required : true
    },
    seats : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    buddies : {
        type : [ Schema.Types.ObjectId ],
        ref : 'User',
        default : []
    }
});

module.exports = new model('Trip', tripSchema);