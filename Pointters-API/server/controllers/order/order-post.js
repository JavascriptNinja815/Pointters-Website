const { create: createOrder } = require('../../../stores/order');

module.exports = async(ctx) => {
    const orderToCreate = Object.assign({
        userId: ctx.state.user.id,
    },
    ctx.request.body
    );
    const { error } = await createOrder(orderToCreate);

    if (error) ctx.throw(404, error.message);

    ctx.body = { success: true };
};
