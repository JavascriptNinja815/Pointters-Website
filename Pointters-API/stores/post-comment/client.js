const mongo = require('../../databases/mongo');
const addSyncHook = require('../../lib/sync-elasticsearch-hook');
const schema = require('./schema');
const addIndex = require('./plugin/add-index');
const Schema = mongo.Schema;
const commentSchema = new Schema(schema);
addSyncHook(commentSchema);
addIndex(commentSchema);

const PostComment = mongo.model('post-comment', commentSchema);

module.exports = PostComment;
