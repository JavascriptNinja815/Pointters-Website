const { create: createWatch } = require('../../../stores/watch');
const { findOne: findOneWatch } = require('../../../stores/watch');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Service does not exists';
module.exports = async(ctx) => {
    console.log(' ctx.params.idService', ctx.params.idService);
    const service = await findOneService({ _id: ctx.params.idService });

    if (!service || service.error) ctx.throw(404, errorMessage);

    const watch = await findOneWatch({ userId: ctx.session.id, serviceId: ctx.params.idService });

    if (watch) ctx.throw(404, 'watch does already exists');

    const watchCreate = await createWatch( { userId: ctx.session.id, serviceId: ctx.params.idService } );

    if (watchCreate)
    	ctx.body = { success: true };
    else
    	ctx.body = { success: false };
};
