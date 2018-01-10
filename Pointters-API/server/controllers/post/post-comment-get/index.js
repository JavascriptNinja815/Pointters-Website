const { find: findComment, count } = require('../../../../stores/post-comment');
const {pagination:{postComments:limit}} = require('../../../../config');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');

module.exports = async (ctx) => {
    const query = getQuery(ctx);
    console.log('query, {limit}', query, {limit});
    const postComments = await findComment(query, {limit});

    console.log('comments ', postComments);
    if (!postComments || !postComments.length || postComments.error) ctx.throw(404);
    if (ctx.params.idComment) {
        ctx.body = {
            comment: postComments[0]
        };
        return;
    }
    ctx.body = {comments:postComments};
    const lastOne = postComments[postComments.length - 1];
    const remaining = await count({_id:{$gt: ObjectId(lastOne._id)}});
    if (remaining) ctx.body.next = `${ctx.url}?id_gt=${lastOne._id}`;
};
