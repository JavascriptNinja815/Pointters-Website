const { get: getToLikes } = require('../../../stores/user/likesPost');
const { findOne: findOnePost } = require('../../../stores/post');

const errorMessage = 'Post does not exists';
module.exports = async(ctx) => {
    const post = await findOnePost({ _id: ctx.params.idPost });

    if (!post || post.error) ctx.throw(404, errorMessage);
    console.log('ctx.params.idPost ', ctx.params.idPost);
    const res = await getToLikes(ctx.queryToFindUserById);
    console.log('error ', res);
    if (res.error) ctx.throw(404, res.error.message);

    ctx.body = { likesPost: new Set(res).has(ctx.params.idPost) };
};
