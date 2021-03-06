const joi = require('joi');

const mediaType = [ 'image', 'video' ];

module.exports = joi.object().keys({
    message: joi.string().required(),
    media: joi.array().items(joi.object().keys({
        fileName:joi.string(),
        mediaType: joi.string().valid(mediaType)
    })),
    tags: joi.array().items(joi.string().required())
});
