const mongoose = require('mongoose');
const Cat = require('./models/Cat');
const Person = require('./models/Person');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

start();

async function start() {
  const connectionStr = 'mongodb://localhost:27017/test';

  const client = mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Database connected');

  const cat = new Cat({
    name : 'Flufy',
    color : 'Grey'
  })

  const person1 = new Person({
    firstName: 'Peter',
    lastName: 'Johnson',
    age: 23,
  });

  // await cat.save();
  // await person1.save();

  const data = await Person.find({});
  const person = await Person.findOne({});

  // data.forEach((p) => p.sayHi());

  // data.map(p => p.fullName).forEach(n => console.log(n));
  // const person = await Person.find({firstName : 'Tony'});

  const post = await Post.findOne({}).populate('author');

  console.log(post);
}
