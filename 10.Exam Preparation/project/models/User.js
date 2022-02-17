//TO DO: change userSchema according the description

const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username : {
        type : String,
        required : true 
    },
    hashedPassword : {
        type : String,
        required : true
    }
});

userSchema.index({username : 1}, {
    unique : true,
    collation : {
        locale : 'en',
        strength : 2
    }
});

module.exports = new model('User', userSchema);