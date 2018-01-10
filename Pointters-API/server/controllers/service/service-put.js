const { update } = require('../../../stores/service');

module.exports = async (ctx) => {
    const queryToFindService = { _id: ctx.params.idService };
    const dataToUpdateService = ctx.request.body;
    const updated = await update(queryToFindService, dataToUpdateService);
    console.log('updated');
    if (!updated || updated.error) ctx.throw(404);
    ctx.body = { success: true };
};
