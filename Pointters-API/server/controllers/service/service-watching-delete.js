const { delete: deleteWatch } = require('../../../stores/watch');
const { findOne: findOneWatch } = require('../../../stores/watch');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Service does not exists';
module.exports = async (ctx) => {
    console.log('ctx.params.idService ', ctx.params.idService);
    const service = await findOneService({ _id: ctx.params.idService });

    if (!service || service.error) ctx.throw(404, errorMessage);

    const watch = await findOneWatch({ userId: ctx.session.id, serviceId: ctx.params.idService });

    if (!watch || watch.error) ctx.throw(404, "watch does not exists");

    await deleteWatch({ userId: ctx.session.id, serviceId: ctx.params.idService} );

    const watchReturn = await findOneService( { userId: ctx.session.id, serviceId: ctx.params.idService} );

    if(watchReturn)
    	ctx.body = { success: false };
    else
    	ctx.body = { success: true };
};
