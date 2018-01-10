const client = require('../client');
const pull = require('./pull-to-watching');
const push = require('./push-to-watching');
const get = require('./get-watching-of-user');


module.exports = {
    pull: pull(client),
    push: push(client),
    get: get(client)
};
