const { Schema, model, SchemaTypes } = require('mongoose');

const EMAIL_PATTERN = /^[a-zA-Z]+@[a-zA-Z]+.[a-zA-Z]+$/;


const userSchema = new Schema({
    email : {
        type : String,
        validate : {
            validator(value) {
                return EMAIL_PATTERN.test(value);
            },
            message : 'Please enter a valid email'
        }
    },
    hashedPassword : {
        type : String,
        required : true
    },
    skills : {
        type : String,
        required : [ true, 'Description of skills is required'],
        maxlength : [ 40, 'Description of skills must be maximum 40 characters long ']
    },
    adsCreated : {
        type : [ SchemaTypes.ObjectId ],
        ref : 'Ad',
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