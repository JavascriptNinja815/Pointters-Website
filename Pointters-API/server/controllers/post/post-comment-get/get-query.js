module.exports = (ctx) => {
    const query = {};

    if (ctx.params.idPost) query.postId = ctx.params.idPost;
    if (!ctx.params.idPost) query.userId = ctx.state.user.id;
    if (ctx.params.idComment) query._id = ctx.params.idComment;
    if (ctx.query.id_gt) query._id = {$gt: ctx.query.id_gt};

    return query;
};
