const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post("/auth/register", UserController.user_registration);

router.post("/auth/login", UserController.user_login);

router.get("/profile", checkAuth, UserController.user_profile);

module.exports = router;
