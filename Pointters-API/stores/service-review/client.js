const mongo = require('../../databases/mongo');
const addSyncHook = require('../../lib/sync-elasticsearch-hook');
const schema = require('./schema');
const addIndex = require('./plugin/add-index');

const Schema = mongo.Schema;
const reviewSchema = new Schema(schema);
console.log('antes de agregar los indices');
addSyncHook(reviewSchema);
addIndex(reviewSchema);

const ServiceReview = mongo.model('service-review', reviewSchema);
module.exports = ServiceReview;
