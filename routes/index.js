const Router = require('express-promise-router');
const router = new Router();
const userRoutes = require('./employee');

router.use('/api/v1/employees', userRoutes);
router.use('/api/v1/projects', userRoutes);
router.use('/api/v1/admins', userRoutes);

module.exports = () => router;
