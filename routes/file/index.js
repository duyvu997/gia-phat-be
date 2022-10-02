const fileController = require('./file-controller');
const Router = require('express-promise-router');
const router = new Router();
const { authenticate } = require('../../middlewares/authentication');

router.post('/uploads', authenticate, fileController.upload);

module.exports = router;
