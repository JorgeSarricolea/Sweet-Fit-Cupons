const express = require("express");
const router = express.Router();

// Controllers
const sessionController = require("../controllers/sessions");

// Routes
router.post("/register/", sessionController.register);
// router.get("/login:id", roleController.login);

module.exports = router;
