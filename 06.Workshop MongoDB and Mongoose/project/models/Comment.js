const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
    author : {
        type : String, 
        required : true
    },
    content : {
        type : String, 
        required : true
    }
});

module.exports = model('Comment', commentSchema);