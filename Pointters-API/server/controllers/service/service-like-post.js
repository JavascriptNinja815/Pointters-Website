const { create: createLike } = require('../../../stores/like');
const { findOne: findOneLike } = require('../../../stores/like');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Service does not exists';
module.exports = async(ctx) => {
    console.log(' ctx.params.idService', ctx.params.idService);
    const service = await findOneService({ _id: ctx.params.idService });

    if (!service || service.error) ctx.throw(404, errorMessage);

    const like = await findOneLike({ userId: ctx.session.id, serviceId: ctx.params.idService });

    if (like) ctx.throw(404, 'like already does exists');

    const likeCreate = await createLike( { userId: ctx.session.id, serviceId: ctx.params.idService } );

    if (likeCreate)
    	ctx.body = { success: true };
    else
    	ctx.body = { success: false };
};