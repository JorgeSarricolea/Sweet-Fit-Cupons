const express = require("express");
const router = express.Router();

// Controllers
const usersCouponsController = require("../controllers/usersCoupons");

// Routes
router.get("/users-coupons", usersCouponsController.getAllUserCoupons);
router.get("/users-coupons/:id", usersCouponsController.getUserCouponById);
router.put("/users-coupons/:id", usersCouponsController.updateUserCoupon);
router.delete("/users-coupons/:id", usersCouponsController.deleteUserCoupon);

module.exports = router;
