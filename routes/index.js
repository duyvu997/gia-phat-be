const Router = require("express-promise-router");
const router = new Router();
const userRoutes = require("./user");

router.use("/user", userRoutes);


module.exports = () => router;