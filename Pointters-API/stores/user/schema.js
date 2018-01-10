const {location:{schema:location}} = require('./sub-schema');
const {Schema} = require('mongoose');
const media = require('./sub-schema/media');

module.exports = {
    awards: {
        type: String
    },
    completedRegistration: {
        type: Boolean,
        default: false
    },
    completedRegistrationDate: Date,
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isEmail: {
        valid: {
            type: Boolean,
            default: true
        },
        bounced: {
            type: Boolean,
            default: false
        },
        spam: {
            type: Boolean,
            default: false
        },
        invalid: {
            type: Boolean,
            default: false
        },
        reason: String
    },
    companyName: {
        type: String
    },
    description: {
        type: String
    },
    education: {
        type: String
    },
    email: {
        type: String
    },
    firstName: {
        type: String
    },
    insurance: {
        type: String
    },
    lastName: {
        type: String
    },
    license: {
        type: String
    },
    location: location ,
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    profileBackgroundMedia: [media],
    profilePic: {
        type: String
    },
    resetPasswordExpires: String,
    settings: {
        generalNotifications: {
            type: String,
            description: 'generalNotifications',
            enum: [ 'pushNotification', 'email', 'all', 'none' ],
            default: 'all'
        },
        orderNotifications: {
            type: String,
            description: 'orderNotifications',
            enum: [ 'pushNotification', 'email', 'all', 'none' ],
            default: 'all'
        },
        offerNotifications: {
            type: String,
            description: 'offerNotifications',
            enum: [ 'pushNotification', 'email', 'all', 'none' ],
            default: 'all'
        },
        summaryEmail: {
            type: String,
            description: 'summaryEmail',
            enum: [ 'daily', 'weekly', 'all', 'none' ],
            default: 'all'
        },
        locationViewPermission: {
            type: String,
            description: 'locationViewPermission',
            enum: [ 'public', 'followers', 'onlyme' ],
            default: 'onlyme'
        },
        phoneViewPermission: {
            type: String,
            description: 'phoneViewPermission',
            enum: [ 'public', 'followers', 'onlyme' ],
            default: 'onlyme'
        }
    },
    socialNetwork: {
        name: String,
        id: String
    },
    tempPassword: String,
    verified: {
      type: Boolean
    },
    likes: {
        type: [ Schema.Types.Mixed ],
        default: []
    },
    following: {
        type: [ Schema.Types.Mixed ],
        default: []
    },
    watching: {
        type: [ Schema.Types.Mixed ],
        default: []
    },
    likesPost: {
        type: [ Schema.Types.Mixed ],
        default: []
    },

};
