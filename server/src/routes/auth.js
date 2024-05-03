const express = require("express");
const router = express.Router();

// Controllers
const authController = require("../controllers/auth");

// Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/register-email-only", authController.registerWithEmailOnly);
router.post("/verify-token", authController.verifyToken);

module.exports = router;
