const assert = require('assert');

const { findOne, create } = require('../../../stores/post');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post PUT sohuld create a post given', async() => {
            const body = {
                userId: __user._id,
                message: 'mesage',
                media: [ {
                    fileName:'filiname',
                    mediaType:'image'
                } ],
                tags: [ 'tags_1', 'tag_2' ]
            };
            const postCreated = await create(body);
            const update = {
                message: 'mesage upddated'
            };

            await agent.put(`/post/${postCreated._id}`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOne({ _id: postCreated._id });
            assert.deepEqual(updated.message, update.message);
        });
    });

    describe('FAIL', () => {
        it('/post PUT sohuld create a post given', async() => {
            const update = {
                message: 'mesage upddated'
            };

            await agent.put('/post/1234567890qwertyuiopasdf')
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
});
