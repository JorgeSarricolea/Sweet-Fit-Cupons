const express = require("express");
const router = express.Router();

// Controllers
const userController = require("../controllers/roles.controller");

// Routes
router.get("/roles", userController.getRoles);
router.get("/roles/:id", userController.getRoleById);
router.post("/roles", userController.createRole);

module.exports = router;
