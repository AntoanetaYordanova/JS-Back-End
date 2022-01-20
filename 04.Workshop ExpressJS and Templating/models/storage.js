const fs = require('fs/promises');
const uniqueId = require('uniqid');

let data = {};

/*     "asd1" : {
        "name" : "name",
        "description" : "description",
        "image URL" : "image",
        "dIfficulty" : "difficulty"
    }
 */

async function init() {
  try {
    data = JSON.parse(await fs.readFile('./models/data.json'));
  } catch (err) {
      console.error('Error reqding database');
  }

  return (req, res, next) => {
      req.storage = {
          getAll,
          getByID,
          create
      }
      next();
  }
}


async function getAll(query) {
  let cubes = Object
  .entries(data)
  .map(([id, v]) => Object.assign({}, { id }, v));
  console.log(cubes);

  if(query.search) {
    cubes = cubes.filter(c => c.name.toLowerCase().includes(query.search.toLowerCase()));
  }

  if(query.from) {
    cubes = cubes.filter(c => c.difficulty >= Number(query.from));
  }

  if(query.to) {
    cubes = cubes.filter(c => c.difficulty <= Number(query.to));
  }

  return  cubes;
}

async function getByID(id) {
  return data[id];
}

async function create(cube) {
  const id = uniqueId();
  data[id] = cube;

  try {
    fs.writeFile('./models/data.json', JSON.stringify(data, null, 2 ));
    console.log('>>> created new record');
  } catch (err) {
      console.error('Error writing in database');
  }
}

module.exports = {
    init,
    getAll,
    getByID,
    create
}
