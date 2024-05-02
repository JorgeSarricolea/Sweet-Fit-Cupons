const express = require("express");
const router = express.Router();

// Controllers
const sessionController = require("../controllers/sessions");

// Routes
router.post("/register", sessionController.register);
router.post("/login", sessionController.login);

module.exports = router;
