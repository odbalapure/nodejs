const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main");

const authenticationMiddleware = require("../middleware/auth");

// Before accessing dashboard we have to go through the auth middleware
router.route("/dashboard").get(authenticationMiddleware, dashboard);
router.route("/login").post(login);

module.exports = router;
