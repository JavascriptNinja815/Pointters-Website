const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/following');
const { findOne: fineOneUser } = require('../../../stores/user');
const { find: fineService } = require('../../../stores/service');
const { Types:{ ObjectId } } = require('../../../databases/mongo');

const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
    const tempFollowTo = await fineOneUser({ _id: ctx.session.id });
    const { gt_id, lt_id, inputPage, inputLimit } = ctx.query;
    let query = { followTo: ctx.session.id };
    let sort = { _id: 1 } ;
    if (lt_id) {
        query._id = { $lt: ObjectId(lt_id) };
    }
    if (gt_id) {
        query._id = { $gt: ObjectId(gt_id) };
        sort = { _id: -1 };
    }
    console.log(sort);
    const followers = await paginate( query, { page: inputPage, limit: inputLimit, sort: sort } );

    if (followers.total == 0 || followers.error) ctx.throw(404, 'No follower found');
    const { docs, total, limit, page, pages } = followers;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {

        const tempFollowFrom = await fineOneUser({ _id: doc.followFrom });
        let result = {};
        result.followFrom = {};
        result.followFrom.id = tempFollowFrom._id;
        if(tempFollowFrom) {
            result.followFrom.firstName = tempFollowFrom.firstName;
            result.followFrom.lastName = tempFollowFrom.lastName;
            result.followFrom.companyName = tempFollowFrom.companyName;
            result.followFrom.profilePic = tempFollowFrom.profilePic;
        }
        const servicesFollowFrom = await fineService({ userId: doc.followFrom});
        result.followFrom.categories = [];
        let count = 0;
        for (let i = 0; i < servicesFollowFrom.length; i ++) {
            if(i == 0) {
                result.followFrom.categories[0] = servicesFollowFrom[0].category.name;
                count ++;
            }else{
                for (let j = 0; j < count && count < 3; j ++) {
                    if(result.followFrom.categories[j] != servicesFollowFrom[i].category.name) {
                        result.followFrom.categories[count] = servicesFollowFrom[i].category.name;
                        count ++;
                    }
                }
            }
        }
        
        return resolve(result);
    })));
    const followTo = {};
    followTo.id = ctx.session.id;
    if(tempFollowTo) {
        followTo.firstName = tempFollowTo.firstName;
        followTo.lastName = tempFollowTo.lastName;
        followTo.companyName = tempFollowTo.companyName;
        followTo.profilePic = tempFollowTo.profilePic;
    }
    ctx.status = 200;
    
    ctx.body = { docs: results, followTo: followTo, total: total, limit: limit, page: page, pages: pages };
};
