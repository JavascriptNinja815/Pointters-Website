const joi = require('joi');

const location = require('./location');
const item = require('./item');
const milestoneStatus = require('./milestone-status');
const media = require('./media');
const price = require('./price');
const fulfillmentMethod = require('./fulfillement-method');


module.exports = joi.object().keys({
    buyerId: joi.string(),
    buyerOrderDispute: joi.object(),
    buyerServiceLocation: joi.array().items(location),
    cancellationDate: joi.date(),
    category: joi.object(),
    description: joi.string(),
    fulfillmentMethod: fulfillmentMethod,
    geofence: joi.array(),
    onTime: joi.number().valid([ 0, 1 ]),
    orderAcceptanceDate: joi.date(),
    orderItems: joi.array().items(item),
    orderMilestoneStatuses: milestoneStatus,
    paymentDate: joi.date(),
    paymentMethod: joi.object(),
    servicesPrices: joi.array().items(price),
    transactionFee: joi.number(),
    transactionDate: joi.date(),
    sellerAcceptedScheduleTime: joi.bool().default(false),
    sellerAcceptedBuyerServiceLocation: joi.bool().default(false),
    sellerDeliveredMedia: joi.array().items(media),
    sellerId: joi.string(),
    sellerServiceLocation: joi.array().items(location),
    serviceScheduleDate: joi.date(),
    serviceStartDate: joi.date(),
    serviceCompleteDate: joi.date(),
    shippingInfo: joi.object(),
    taxes: joi.object()
});
