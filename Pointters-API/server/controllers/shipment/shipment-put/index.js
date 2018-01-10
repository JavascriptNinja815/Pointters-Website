const { update: updateShipment } = require('../../../../stores/shipment');
const getQuery = require('./get_query');
const getUpdate = require('./get-update');
module.exports = async (ctx) => {
    const query = getQuery(ctx);
    console.log('query', query);
    const update = getUpdate(ctx);
    const shipment = await updateShipment(query, update);
    console.log('shipment ', shipment);
    if (!shipment || shipment.error) ctx.throw(404);

    ctx.body = { success: true };
};
