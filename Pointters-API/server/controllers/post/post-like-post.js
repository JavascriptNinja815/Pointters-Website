const { push: pushToLikes } = require('../../../stores/user/likesPost');
const { findOne: findOnePost } = require('../../../stores/post');

const errorMessage = 'Post does not exists';
module.exports = async(ctx) => {
    const post = await findOnePost({ _id: ctx.params.idPost });

    if (!post || post.error) ctx.throw(404, errorMessage);
    console.log('ctx.params.idPost ', ctx.params.idPost);
    const res = await pushToLikes(ctx.queryToFindUserById, ctx.params.idPost);
    console.log('error ', res);
    if (res.error) ctx.throw(404, res.error.message);

    ctx.body = { success: true };
};
