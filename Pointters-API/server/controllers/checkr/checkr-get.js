const { findOne: findOneCheckr } = require('../../../stores/background-report');

const errorInGetWatching = 'Error in get to request-checkr';
const checkrDoesNotExists = 'Error in get to request-checkr';

module.exports = async (ctx) => {
    const queryToFindCheckr = { _id: ctx.params.idCheckr };
    console.log('queryToFindCheckr ', queryToFindCheckr);
    const checkr = await findOneCheckr(queryToFindCheckr);
    console.log('checkr ', checkr);

    if (!checkr) ctx.throw(403, checkrDoesNotExists);

    if (checkr.error) ctx.throw(404, errorInGetWatching);

    ctx.body = { checkr };
};
