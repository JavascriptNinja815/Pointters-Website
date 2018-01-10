const { create: createOffer } = require('../../../stores/offer');

module.exports = async(ctx) => {
    const offerToCreate = Object.assign({
        userId: ctx.state.user.id,
    },
    ctx.request.body
    );
    const offer = await createOffer(offerToCreate);

    if (offer.error) ctx.throw(404, offer.error.message);

    ctx.body = { success: true, offer };
};
