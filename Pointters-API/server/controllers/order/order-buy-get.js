const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/order');
const {Types:{ObjectId}} = require('../../../databases/mongo');
const { findOne: fineOneUser } = require('../../../stores/user');
const { findOne: findService } = require('../../../stores/service');

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
    const buyers = await paginate(query, { page: inputPage, limit: inputLimit, sort:sort });

    if ( buyers.total == 0 || buyers.error ) ctx.throw(404, "No order found");

    const { docs, total, limit, page, pages } = buyers;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        const result = {};
        result.seller = {};
        result.service = {};
        result.order = {};
        result.order.paymentDate = doc.paymentDate;
        result.order.orderMilestoneStatuses = doc.orderMilestoneStatuses;
        const serviceLocation = doc.buyerServiceLocation[0];
        if(doc.buyerServiceLocation == null)
            serviceLocation = doc.sellerServiceLocation[0];
        result.order.serviceLocation = serviceLocation;

        result.seller.id = doc.sellerId;
        result.service.id = doc.serviceId;
        const seller = await fineOneUser({ _id: ObjectId(doc.sellerId) });
        if(seller)
        {
            result.seller.firstName = seller.firstName;
            result.seller.lastName = seller.lastName;
            result.seller.phone = seller.phone;
						result.seller.phone = seller.phone;
						result.seller.profilePic = seller.profilePic;
        }
        const service = await findService({ _id: ObjectId(doc.serviceId) });
        if(service)
        {
            result.service.description = service.description;
            result.service.createdAt = service.createdAt;
            result.service.updatedAt = service.updatedAt;
            result.service.media = service.media[0];
        }
        return resolve(result);
    })));
    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages };
};
