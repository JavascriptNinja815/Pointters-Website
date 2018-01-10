module.exports = {
    postShipment: require('./shipment-post'),
    postShipmentToAddress: require('./shipment-to-address-post'),
    deleteShipmentToAddress: require('./shipment-to-address-delete'),
    putShipmentToAddress: require('./shipment-to-address-put'),
    getShipmentToAddress: require('./shipment-to-address-get'),
    postShipmentParcel: require('./shipment-parcel-post'),
    deleteShipmentParcel: require('./shipment-parcel-delete'),
    putShipmentParcel: require('./shipment-parcel-put'),
    getShipmentParcel: require('./shipment-parcel-get'),
    getShipment: require('./shipment-get'),
    deleteShipment: require('./shipment-delete'),
    putShipment: require('./shipment-put'),
    postBuyShipment: require('./shipment-buy-post'),
    getShipmentLabel:require('./shipment-label-get'),
    getShipmentRates:require('./shipment-rates-get')
};
