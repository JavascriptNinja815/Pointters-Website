const { create: createRequest } = require('../../../stores/request');

const errorMessage = 'Request does not exists';

module.exports = async(ctx) => {
    const request = await createRequest(Object.assign(ctx.request.body, {userId: ctx.state.user.id}));

    if (!request || request.error) ctx.throw(404, errorMessage);
    const queryToFindOffer = { _id: ctx.params.idOffer };
    console.log('queryToFindOffer ', queryToFindOffer);

    ctx.body = {
        request: request
    };
};
