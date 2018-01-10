const { findOne } = require('../../../stores/user');
const { pull } = require('../../../stores/user/following');
const checkIfIsValidId = require('../../lib/is-valid-id');
const userNoValidMessage = 'User to follow no valid';
const idInvalidMessage = 'Id is not Valid';

module.exports = async(ctx) => {
    const isValidId = await checkIfIsValidId(ctx.params.followedId);
    if (!isValidId) return ctx.throw(404, idInvalidMessage);

    const userToUnfollow = await findOne({ _id: ctx.params.followedId });

    if (!userToUnfollow || userToUnfollow.error) return ctx.throw(200, userNoValidMessage);

    ctx.body = {
        success: true
    };
    const { error } = await pull(ctx.queryToFindUserById, userToUnfollow._id);

    if (error) ctx.throw(404, error.message);
};
