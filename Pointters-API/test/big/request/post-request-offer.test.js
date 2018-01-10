const assert = require('assert');

const { create: createService } = require('../../../stores/request');
const { findOne: findOneOffer } = require('../../../stores/request-offer');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/request/offer POST sohuld create a request given', async() => {
            const request = {
                userId: require('mongoose').Types.ObjectId(),
                category:{
                    type: Object
                },
                location:{
                    type: Object
                },
                minPrice:1,
                maxPrice:1,
                scheduleDate:new Date().toString()
            };
            const requestCreated = await createService(request);
            const body = {
                fulfillmentMethod:{},
                location:{},
                media:{},
                price:{},
                requestId:requestCreated._id,
                workDuration:{},
                workDurationUom:'hour'
            };

            const { body: res } = await agent
                .post(`/request/${requestCreated._id}/offer`)
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.equal(res.success, true);
            assert(res.offer);
            const offer = await findOneOffer({ requestId: requestCreated._id });
            assert(offer.isActive === undefined);
        });
    });

    describe('FAIL', () => {

    });
});
