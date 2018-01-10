const { findOne: findOneService, create: createService } = require('../../../stores/service');

const errorMessage = 'Service does not exists';
const errorShareService = 'Error in share the service';
module.exports = async(ctx) => {
    console.log(' ctx.params.idService', ctx.params.idService);
    const serviceToShare = await findOneService({ _id: ctx.params.idService });

    if (!serviceToShare || serviceToShare.error) ctx.throw(404, errorMessage);

    delete serviceToShare._id;
    serviceToShare.shared = {
        originUser: serviceToShare.userId
    };
    serviceToShare.userId = ctx.state.user.id;
    const serviceShared = await createService(serviceToShare);

    if (serviceShared && serviceShared.error) ctx.throw(404, errorShareService);
    ctx.body = { service: serviceShared };
};
