const subschemas = require('./sub-schema');
const {Schema} = require('mongoose');
module.exports = {
    createdAt: {
        type: Date,
        default: new Date()
    },
    buyerId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    serviceId: {
        type: Schema.Types.ObjectId
    },
    buyerOrderDispute: Object,
    buyerServiceLocation: [ subschemas.location.schema ],
    cancellationDate: Date,
    category: {
        type: Object,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fulfillmentMethod: subschemas.fulfillmentMethod.schema,
    geofence: Array,
    isActive: {
        type: Boolean,
        default: true
    },
    onTime: {
        type: Number,
        enum: [ 0, 1 ]
    },
    orderAcceptanceDate: Date,
    orderItems: [ subschemas.item.schema ],
    orderMilestoneStatuses: subschemas.milestoneStatus.schema,
    paymentDate: Date,
    paymentMethod: {
        type: Object,
        required: true
    },
    transactionFee: Number,
    transactionDate: Date,
    sellerAcceptedScheduleTime: Boolean,
    sellerAcceptedBuyerServiceLocation: Boolean,
    sellerDeliveredMedia: [ subschemas.media.schema ],
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    sellerServiceLocation: [ subschemas.location.schema ],
    serviceId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'service'
    },
    servicesPrices: [ subschemas.price.schema ],
    serviceCompleteDate: Date,
    serviceScheduleDate: Date,
    serviceStartDate: Date,
    shippingInfo: Object,
    taxes: Object,
    updatedAt: {
        type: Date,
        default: new Date()
    },
};
