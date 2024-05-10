const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");

// Get all cupons
const getCoupons = async (req, res) => {
  try {
    const coupons = await prisma.coupons.findMany();
    console.log("\nList of coupons:\n", coupons);
    res.json(coupons);
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res.status(500).json({ error: "Error fetching coupons" });
  }
};

// Get a cupon by its ID
const getCouponById = async (req, res) => {
  const couponId = req.params.id;

  try {
    const coupon = await prisma.coupons.findUnique({
      where: {
        id: couponId,
      },
    });

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    console.log("\nCoupon ID: ", coupon.id, "\n", coupon);
    res.json(coupon);
  } catch (error) {
    console.error("Error fetching coupon by ID:", error);
    res.status(500).json({ error: "Error fetching coupon by ID" });
  }
};

// Create a new cupon
const createCoupon = async (req, res) => {
  const { name, description, expirationDate, isValid } = req.body;

  try {
    const parsedExpirationDate = new Date(expirationDate).toISOString();
    // Generate a random couponCode using uuid
    const code = uuidv4().slice(0, 6).toUpperCase(); // Take the first 6 characters of the generated UUID

    // Use Prisma to create a new cupon in the database
    const newCoupon = await prisma.coupons.create({
      data: {
        code,
        name,
        description,
        expirationDate: parsedExpirationDate,
        isValid,
      },
    });

    // Return the newly created cupon
    console.log("\nNew coupon successfully created!\n", newCoupon);
    res.json(newCoupon);
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(500).json({ error: "Error creating coupon" });
  }
};

// Update an existing cupon
const updateCoupon = async (req, res) => {
  const couponId = req.params.id;
  const { code, name, description, expirationDate, isValid } = req.body;

  try {
    const updatedCoupon = await prisma.coupons.update({
      where: { id: couponId },
      data: {
        code,
        name,
        description,
        expirationDate,
        isValid,
      },
    });

    console.log(
      "Coupon with ID '" + updatedCoupon.id + "' successfully updated!"
    );
    res.json(updatedCoupon);
  } catch (error) {
    console.error("Error updating coupon:", error);
    res.status(500).json({ error: "Error updating coupon" });
  }
};

// Delete an existing cupon
const deleteCoupon = async (req, res) => {
  const couponId = req.params.id;

  try {
    await prisma.coupons.delete({
      where: { id: couponId },
    });

    console.log("Coupon successfully deleted!");
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting coupon:", error);
    res.status(500).json({ error: "Error deleting coupon" });
  }
};

module.exports = {
  getCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
