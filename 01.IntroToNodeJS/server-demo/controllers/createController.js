const formidable = require('formidable');
const database = require('../util/database');

module.exports = async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields) => {
    console.log('Created item');
    database.push(fields)
    res.writeHead(301, {
      Location: '/catalog',
    });
    res.end();
  });
};
