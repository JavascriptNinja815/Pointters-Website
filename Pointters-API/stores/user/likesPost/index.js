const client = require('../client');
const pull = require('./pull-to-likes-post');
const push = require('./push-to-likes-post');
const get = require('./get-likes-post-of-user');


module.exports = {
    pull: pull(client),
    push: push(client),
    get: get(client)
};
