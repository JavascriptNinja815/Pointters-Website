const { findOne } = require('../../../stores/like');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Service does not exists';
const errorInGetWatching = 'Error in get to watching';

module.exports = async(ctx) => {
	console.log('ctx.params.idService', ctx.params.idService);
    const service = await findOneService({ _id: ctx.params.idService });

    if (!service || service.error) ctx.throw(404, errorMessage);

    const likes = await findOne({ userId: ctx.session.id, serviceId: ctx.params.idService });

    if (!likes || likes.error) ctx.throw(404, "like does not exists");

    ctx.body = likes;
};
