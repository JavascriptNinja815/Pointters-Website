const { find: findRequest, count } = require('../../../../stores/request');
const {pagination:{requests:limit}} = require('../../../../config');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');
const errorMessage = 'Request does not exists';

module.exports = async(ctx) => {
    const query = getQuery(ctx);
    console.log('query ', query);
    const requests = await findRequest(query, {limit});
    console.log('requests ', requests);
    if (!requests || !requests.length || requests.error) ctx.throw(404, errorMessage);
    if (ctx.params.idRequest) {
        ctx.body = {
            request: requests[0]
        };
        return;
    }
    ctx.body = {requests};
    const lastOne = requests[requests.length - 1];
    console.log('lastOne ', lastOne);
    const remaining = await count({_id:{$gt: ObjectId(lastOne._id)}});
    console.log('remaining ', remaining);
    if (remaining) ctx.body.next = `${ctx.url}?id_gt=${lastOne._id}`;
};
