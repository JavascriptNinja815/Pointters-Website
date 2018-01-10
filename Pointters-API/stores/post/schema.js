const {schema: media} = require('./sub-schema/media');
const {Schema} = require('mongoose');

module.exports = {
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    isActive: {
        type: Boolean,
        default: true
    },
    message: String,
    media: [ media ],
    tags: [ String ],
    updatedAt:{
        type: Date,
        default: new Date()
    }
};
