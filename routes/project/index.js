const projectController = require('./project-controller');
const Router = require('express-promise-router');
const router = new Router();
// const { authenticate } = require('../../middlewares/authentication');

router.get('/', projectController.getAll);
router.get('/:projectId', projectController.getById);
router.post('/', projectController.create);
router.patch('/:projectId', projectController.update);

module.exports = router;
