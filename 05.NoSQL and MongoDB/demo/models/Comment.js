const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    post : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Post',
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId, ref : 'Person',
        required : true
    },
    content : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Comment', commentSchema);