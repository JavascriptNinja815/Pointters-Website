const createCandidateAsync = require('./create-report-async');


module.exports = async(ctx) => {
    console.log('antes del createCandidateAsync');
    await createCandidateAsync(ctx.request.body, ctx.state);
    console.log('despues del createCandidateAsync');
    ctx.body = { success: true };
};
