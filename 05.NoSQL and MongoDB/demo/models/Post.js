const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Person'
    },
    title : {
        type : String,
        required : true
    } ,
    content : {
        type : String,
        required : true,
        minlength : 10
    },
    comments : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Comment' ,
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;