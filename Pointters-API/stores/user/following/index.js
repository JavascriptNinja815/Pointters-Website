const client = require('../client');
const pull = require('./pull-to-following');
const push = require('./push-to-following');
const get = require('./get-following-of-user');


module.exports = {
    pull: pull(client),
    push: push(client),
    get: get(client)
};
