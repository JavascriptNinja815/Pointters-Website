const mongo = require('../../databases/mongo');
const schema = require('./schema');
const addHooks = require('./plugins/add-hooks');
const addIndex = require('./plugins/add-index');
const addSyncHook = require('../../lib/sync-elasticsearch-hook');

const Schema = mongo.Schema;

const UserSchema = new Schema(schema);
addHooks(UserSchema);
addIndex(UserSchema);
addSyncHook(UserSchema);
const User = mongo.model('user', UserSchema);

module.exports = User;
