const express = require("express");
const router = express.Router();

// Controllers
const usersCuponsController = require("../controllers/usersCupons");

// Routes
router.get("/users-cupons", usersCuponsController.getAllUserCupons);
router.get(
  "/users-cupons/:userCuponId",
  usersCuponsController.getUserCuponById
);
router.post("/users-cupons", usersCuponsController.assignCuponToUser);
router.put("/users-cupons/:userCuponId", usersCuponsController.updateUserCupon);
router.delete(
  "/users-cupons/:userCuponId",
  usersCuponsController.deleteUserCupon
);

module.exports = router;
