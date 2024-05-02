const express = require("express");
const router = express.Router();

// Controllers
const cuponController = require("../controllers/cupons");

// Routes
router.get("/cupons", cuponController.getCupons);
router.get("/cupons/:id", cuponController.getCuponById);
router.post("/cupons", cuponController.createCupon);
router.put("/cupons/:id", cuponController.updateCupon);
router.delete("/cupons/:id", cuponController.deleteCupon);

module.exports = router;
