const { create } = require('../../../stores/service');

module.exports = async (ctx) => {
    const serviceToCreate = Object.assign({ userId: ctx.state.user.id }, ctx.request.body);
    const service = await create(serviceToCreate);

    if (service.error) ctx.throw(404, service.error.message);

    ctx.body = { success: true, service };
};
