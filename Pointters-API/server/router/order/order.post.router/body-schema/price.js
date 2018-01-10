const joi = require('joi');

const timeUnitOfMeasure = [ 'hour', 'day', 'week' ];
module.exports = joi.object().keys({

    description: joi.string().required(),
    location: joi.object().required(),
    price: joi.number().required(),
    time: joi.number().required(),
    timeUnitOfMeasure: joi.string().required().valid(timeUnitOfMeasure)
});


