const assert = require('assert');

const { findOne: findOneOrder } = require('../../../../stores/order');
const getOrder = require('./get_order');

const order = getOrder();

describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/order POST sohuld create a request given', async() => {
            const { body: res } = await agent
                .post('/order')
                .send(order)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res, { success: true });
            const orderCreated = await findOneOrder({ buyerId: order.buyerId });
            assert(orderCreated.isActive === undefined);
        });
    });

    describe('FAIL', () => {

    });
});
