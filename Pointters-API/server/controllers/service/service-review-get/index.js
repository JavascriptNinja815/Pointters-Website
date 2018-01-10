const { find: findServiceReview, count } = require('../../../../stores/service-review');
const {pagination:{serviceReviews:limit}} = require('../../../../config');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');

const reviewsDoesNotExists = 'Error in get to reviewss';
module.exports = async (ctx) => {
    const query = getQuery(ctx);
    console.log('query, {limit}', query, {limit});
    const serviceReviews = await findServiceReview(query, {limit});

    if (!serviceReviews || !serviceReviews.length || !serviceReviews.length || serviceReviews.error) ctx.throw(404, reviewsDoesNotExists);
    console.log('reviewss ', serviceReviews);
    if (ctx.params.reviewId) {
        ctx.body = {
            review: serviceReviews[0]
        };
        return;
    }
    ctx.body = {reviews:serviceReviews};
    const lastOne = serviceReviews[serviceReviews.length - 1];
    const remaining = await count({_id:{$gt: ObjectId(lastOne._id)}});
    if (remaining) ctx.body.next = `${ctx.url}?id_gt=${lastOne._id}`;
};
