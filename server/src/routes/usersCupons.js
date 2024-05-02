const express = require("express");
const router = express.Router();

// Controllers
const usersCuponsController = require("../controllers/usersCupons");

// Routes
router.get("/users-cupons", usersCuponsController.getAllUserCuponAssignments);
router.get(
  "/users-cupons/:userId/:cuponId",
  usersCuponsController.updateUserCuponAvailability
);
router.post("/users-cupons", usersCuponsController.assignCuponToUser);
router.put(
  "/users-cupons/:userId/:cuponId",
  usersCuponsController.updateUserCuponAvailability
);
router.delete(
  "/users-cupons/:userId/:cuponId",
  usersCuponsController.deleteUserCuponAssignment
);

module.exports = router;
