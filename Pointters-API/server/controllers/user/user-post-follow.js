const { findOne } = require('../../../stores/user');
const { create } = require('../../../stores/following');
const isValidId = require('../../lib/is-valid-id');
const userNotValidMessage = 'User to follow no valid';
const idInvalidMessage = 'Id is not Valid';
module.exports = async(ctx) => {
    const validId = await isValidId(ctx.params.followedId);

    if (!validId) return ctx.throw(404, idInvalidMessage);

    const userToAddFollowing = ctx.queryToFindUserById;
    const userToFollow = await findOne({ _id: ctx.params.followedId });
    if (!userToFollow) return ctx.throw(404, userNotValidMessage);

    const following = await create({ followTo: ctx.params.followedId, followFrom: ctx.session.id });

    if (!following || following.error) ctx.throw(404, "Create Error");

    ctx.body = { success: true, following };
};
