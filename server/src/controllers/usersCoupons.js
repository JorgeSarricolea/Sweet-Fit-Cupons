const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all coupon assignments to users
const getAllUserCoupons = async (req, res) => {
  try {
    // Find all coupon assignments to users
    const userCoupons = await prisma.users_coupons.findMany();

    console.log("\nList of users-coupons:\n", userCoupons);
    res.json(userCoupons);
  } catch (error) {
    console.error("Error fetching users-coupons:", error);
    res.status(500).json({ error: "Error fetching user-coupon assignments" });
  }
};

// Get a coupon assignment to user by their IDs
const getUserCouponById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find a coupon assignment to user by their IDs
    const userCoupon = await prisma.users_coupons.findUnique({
      where: {
        id: id,
      },
    });

    if (!userCoupon) {
      return res.status(404).json({ error: "user-coupon not found" });
    }

    console.log("\nuser-coupon with ID: ", id, userCoupon);
    res.json(userCoupon);
  } catch (error) {
    console.error("Error fetching user-coupon assignment:", error);
    res.status(500).json({ error: "Error fetching user-coupon assignment" });
  }
};

const assignCouponToUser = async (req, res) => {
  const { id } = req.params;
  const { userCouponCode } = req.body;

  try {
    // Buscar la asociación usuario-cupón
    const userCoupon = await prisma.users_coupons.findUnique({
      where: {
        id: id,
      },
    });

    if (!userCoupon) {
      return res
        .status(404)
        .json({ error: "user-coupon association not found" });
    }

    const existingCoupon = await prisma.coupons.findUnique({
      where: {
        code: userCouponCode,
      },
    });

    if (!existingCoupon) {
      return res
        .status(400)
        .json({ error: "El código del cupón proporcionado no es válido" });
    }

    const currentDate = new Date();
    if (existingCoupon.expirationDate < currentDate) {
      return res
        .status(400)
        .json({ error: "El cupón ha expirado y ya no es válido" });
    }

    const updatedUserCoupon = await prisma.users_coupons.update({
      where: {
        id: id,
      },
      data: {
        userCouponCode,
        couponExpirationDate: existingCoupon.expirationDate,
      },
    });

    console.log("Cupón asignado al usuario exitosamente!");
    res.json(updatedUserCoupon);
  } catch (error) {
    console.error("Error al actualizar el cupón del usuario:", error);
    res.status(500).json({ error: "Error al actualizar el cupón del usuario" });
  }
};

// Update user cupon availability
const updateUserCoupon = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the user-cupon association exists
    const userCoupon = await prisma.users_coupons.findUnique({
      where: {
        id: id,
      },
    });

    if (!userCoupon) {
      return res
        .status(404)
        .json({ error: "user-coupon association not found" });
    }

    // Get the current date and time
    const now = new Date();

    // Update the application date
    const updatedUserCoupon = await prisma.users_coupons.update({
      where: {
        id: id,
      },
      data: {
        applicationDate: now,
      },
    });

    console.log("user-coupon availability updated successfully!");
    res.json(updatedUserCoupon);
  } catch (error) {
    console.error("Error updating user-coupon availability:", error);
    res.status(500).json({ error: "Error updating user coupon availability" });
  }
};

// Delete a coupon assignment to user
const deleteUserCoupon = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the assignment exists
    const userCouponExists = await prisma.users_coupons.findUnique({
      where: {
        id: id,
      },
    });

    if (!userCouponExists) {
      return res
        .status(404)
        .json({ error: "user-coupon assignment not found" });
    }

    // Delete coupon assignment to user
    await prisma.users_coupons.delete({
      where: {
        id: id,
      },
    });

    console.log("user-coupon successfully deleted!");
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user-coupon assignment:", error);
    res.status(500).json({ error: "Error deleting user-coupon assignment" });
  }
};

module.exports = {
  getAllUserCoupons,
  getUserCouponById,
  assignCouponToUser,
  updateUserCoupon,
  deleteUserCoupon,
};
