//Imports
const router = require("express").Router();
const aRoutes = require("./api");
const homeRoute = require("./home-route");
const dashboardRoute = require("./dashboard-route");

router.use("/api", aRoutes);
router.use("/", homeRoute);
router.use("/dashboard", dashboardRoute);

module.exports = router;
