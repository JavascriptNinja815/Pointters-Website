const { findOne: findOneOrder } = require('../../../stores/order');

const errorInGetWatching = 'Error in get to request-order';
const orderDoesNotExists = 'Error in get to request-order';

module.exports = async (ctx) => {
    const queryToFindOrder = { _id: ctx.params.idOrder };
    console.log('queryToFindOrder ', queryToFindOrder);
    const order = await findOneOrder(queryToFindOrder);

    if (!order) ctx.throw(403, orderDoesNotExists);

    if (order.error) ctx.throw(404, errorInGetWatching);

    ctx.body = { order };
};
