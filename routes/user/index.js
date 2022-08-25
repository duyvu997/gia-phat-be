const userController = require('./user-controller');
const Router = require('express-promise-router');
const router = new Router();
const { authenticate } = require('../../middlewares/authentication');

router.get('/me', authenticate, userController.getMe);
router.get('/', userController.getAll);
router.post('/login/admin', userController.login);

module.exports = router;
