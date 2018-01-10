const subschemas = require('./sub-schemas');
const {Schema} = require('mongoose');

module.exports = {

    category: {
        type: {},
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    fulfillmentMethod: subschemas.fulfillmentMethod.schema,
    geofence: {
        type: Array
    },
    location: [ subschemas.location.schema ],
    media: [ subschemas.media.schema ],
    prices: [ subschemas.price.schema ],
    promoted: {
      type: Boolean
    },    
    shared: {
        originUser: {
            type: String,
            ref: 'user'
        }
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    userId: {
        type:Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    }
};
