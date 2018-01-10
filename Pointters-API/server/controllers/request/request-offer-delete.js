const { remove: removeOffer } = require('../../../stores/request-offer');

const errorMessage = 'Request does not exists';
module.exports = async(ctx) => {
    console.log('ctx.params.idOffer ', ctx.params.idOffer);
    const requestRemoved = await removeOffer({ _id: ctx.params.idOffer });
    console.log('requestRemoved', requestRemoved);
    if (!requestRemoved || requestRemoved.error) ctx.throw(404, errorMessage);

    ctx.body = { success: Boolean(requestRemoved.ok) };
};
