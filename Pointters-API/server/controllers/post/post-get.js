const { findOne: findOnePost } = require('../../../stores/post');

const errorMessage = 'Post does not exists';

module.exports = async(ctx) => {
    console.log('ctx.params.idPost', ctx.params.idPost);
    const post = await findOnePost({ _id: ctx.params.idPost });

    if (!post || post.error) ctx.throw(404, errorMessage);
    const queryToFindpost = { _id: ctx.params.idpost };
    console.log('queryToFindpost ', queryToFindpost);

    ctx.body = {
        post: post
    };
};
