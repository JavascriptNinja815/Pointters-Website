const client = require('../client');
const pull = require('./pull-to-likes');
const push = require('./push-to-likes');
const get = require('./get-likes-of-user');


module.exports = {
    pull: pull(client),
    push: push(client),
    get: get(client)
};
