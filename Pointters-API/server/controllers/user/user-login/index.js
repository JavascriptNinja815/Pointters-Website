const { findOne } = require('../../../../stores/user');

const emailResponseController = require('./email-reponse-controller');

module.exports = async(ctx) => {
    const user = await findOne({ email: ctx.request.body.email });
    await emailResponseController(user, ctx.request.body.password, ctx);
};
