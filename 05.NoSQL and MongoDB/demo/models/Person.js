const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    firstName: { type: String, required : true},
    lastName: { type: String, required : true},
    age: { type: Number, required : true},
  });

  personSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
  });

  personSchema.methods.sayHi = function () {
    console.log(`I am ${this.firstName} and I am ${this.age} years old`);
  };

  const Person = mongoose.model('Person', personSchema);

  module.exports = Person;