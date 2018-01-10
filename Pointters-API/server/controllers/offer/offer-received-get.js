const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/offer');
const { findOne: fineOneUser } = require('../../../stores/user');
const {Types:{ObjectId}} = require('../../../databases/mongo');

const { findOne: fineOneService } = require('../../../stores/service');

module.exports = async (ctx) => {
	const { gt_id, lt_id, inputPage, inputLimit } = ctx.query;
    let query = { buyerId: ctx.session.id };
    let sort = { _id: 1 };
    if (lt_id) {
        query._id = { $lt: ObjectId(lt_id) };
    }
    if (gt_id) {
        query._id = { $gt: ObjectId(gt_id) };
        sort = { _id: -1 };
    }
    const receives = await paginate(query, { page: inputPage, limit: inputLimit, sort: sort });

    if (receives.total == 0 || receives.error)
        ctx.throw(404, "No offer found");

    const { docs, total, limit, page, pages } = receives;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {};
        let offData = {};
				result.seller={};
        result.seller.sellerId = doc.sellerId;
        result.serviceId = doc.serviceId;
				result.description = doc.description;
        result.price = doc.price;
        result.workDuration = doc.workDuration;
        result.workDurationUom = doc.workDurationUom;
        result.createdAt = doc.createdAt;
        const userData = await fineOneUser({ _id: ObjectId(doc.sellerId) });
        if(userData)
        {
            result.seller.firstName = userData.firstName;
            result.seller.lastName = userData.lastName;
            result.seller.location = userData.location;
            result.seller.phone = userData.phone;
            result.seller.profilePic = userData.profilePic;
        }
        const ServiceData = await fineOneService({ _id: ObjectId(doc.serviceId) });
        if(ServiceData)
        {
            result.serviceDescription = ServiceData.description;
        }
        return resolve(result);
    })));
    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages };

};
