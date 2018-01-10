const { findOne } = require('../../../stores/watch');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Watch does not exists';
const errorInGetWatching = 'Error in get to watching';

module.exports = async(ctx) => {
	console.log('ctx.params.idService', ctx.params.idService);
    const service = await findOneService({ _id: ctx.params.idService });
    if (!service || service.error) ctx.throw(404, errorMessage);

    const watchs = await findOne({ userId: ctx.session.id, serviceId: ctx.params.idService });

    if (!watchs || watchs.error) ctx.throw(404, errorMessage);

    ctx.body = watchs;
};
