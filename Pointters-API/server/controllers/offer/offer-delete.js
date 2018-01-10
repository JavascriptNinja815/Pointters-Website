const { remove: removeOffer } = require('../../../stores/offer');

const errorMessage = 'Request does not exists';
module.exports = async(ctx) => {
    console.log('ctx.params.idOffer in delete', ctx.params.idOffer);
    const offerRemoved = await removeOffer({ _id: ctx.params.idOffer });
    console.log('offerRemoved', offerRemoved);
    if (!offerRemoved || offerRemoved.error) ctx.throw(404, errorMessage);

    ctx.body = { success: Boolean(offerRemoved.ok) };
};
