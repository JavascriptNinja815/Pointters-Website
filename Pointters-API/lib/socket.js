const IO = require('koa-socket.io');
const io = new IO({ namespace: '/' });
const options = {};

module.exports = (server) => io.start(server, options);

