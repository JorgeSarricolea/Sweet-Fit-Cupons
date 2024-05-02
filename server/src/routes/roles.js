const express = require("express");
const router = express.Router();

// Controllers
const roleController = require("../controllers/roles");

// Routes
router.get("/roles", roleController.getRoles);
router.get("/roles/:id", roleController.getRoleById);
router.post("/roles", roleController.createRole);
router.put("/roles/:id", roleController.updateRole);
router.delete("/roles/:id", roleController.deleteRole);

module.exports = router;
