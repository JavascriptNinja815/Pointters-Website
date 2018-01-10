const { create: createPost } = require('../../../stores/post');

const errorMessage = 'Post does not exists';

module.exports = async(ctx) => {
    const post = await createPost(Object.assign(ctx.request.body, {userId: ctx.state.user.id}));

    if (!post || post.error) ctx.throw(404, errorMessage);
    const queryToFindComment = { _id: ctx.params.idComment };
    console.log('queryToFindComment ', queryToFindComment);

    ctx.body = {
        post: post
    };
};
