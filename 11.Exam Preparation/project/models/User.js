//TODO: add validation


const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email : {
        type : String,
        required : true 
    },
    hashedPassword : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true,
        enum : ['male', 'female']
    },
    trips : {
        type : [Schema.Types.ObjectId],
        ref : 'Trip',
        default : []
    }
});

userSchema.index({email : 1}, {
    unique : true,
    collation : {
        locale : 'en',
        strength : 2
    }
});

module.exports = new model('User', userSchema);