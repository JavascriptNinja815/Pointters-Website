const subschemas = require('./sub-schemas');
const {Schema} = require('mongoose');

module.exports = {
    createdAt:{
        type: Date,
        default: new Date()
    },
    fulfillmentMethod:subschemas.fulfillmentMethod.schema,
    isActive: {
        type: Boolean,
        default: true
    },
    location:subschemas.location.schema,
    media:[subschemas.media.schema],
    price:{
        type: Number,
        required: true
    },
    requestId:{
        type:Schema.Types.ObjectId,
        required: true
    },
    updatedAt:{
        type:Date
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    buyerId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    workDuration: {
        type: Number,
        required: true
    },
    dateLastViewedByRequester: {
        type: Date, 
        default: new Date()
    },
    workDurationUom: {
        type: String,
        enum: [ 'hour', 'day', 'week' ],
        required: true
    }
};
