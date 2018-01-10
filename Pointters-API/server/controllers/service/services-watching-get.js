const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/watch');
const { findOne: findOneService } = require('../../../stores/service');
const { findOne: findOneUser } = require('../../../stores/user');
const { numOrders } = require('../../../stores/order');
const { avgRating } = require('../../../stores/service-review');
const { Types:{ ObjectId } } = require('../../../databases/mongo');

const errorInGetWatching = 'watching does not exists';

module.exports = async(ctx) => {
    const { gt_id, lt_id, inputPage, inputLimit } = ctx.query;
    let query = { userId: ctx.session.id };
    let sort = { _id: 1 };
    if (lt_id) {
        query._id = { $lt: ObjectId(lt_id) };
    }
    if (gt_id) {
        query._id = { $gt: ObjectId(gt_id) };
        sort = { _id: -1 };
    }

    const watchs = await paginate(query, { page: inputPage, limit: inputLimit, sort:sort });

    if (watchs.total == 0 || watchs.error) ctx.throw(404, errorInGetWatching);

    const { docs, total, limit, page, pages } = watchs;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {};
        result.service = {};
        result.user = {};
        result.service.id = doc.serviceId;
        const service = await findOneService({ _id: doc.serviceId });
        if (service)
        {
            result.service.description = service.description;
            result.service.media = service.media[0];
            result.service.location = service.location;
            result.service.prices = service.prices[0];
        }
        result.user.id = doc.userId;
        const user = await findOneUser({ _id: doc.userId });
        if(user)
        {
            result.user.firstName = user.firstName;
            result.user.lastName = user.lastName;
            result.user.profilePic = user.profilePic;
        }
        result.numOrders = 0;
        result.avgRating = 0;
        result.ratingCount = 0;
        result.pointValue = 1;
        result.numOrders = await numOrders({ serviceId: doc.serviceId });
        result.avgRating = await avgRating({ serviceId: doc.serviceId });
        return resolve(result);
    })));

    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages };
};