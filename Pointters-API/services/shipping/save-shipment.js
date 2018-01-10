const client = require('./client');
const camelcasify = require('./camelcasify');
const snakify = require('./snakify');
module.exports = async(_shipment) => {
    try {
        const shipment = Object.assign({}, snakify(_shipment));
        console.log('shipment ', shipment);
        if (!shipment) return await Promise.reject(new Error('addres no given'));
        if (shipment.to_address.external_id)shipment.to_address.id = shipment.to_address.external_id;
        if (shipment.from_address.external_id) shipment.from_address.id = shipment.from_address.external_id;
        delete shipment.to_address.external_id;
        delete shipment.from_address.external_id;
        const toAddress = new client.Address(shipment.to_address);
        const fromAddress = new client.Address(shipment.from_address);
        const parcel = new client.Parcel(shipment.parcel);
        delete shipment.to_address;
        delete shipment.from_address;
        delete shipment.parcel;
        const customsInfo = new client.CustomsInfo(shipment);
        const fromAddressSaved = await toAddress.save();
        const toAddressSaved = await fromAddress.save();
        const parcelSaved = await parcel.save();
        const customInfoSaved = await customsInfo.save();
        const shipmentSaved = await new client.Shipment({
            to_address: fromAddressSaved,
            from_address: toAddressSaved,
            parcel: parcelSaved,
            customs_info: customInfoSaved
        }).save();
        console.log('shipmentSaved ', shipmentSaved);
        shipmentSaved.externalId = shipmentSaved.id;
        delete shipmentSaved.id;
        return camelcasify(shipmentSaved);
    } catch (error) {
        console.log('error', error);
        return {error};
    }
};
