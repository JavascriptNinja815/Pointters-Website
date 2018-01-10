const mongo = require('../../databases/mongo');
const addSyncHook = require('../../lib/sync-elasticsearch-hook');
const schema = require('./schema');
const addIndex = require('./plugin/add-index');

const Schema = mongo.Schema;
const postSchema = new Schema(schema);
addSyncHook(postSchema);
addIndex(postSchema);
const Post = mongo.model('post', postSchema);

module.exports = Post;
