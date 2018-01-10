const { delete: deleteWatch } = require('../../../stores/like');
const { findOne: findOnelike } = require('../../../stores/like');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Service does not exists';
module.exports = async (ctx) => {
    console.log('ctx.params.idService ', ctx.params.idService);
    const service = await findOneService({ _id: ctx.params.idService });

    if (!service || service.error) ctx.throw(404, errorMessage);

    const like = await findOnelike({ userId: ctx.session.id, serviceId: ctx.params.idService });

    if (!like || like.error) ctx.throw(404, "like does not exists");

    await deleteWatch({ userId: ctx.session.id, serviceId: ctx.params.idService} );

    const serviceReturn = await findOnelike( { userId: ctx.session.id, serviceId: ctx.params.idService} );

    if(serviceReturn)
    	ctx.body = { success: false };
    else
    	ctx.body = { success: true };
};