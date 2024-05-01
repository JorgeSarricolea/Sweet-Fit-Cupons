const express = require("express");
const router = express.Router();

// Controllers
const userController = require("../controllers/users.controller");

// Routes
router.get("/users", userController.getUsers); // Obtener todos los usuarios
router.get("/users/:id", userController.getUserById); // Obtener un usuario por ID
router.post("/users", userController.createUser); // Crear un nuevo usuario

module.exports = router;
