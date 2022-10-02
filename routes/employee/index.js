const userController = require('./employee-controller');
const Router = require('express-promise-router');
const router = new Router();
// const { authenticate } = require('../../middlewares/authentication');

router.get('/me', userController.getMe);
router.get('/', userController.getAll);
router.post('/', userController.create);
router.patch('/:employeeId', userController.update);
router.get('/:employeeId', userController.getById);
router.delete('/:employeeId', userController.deleteEmployee);
router.post('/login/admin', userController.login);

module.exports = router;
