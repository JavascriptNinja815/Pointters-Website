const joi = require('joi');

module.exports = joi.object().keys({
    orderId:joi.string().required(),
    comment: joi.string(),
    overallRating: joi.number().min(0).max(100),
    qualityOfService: joi.number().valid([ 0, 1, 2, 3, 4, 5 ]),
    willingToBuyServiceAgain: joi.number().valid([ 0, 1 ])
});
