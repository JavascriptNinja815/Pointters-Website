const { getCheckr } = require('../../../controllers/checkr');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/checkr/:idCheckr', validate({ body, params }), getCheckr);

module.exports = router.routes();
