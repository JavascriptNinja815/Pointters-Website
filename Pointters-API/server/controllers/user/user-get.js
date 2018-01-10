const { findOne } = require('../../../stores/user');
const { filterKeysOfUserByRequester } = require('../../../stores/user/privacity');

module.exports = async(ctx) => {
    const queryToGetRequester = ctx.queryToFindUserById;
    console.log('ctx.request.query.userId ', ctx.request.query.userId);
    const queryToGetOtherUser = {
        _id: ctx.request.query.userId || ctx.queryToFindUserById._id
    };
    console.log('queryToGetOtherUser  ', queryToGetOtherUser);
    const requester = await findOne(queryToGetRequester);
    console.log('requester  ', requester);

    if (!requester || requester.error) ctx.throw(404, 'Requester not found');

    if (!ctx.request.query.userId || ctx.request.query.userId === ctx.state.user.id) {
        delete requester.password;
        ctx.body = { user: requester };
        return;
    }
    const otherUser = await findOne(queryToGetOtherUser);
    console.log('otherUser  ', otherUser);

    if (!otherUser || otherUser.error) ctx.throw(404, 'User not found');

    const userFilter = filterKeysOfUserByRequester(otherUser, requester);
    ctx.body = { user: userFilter };
};
