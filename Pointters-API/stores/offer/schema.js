const subschemas = require('./sub-schemas');
const {Schema} = require('mongoose');

module.exports = {

    buyerId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    description: {
        type: String,
        required: true
    },
    fulfillmentMethod: subschemas.fulfillmentMethod.schema,
    isActive: {
        type: Boolean,
        default: true
    },
    location: subschemas.location.schema,
    media: [subschemas.media.schema],
    price:{
        type: Number,
        required: true
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    serviceId: {
        type: Schema.Types.ObjectId,
        ref: 'service'
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    workDuration: {
        type: Number,
        required: true
    },
    workDurationUom: {
        type: String,
        enum: [ 'hour', 'day', 'week' ],
        required: true
    },
};
