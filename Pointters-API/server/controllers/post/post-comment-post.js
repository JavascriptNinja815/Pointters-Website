const { create: createComment } = require('../../../stores/post-comment');
const { findOne: findOnePost } = require('../../../stores/post');

const errorMessage = 'Post does not exists';
module.exports = async(ctx) => {
    console.log(' ctx.params.idPost', ctx.params.idPost);
    const post = await findOnePost({ _id: ctx.params.idPost });

    if (!post || post.error) ctx.throw(404, errorMessage);

    const commentToCreate = Object.assign({
        userId: ctx.state.user.id,
        postId: ctx.params.idPost
    },
    ctx.request.body
    );
    const comment = await createComment(commentToCreate);

    if (comment.error) ctx.throw(404, comment.error.message);

    ctx.body = { success: true, comment};
};
