const { update: updateOffer } = require('../../../stores/offer');

module.exports = async (ctx) => {
    const offerToupdate = ctx.request.body;
    const { error } = await updateOffer({ _id: ctx.params.idOffer }, offerToupdate);

    if (error) ctx.throw(404, error.message);

    ctx.body = { success: true };
};
