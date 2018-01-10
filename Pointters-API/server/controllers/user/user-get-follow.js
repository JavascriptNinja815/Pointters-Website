const { get } = require('../../../stores/user/following');

module.exports = async(ctx) => {
    const following = await get(ctx.queryToFindUserById);

    if (following.error) ctx.throw(404, following.error.message);

    ctx.body = {
        following: new Set(following).has(ctx.params.followedId)
    };
};
