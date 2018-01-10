const catchingErrorFromPromise = require('../../../lib/catching-error-from-promise');
const updateTempPassword = require('./updateTemp-password');
const updatePass = require('./update-pass');

module.exports = (client) => async(query = {}, _data = {}, options = {new:true}) => {
    const data = Object.assign({}, _data);
    try {
        if (data.tempPassword) await updateTempPassword(data);
        if (data.password) await updatePass(data);
        return catchingErrorFromPromise(client.update(query, { $set: data }, options).exec());
    } catch (error) {
        return {error};
    }
};


