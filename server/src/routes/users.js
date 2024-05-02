const express = require("express");
const router = express.Router();

// Controllers
const userController = require("../controllers/users");

// Routes
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
