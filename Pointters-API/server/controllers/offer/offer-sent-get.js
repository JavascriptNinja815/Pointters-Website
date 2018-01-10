const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/offer');
const { findOne: fineOneUser } = require('../../../stores/user');
const {Types:{ObjectId}} = require('../../../databases/mongo');

const { findOne: fineOneService } = require('../../../stores/service');

module.exports = async (ctx) => {
    const { gt_id, lt_id, inputPage, inputLimit } = ctx.query;
    let query = { sellerId: ctx.session.id };
    let sort = { _id: 1 };
    if (lt_id) {
        query._id = { $lt: ObjectId(lt_id) };
    }
    if (gt_id) {
        query._id = { $gt: ObjectId(gt_id) };
        sort = { _id: -1 };
    }
    const sellers = await paginate(query, { page: inputPage, limit: inputLimit, sort:sort });
    if (sellers.total == 0 || sellers.error)
        ctx.throw(404, "No offer found");
    const { docs, total, limit, page, pages } = sellers;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {};
        let offData = {};
        result.buyer={};
        result.buyer.buyerId = doc.buyerId;
        result.serviceId = doc.serviceId;
        result.description = doc.description;
        result.price = doc.price;
        result.workDuration = doc.workDuration;
        result.workDurationUom = doc.workDurationUom;
        result.createdAt = doc.createdAt;
        const userData = await fineOneUser({ _id: ObjectId(doc.buyerId) });
        if(userData)
        {
            result.buyer.firstName = userData.firstName;
            result.buyer.lastName = userData.lastName;
            result.buyer.location = userData.location;
            result.buyer.phone = userData.phone;
            result.buyer.profilePic = userData.profilePic;
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
