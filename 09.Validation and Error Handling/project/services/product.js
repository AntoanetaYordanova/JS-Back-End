const Cube = require('../models/Cube');
const Comment = require('../models/Comment');
const Accessory = require('../models/Accessory');


async function getAll(query) {
    const options = {};


    // filter cubes by query params
    if (query.search) {
        options.name = { $regex: query.search, $options: 'i' };
    }
    if (query.from) {
        options.difficulty = { $gte: Number(query.from) };
    }
    if (query.to) {
        options.difficulty = options.difficulty || {};
        options.difficulty.$lte = Number(query.to);
    }

    const cubes = Cube.find(options).lean();

    return cubes;
}

async function getById(id) {
    const cube = await Cube
        .findById(id)
        .populate({
            path: 'comments',
            populate: { path: 'author' }
        })
        .populate('accessories')
        .populate('author')
        .lean();

    if (cube) {
        const viewModel = {
            _id: cube._id,
            name: cube.name,
            description: cube.description,
            imageUrl: cube.imageUrl,
            difficulty: cube.difficulty,
            comments: cube.comments.map(c => ({ content: c.content, author: c.author.username })),
            accessories: cube.accessories,
            author: cube.author && cube.author.username,
            authorId: cube.author && cube.author._id
        };
        return viewModel;
    } else {
        return undefined;
    }
}

async function create(cube) {
    const record = new Cube(cube);
    return record.save();
}

async function edit(id, cube) {
    const existing = await Cube.findById(id);

    if (!existing) {
        throw new ReferenceError('No such ID in database');
    }

    Object.assign(existing, cube);
    return existing.save();
}

async function createComment(cubeId, comment) {
    const cube = await Cube.findById(cubeId);

    if (!cube) {
        throw new ReferenceError('No such ID in database');
    }

    const newComment = new Comment(comment);
    await newComment.save();

    cube.comments.push(newComment);
    await cube.save();
}

async function attachSticker(cubeId, stickerId) {
    const cube = await Cube.findById(cubeId);
    const sticker = await Accessory.findById(stickerId);
    if (!cube || !sticker) {
        throw new ReferenceError('No such ID in database');
    }

    cube.accessories.push(sticker);
    return cube.save();
}

module.exports = {
    getAll,
    getById,
    create,
    edit,
    createComment,
    attachSticker
};