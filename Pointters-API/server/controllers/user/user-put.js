const { update } = require('../../../stores/user');

const errorMessageInUpdateUser = 'Error in update user';
module.exports = async (ctx) => {
    const data = ctx.request.body;
    data.createdAt = new Date().toString();
    const { error } = await update(ctx.queryToFindUserById, data);

    if (error) ctx.throw(404, errorMessageInUpdateUser);

    ctx.status = 200;
    ctx.body = { success: true };
};
