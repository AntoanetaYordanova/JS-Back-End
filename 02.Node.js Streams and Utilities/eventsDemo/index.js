const events = require('events');

const publisher = new events.EventEmitter();

function raiseEvents() {
  console.log('before');
  publisher.emit('ping', 'Hello world');
  console.log('after');
  publisher.emit('ping', 'Hello world again');
  publisher.emit('pong', 2, 3);
}

module.exports = {
    raiseEvents,
    publisher
}