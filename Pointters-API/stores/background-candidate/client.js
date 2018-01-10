const mongo = require('../../databases/mongo');
const addSyncHook = require('../../lib/sync-elasticsearch-hook');
const schema = require('./schema');
const addIndex = require('./plugin/add-index');
const Schema = mongo.Schema;
const requestBackGroundCheckSchema = new Schema(schema);
addSyncHook(requestBackGroundCheckSchema);
addIndex(requestBackGroundCheckSchema);
const requestBackGroundCheck = mongo.model('background-candidate', requestBackGroundCheckSchema);

module.exports = requestBackGroundCheck;
