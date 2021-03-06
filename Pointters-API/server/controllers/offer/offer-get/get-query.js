module.exports = (ctx) => {
    const query = {userId: ctx.state.user.id};

    if (ctx.params.idOffer) query._id = ctx.params.idOffer;
    if (ctx.query.id_gt) query._id = {$gt: ctx.query.id_gt};

    return query;
};
