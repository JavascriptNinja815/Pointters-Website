const { postCheckr } = require('../../../controllers/checkr');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.post('/checkr', validate({ body, params }), postCheckr);

module.exports = router.routes();
