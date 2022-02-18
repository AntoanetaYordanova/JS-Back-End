//TO DO: change userSchema according the description
const { Schema, model } = require('mongoose');

const NAME_PATTERN = /^[a-zA-Z]+$/;
const EMAIL_PATTERN = /^[a-zA-Z]+@[a-zA-Z]+.[a-zA-Z]+$/;

const userSchema = new Schema({
    firstName : {
        type : String,
        required : [true, 'First name is required'],
        minlength : [3, 'First name must be at least 3 characters long'],
        validate : {
            validator(value) {
                return NAME_PATTERN.test(value);
            },
            message : 'First name may contain only latin letters'
        }
    },
    lastName : {
        type : String,
        required : [true, 'Last name is required'],
        minlength : [5, 'Last name must be at least 5 characters long'],
        validate : {
            validator(value) {
                return NAME_PATTERN.test(value);
            },
            message : 'Last name may contain only latin letters'
        }
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        validate : {
            validator(value) {
                return EMAIL_PATTERN.test(value);
            },
            message : 'Please enter a valid email. Email may contain only latin letters'
        }
    },
    hashedPassword : {
        type : String,
        required : [true, 'Password  is required']
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