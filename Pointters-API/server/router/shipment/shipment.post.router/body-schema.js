const joi = require('joi');

const item = {
    description: joi.string().required(),
    quantity: joi.number().required(),
    weight: joi.number().required(),
    value: joi.number().required(),
    hsTariffNumber: joi.string(),
    originCountry: joi.string()
};
const parcel = {
    length: joi.number().required(),
    width: joi.number().required(),
    height: joi.number().required(),
    weight: joi.number().required(),
};

const address = joi.object().keys({
    street1	:joi.string().required(),
    street2	:joi.string().required(),
    city	:joi.string().required(),
    state	:joi.string().required(),
    zip	:joi.string().required(),
    country	:joi.string().required(),
    residential	:joi.boolean(),
    carrierFacility	:joi.string(),
    name	:joi.string(),
    company	:joi.string(),
    phone	:joi.string(),
    email	:joi.string(),
    federalTaxId	:joi.string(),
    stateTaxId	:joi.string(),
    verify	:joi.string(),
    verifyStrict:joi.string()
});

module.exports = joi.object().keys({
    customsCertify	: joi.boolean(),
    customsSigner: joi.string().required(),
    contentsType: joi.string().required(),
    restrictionType: joi.string().required(),
    eelPfc: joi.string().required(),
    customsItems:joi.array().items(item),
    toAddress: address,
    fromAddress: address,
    parcel: joi.object().keys(parcel)
});


