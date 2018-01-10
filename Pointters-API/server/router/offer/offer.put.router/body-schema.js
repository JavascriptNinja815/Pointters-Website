const joi = require('joi');

const workDurationUom = [ 'hour', 'day', 'week' ];


module.exports = joi.object().keys({
  buyerId: joi.string().required(),
  description: joi.string().required(),      
  fulfillmentMethod: joi.object().keys({
      local: joi.boolean(),
      online: joi.boolean(),
      shipment: joi.boolean(),
      store: joi.boolean(),
      localServiceRadius: joi.number(),
      localServiceRadiusUom: joi.string()
  }),
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
  }),
  media: joi.array().items(joi.object().keys({
      fileName: joi.string(),
      mediaType: joi.string().valid([ 'image', 'video','document' ])
  })),
  price: joi.number(),
  sellerId: joi.string().required(),
  serviceId: joi.string(),
  workDuration: joi.number().required(),
  workDurationUom: joi.string().valid([ 'hour', 'day', 'week' ]).required()
});
