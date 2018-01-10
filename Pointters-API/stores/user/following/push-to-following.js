const catchingErrorFromPromise = require('../../../lib/catching-error-from-promise');
const { isArray } = Array;

module.exports = (client) => (query, _following) => {
    try {
        const following = isArray(_following) ? _following : [ _following ];
        const update = {
            $addToSet: {
                following: {
                    $each: following
                }
            }
        };
        return catchingErrorFromPromise(client.findOneAndUpdate(query, update).exec());
    } catch (error) {
        return {error};
    }
};

