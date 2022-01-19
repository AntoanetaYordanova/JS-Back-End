const { publisher } = require('./index');

function firstHandler(msg) {
    console.log('first ', msg);
}

function secondHandler(msg) {
    console.log('second ', msg.length);
}

function thirdHandler(a, b) {
    console.log('third', a + b);
}

publisher.on('ping', firstHandler);
publisher.on('ping', secondHandler);
publisher.on('pong', thirdHandler);