const { find: findShipment, count } = require('../../../../stores/shipment');
const {pagination:{shipments:limit}} = require('../../../../config');
const {Types:{ObjectId}} = require('../../../../databases/mongo');
const getQuery = require('./get-query');

const errorInGetWatching = 'Error in get to shipment-shipment';
module.exports = async (ctx) => {
    const query = getQuery(ctx);
    console.log('query = ', query);
    const shipments = await findShipment(query, {limit});
    if (!shipments || !shipments.length || !shipments.length || shipments.error) ctx.throw(404, errorInGetWatching);

    if (ctx.params.idShipment) {
        ctx.body = {
            shipment: shipments[0]
        };
        return;
    }
    ctx.body = {shipments};
    console.log('ctx.body para regresar = ', ctx.body);
    const lastOne = shipments[shipments.length - 1];
    const remaining = await count({_id:{$gt: ObjectId(lastOne._id)}});
    console.log();
    if (remaining) ctx.body.next = `${ctx.url}?id_gt=${lastOne._id}`;
};
