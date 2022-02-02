const Cube = require('../models/Cube');
const Comment = require('../models/Comment');
const Accessory = require('../models/Accessory');

async function init() {
  return (req, res, next) => {
    req.storage = {
      getAll,
      getById,
      create,
      edit,
      createComment
    };
    next();
  };
}

async function getAll(query) {
  const options = {};

  if (query.search) {
    options.name = { $regex: query.search, $options: 'i' };
  }
  if (query.from) {
    options.difficulty = { $gte: Number(query.from) };
  }
  if (query.to) {
    options.difficulty = options.difficulty || {};

    options.difficulty['$lte'] = Number(query.to);
  }
  const cubes = await Cube.find(options).lean();

  return cubes;
}

async function getById(id) {
  const cube = await Cube.findById(id).populate('comments').lean();
  if (cube) {
    return cube;
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

  await existing.save();
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

module.exports = {
  init,
  getAll,
  getById,
  create,
  createComment
};
