const Promise = require('bluebird');
const { map } = require('lodash');
const { findOne: findOneService } = require('../../../stores/service');
const { findOne: findOneUser } = require('../../../stores/user');
const { numOrders } = require('../../../stores/order');
const { avgRating } = require('../../../stores/service-review');

const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
    const queryToFindService = ( { _id: ctx.params.idService })
    console.log(queryToFindService);
    const service = await findOneService(queryToFindService);
    let result = {};
    result.seller = {};
    result.service = {};

    if (!service || service.error) ctx.throw(404, errorMessage);

    result.service.id = service._id;
    result.service.description = service.description;
    result.service.fulfillmentMethod = service.fulfillmentMethod;
    result.service.location = service.location;
    result.service.media = service.media;
    result.service.prices = service.prices;
    result.service.promoted = service.promoted;
    result.seller.userId = service.userId;
    const user = await findOneUser({ _id: service.userId });
    if(user)
    {
        result.seller.companyName = user.companyName;
        result.seller.firstName = user.firstName;
        result.seller.lastName = user.lastName;
        result.seller.phone = user.phone;
        result.seller.profilePic = user.profilePic;
        result.seller.verified = user.verified;
    }
    result.service.numOrders = await numOrders({ serviceId: service._id });
    result.service.avgRating = await avgRating({ serviceId: service._id });
    ctx.status = 200;
    ctx.body = { result };
};