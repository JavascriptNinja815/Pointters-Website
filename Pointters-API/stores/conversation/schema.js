const {Schema} = require('mongoose');

module.exports = {
    users: {
        type: Array
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
};


