const joi = require('joi');


module.exports = joi.object().keys({
    idOffer: joi.string(),
    idRequest: joi.string()
});
