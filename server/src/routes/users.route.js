const express = require("express");
const router = express.Router();

// Controllers
const userController = require("../controllers/users.controller");

// Routes
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);

module.exports = router;
