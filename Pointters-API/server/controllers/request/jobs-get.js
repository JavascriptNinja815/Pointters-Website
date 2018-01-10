const Promise = require('bluebird');
const { map } = require('lodash');
const { findOne: findOneRequest } = require('../../../stores/request');
const { findOne: findOneUser } = require('../../../stores/user');
const { paginate, count: countRequestOffer } = require('../../../stores/request-offer');
const { Types:{ ObjectId } } = require('../../../databases/mongo');

module.exports = async(ctx) => {
	const { gt_id, lt_id, inputPage, inputLimit } = ctx.query;
	let query = { sellerId: ctx.session.id };
	let sort = { requestId: 1 };
    if (lt_id) {
        query._id = { $lt: ObjectId(lt_id) };
    }
    if (gt_id) {
        query._id = { $gt: ObjectId(gt_id) };
        sort = { requestId: -1 };
    }
	const requestOffers = await paginate(query, { page: inputPage, limit: inputLimit, sort:sort });
	if (requestOffers.total == 0 || requestOffers.error) ctx.throw(404, "Error in find request-offer");
	const { docs, total, limit, page, pages } = requestOffers;
	const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
		let result = {};
		result.requestOffers = {};
		result.requestOffers.request = {};
		result.requestOffers.requester = {};
		result.requestOffers.request.requestId = doc.requestId;
		result.requestOffers.createdAt = doc.createdAt;
		const request = await findOneRequest(doc.requestId);
		if(request) {
			result.requestOffers.request.description = request.description;
			result.requestOffers.request.createdAt = request.createdAt;
			result.requestOffers.request.media = request.media;
			result.requestOffers.requester.userId = request.userId;
			result.requestOffers.requester.low = request.minPrice;
			result.requestOffers.requester.high = request.maxPrice;
			result.requestOffers.numOffers  = await countRequestOffer({ requestId: request._id });
			const requester = await findOneUser({_id: request.userId});
			if(requester) {
				result.requestOffers.requester.firstName = requester.firstName;
				result.requestOffers.requester.lastName = requester.lastName;
				result.requestOffers.requester.profilePic = requester.profilePic;
				result.requestOffers.requester.verified = requester.verified;
			}
		}
		return resolve(result);
	})));
	ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages };
};