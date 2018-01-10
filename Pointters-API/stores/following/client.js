const mongoosePaginate = require('mongoose-paginate');
const mongo = require('../../databases/mongo');
const addSyncHook = require('../../lib/sync-elasticsearch-hook');
const schema = require('./schema');
const addIndex = require('./plugin/add-index');
const Schema = mongo.Schema;
const requestSchema = new Schema(schema);
requestSchema.plugin(mongoosePaginate);
addSyncHook(requestSchema);
addIndex(requestSchema);
const request = mongo.model('following', requestSchema);

module.exports = request;
