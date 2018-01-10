const joi = require('joi');

const item = {
    description: joi.string(),
    quantity: joi.number(),
    weight: joi.number(),
    value: joi.number(),
    hsTariffNumber: joi.string(),
    originCountry: joi.string()
};
const parcel = {
    length: joi.number(),
    width: joi.number(),
    height: joi.number(),
    weight: joi.number(),
};

const address = joi.object().keys({
    object:	joi.string(),
    mode	:joi.string(),
    street1	:joi.string(),
    street2	:joi.string(),
    city	:joi.string(),
    state	:joi.string(),
    zip	:joi.string(),
    country	:joi.string(),
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
    cutomsSigner: joi.string(),
    contentsType: joi.string(),
    restrictionType: joi.string(),
    eelPfc: joi.string(),
    customsItems:joi.array().items(item),
    toAddress: address,
    fromAddress: address,
    parcel: joi.object().keys(parcel)
});


