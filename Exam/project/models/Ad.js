const { Schema, model, SchemaTypes } = require('mongoose');

const adSchema = new Schema({
    headline : {
        type : String,
        minlength : [ 4, 'Headline must be at least 4 characters long' ]
    },
    location : {
        type : String,
        minlength : [ 8, 'Headline must be at least 8 characters long' ]
    },
    companyName : {
        type : String,
        minlength : [ 3, 'Headline must be at least 3 characters long' ]
    },
    companyDescription :{
        type : String,
        required : [true, 'Company description is required'],
        maxlength : [ 40, 'Company description must be maximum 40 characters long']
    },
    author : {
        type : SchemaTypes.ObjectId,
        required : true,
        ref : 'User'
    },
    usersApplied : {
        type : [ SchemaTypes.ObjectId ],
        ref : 'User',
        default : []
    }
});

module.exports = new model('Ad', adSchema);
