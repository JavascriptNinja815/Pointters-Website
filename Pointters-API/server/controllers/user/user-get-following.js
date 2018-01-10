const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/following');
const { findOne: fineOneUser } = require('../../../stores/user');
const { find: fineService } = require('../../../stores/service');
const { Types:{ ObjectId } } = require('../../../databases/mongo');

const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
    const { gt_id, lt_id, inputPage, inputLimit } = ctx.query;
    let query = { followFrom: ctx.session.id };
    let sort = { _id: 1 };
    if (lt_id) {
        query._id = { $lt: ObjectId(lt_id) };
    }
    if (gt_id) {
        query._id = { $gt: ObjectId(gt_id) };
        sort = { _id: -1 };
    }
    
    const tempFollowFrom = await fineOneUser({ _id: ctx.session.id });
    const followers = await paginate( query, { page: inputPage, limit: inputLimit, sort: sort });
    if (followers.total == 0 || followers.error) ctx.throw(404, 'No follower found');
    const { docs, total, limit, page, pages } = followers;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {

        const tempFollowTo = await fineOneUser({ _id: doc.followTo });
        let result = {};
        result.followTo = {};
        result.followTo.id = tempFollowTo._id;
        if(tempFollowTo) {
            result.followTo.firstName = tempFollowTo.firstName;
            result.followTo.lastName = tempFollowTo.lastName;
            result.followTo.companyName = tempFollowTo.companyName;
            result.followTo.profilePic = tempFollowTo.profilePic;
        }
        const servicesFollowTo = await fineService({ userId: doc.followTo});
        result.categories = [];
        let count = 0;
        for (let i = 0; i < servicesFollowTo.length; i ++) {
            if(i == 0) {
                result.categories[0] = servicesFollowTo[0].category.name;
                count ++;
            }else{
                for (let j = 0; j < count; j ++) {
                    if(result.categories[j] != servicesFollowTo[i].category.name) {
                        result.categories[count] = servicesFollowTo[i].category.name;
                        count ++;
                        break;
                    }
                }
            }
            if(count == 3)
                break;
        }

        return resolve(result);
    })));
    
    const followFrom = {};
    followFrom.id = ctx.session.id;
    if(tempFollowFrom) {
        followFrom.firstName = tempFollowFrom.firstName;
        followFrom.lastName = tempFollowFrom.lastName;
        followFrom.companyName = tempFollowFrom.companyName;
        followFrom.profilePic = tempFollowFrom.profilePic;
    }
    ctx.status = 200;
    ctx.body = { docs: results, followFrom: followFrom, total: total, limit: limit, page: page, pages: pages };
};
