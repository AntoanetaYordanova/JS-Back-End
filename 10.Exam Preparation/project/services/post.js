const Post = require('../models/Post');

async function createPost(post) {
    const newPost = new Post(post);
    await newPost.save();

    return newPost;
}

async function getPosts() {
    return Post.find({});
}

async function getPostById(id) {
    return Post.findById(id).populate('author', 'firstName lastName');
}

async function editPost(id, post) {
    const existing = await Post.findById(id);

    existing.title = post.title;
    existing.keyword = post.keyword;
    existing.location = post.location;
    existing.date = post.date;
    existing.image = post.image;
    existing.descrpition = post.description;

    console.log(existing);
    await existing.save();
}

async function deletePost (id) {
    await Post.findByIdAndDelete(id);
}

module.exports = {
    createPost,
    getPosts,
    getPostById,
    editPost,
    deletePost
}