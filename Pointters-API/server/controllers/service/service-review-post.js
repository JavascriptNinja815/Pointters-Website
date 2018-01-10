const { findOne: findOneService } = require('../../../stores/service');
const { create: createReview, findOne} = require('../../../stores/service-review');

const errorOnFindService = 'Error in find service';
module.exports = async(ctx) => {
    const serviceToAddReview = findOneService({ _id: ctx.params.serviceId });
    const reviewInDB = await findOne({orderId: ctx.request.body.orderId});
    console.log('reviewInDB ', reviewInDB);
    if (reviewInDB) ctx.throw(409);
    if (!serviceToAddReview || serviceToAddReview.error) ctx.throw(404, errorOnFindService);

    const dataFromRequest = {
        userId: ctx.state.user.id,
        serviceId: ctx.params.serviceId
    };
    console.log('dataFromRequest ', dataFromRequest);
    const reviewToCreate = Object.assign(dataFromRequest, ctx.request.body);
    console.log('reviewToCreate ', reviewToCreate);
    const review = await createReview(reviewToCreate);
    console.log('review ', review);
    if (review.error) {
        if (/duplicate key error index/.exec(review.error.err)) ctx.throw(409);
        ctx.throw(404, review.error.message);
    }

    ctx.body = { success: true, review };
};
