const catchingErrorFromPromise = require('../../../lib/catching-error-from-promise');

const { isArray } = Array;

module.exports = (client) => (query, _likesPost) => {
    try {
        const likesPost = isArray(_likesPost) ? _likesPost : [ _likesPost ];
        const update = {
            $pull: {
                likesPost: { $in: likesPost }
            }
        };
        return catchingErrorFromPromise(client.findOneAndUpdate(query, update).exec());
    } catch (error) {
        return {error};
    }
};
