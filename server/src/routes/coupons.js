const express = require("express");
const router = express.Router();

// Controllers
const couponController = require("../controllers/coupons");

// Routes
router.get("/coupons", couponController.getCoupons);
router.get("/coupons/:id", couponController.getCouponById);
router.post("/coupons", couponController.createCoupon);
router.put("/coupons/:id", couponController.updateCoupon);
router.delete("/coupons/:id", couponController.deleteCoupon);

module.exports = router;
