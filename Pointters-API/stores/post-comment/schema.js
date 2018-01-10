const {Schema} = require('mongoose');

module.exports = {
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'post'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    updatedAt:{
        type: Date,
        default: new Date()
    },
    comment: String,
    createdAt:{
        type: Date,
        default: new Date(),
    }
};
