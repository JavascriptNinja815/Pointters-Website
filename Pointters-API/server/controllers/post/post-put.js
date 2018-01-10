const { update: updatePost } = require('../../../stores/post');

const errorMessage = 'Post does not exists';

module.exports = async(ctx) => {
    const {error} = await updatePost({_id: ctx.params.idPost}, ctx.request.body);

    if (error) ctx.throw(404, errorMessage);

    ctx.body = {
        success: true
    };
};
