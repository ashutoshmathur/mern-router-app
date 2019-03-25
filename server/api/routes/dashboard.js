const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const DashboardController = require('../controllers/dashboard');

router.get("/", checkAuth, DashboardController.get_dashboard_data);

module.exports = router;
