const catchingErrorFromPromise = require('../../../lib/catching-error-from-promise');
const { isArray } = Array;

module.exports = (client) => (query, _following) => {
    try {
        const following = isArray(_following) ? _following : [ _following ];
        const update = {
            $pull: {
                following: { $in: following }
            }
        };
        return catchingErrorFromPromise(client.findOneAndUpdate(query, update).exec());
    } catch (error) {
        return {error};
    }
};
