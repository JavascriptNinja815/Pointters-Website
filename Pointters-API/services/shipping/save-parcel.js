const client = require('./client');
const snakify = require('./snakify');
const camelcasify = require('./camelcasify');
module.exports = async(parcel) => {
    if (!parcel) return await Promise.reject(new Error('addres no given'));
    const parcelSnakify = snakify(parcel);
    console.log('parcelSnakify  ', parcelSnakify);
    const parcelSaved = await new client.Parcel(parcelSnakify).save()
        .catch((error) => ({error}));
    console.log('parcelSaved  ', parcelSaved);
    return camelcasify(parcelSaved);
};
