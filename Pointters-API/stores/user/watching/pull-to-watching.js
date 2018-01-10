const catchingErrorFromPromise = require('../../../lib/catching-error-from-promise');
const { isArray } = Array;

module.exports = (client) => (query, _watching) => {
    try {
        const watching = isArray(_watching) ? _watching : [ _watching ];
        const update = {
            $pull: {
                watching: { $in: watching }
            }
        };
        return catchingErrorFromPromise(client.findOneAndUpdate(query, update).exec());
    } catch (error) {
        return {error};
    }
};
