const { find: findOffer, count } = require('../../../../stores/offer');
const {pagination:{offers:limit}} = require('../../../../config');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');

const errorInGetWatching = 'Error in get to offer-offer';
module.exports = async (ctx) => {
    const query = getQuery(ctx);
    const offers = await findOffer(query, {limit});
    if (!offers || !offers.length || offers.error) ctx.throw(404, errorInGetWatching);

    if (ctx.params.idOffer) {
        ctx.body = {
            offer: offers[0]
        };
        return;
    }
    ctx.body = {offers};
    const lastOne = offers[offers.length - 1];
    const remaining = await count({_id:{$gt: ObjectId(lastOne._id)}});
    if (remaining) ctx.body.next = `${ctx.url}?id_gt=${lastOne._id}`;
};
