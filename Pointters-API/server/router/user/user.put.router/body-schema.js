const joi = require('joi');


module.exports = joi.object().keys({
    awards: joi.string(),
    companyName: joi.string(),
    description: joi.string(),
    education: joi.string(),
    email: joi.string(),
    password: joi.string(),
    firstName: joi.string(),
    insurance: joi.string(),
    lastName: joi.string(),
    license: joi.string(),
    location: joi.object().keys({
        city: joi.string(),
        country: joi.string(),
        geoJson: joi.object().keys({
            type: joi.string().required(),
            coordinates: joi.array().items(joi.number()).length(2).required()
        }),
        postalCode: joi.string(),
        province: joi.string(),
        state: joi.string()
    }).default({}),
    phone: joi.string(),
    profilePic: joi.string(),
    profileBackgroundMedia: joi.array().items(joi.object().keys({
        fileName: joi.string(),
        mediaType: joi.string().valid([ 'image', 'video' ])
    }))
});
