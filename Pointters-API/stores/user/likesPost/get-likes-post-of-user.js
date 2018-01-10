const catchingErrorFromPromise = require('../../../lib/catching-error-from-promise');

module.exports = (client) => (query) => {
    try {
        return catchingErrorFromPromise(
            client.findOne(query, {likesPost:1}).exec()
                .then((_res) => {
                    if (!_res) return _res;
                    return _res.toObject().likesPost || [];
                })
        );
    } catch (error) {
        return {error};
    }
};
