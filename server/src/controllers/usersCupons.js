const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all coupon assignments to users
const getAllUserCupons = async (req, res) => {
  try {
    // Find all coupon assignments to users
    const userCupons = await prisma.users_cupons.findMany();

    console.log("\nList of users-cupons:\n", userCupons);
    res.json(userCupons);
  } catch (error) {
    console.error("Error fetching users-cupons:", error);
    res.status(500).json({ error: "Error fetching user-cupon assignments" });
  }
};

// Get a coupon assignment to user by their IDs
const getUserCuponById = async (req, res) => {
  const { userCuponId } = req.params;

  try {
    // Find a coupon assignment to user by their IDs
    const userCupon = await prisma.users_cupons.findUnique({
      where: {
        id: userCuponId,
      },
    });

    if (!userCupon) {
      return res.status(404).json({ error: "User-cupon not found" });
    }

    console.log("\nuser-cupon with ID: ", userCuponId, userCupon);
    res.json(userCupon);
  } catch (error) {
    console.error("Error fetching user-cupon assignment:", error);
    res.status(500).json({ error: "Error fetching user-cupon assignment" });
  }
};

// Assign a coupon to a user
const assignCuponToUser = async (req, res) => {
  const { userEmail, cuponCode } = req.body;

  try {
    // Check if the user exists
    const user = await prisma.users.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find all the user's cupons
    const userCupons = await prisma.users_cupons.findMany({
      where: {
        email: userEmail,
      },
    });

    // Check if any of the user's cupons already have the same cuponCode
    const isDuplicateCupon = userCupons.some(
      (cupon) => cupon.userCuponCode === cuponCode
    );

    if (isDuplicateCupon) {
      return res
        .status(400)
        .json({ error: "User already has the same coupon assigned" });
    }

    // Find the cupon by its code
    const cupon = await prisma.cupons.findUnique({
      where: {
        code: cuponCode,
      },
    });

    if (!cupon) {
      return res.status(404).json({ error: "Cupon not found" });
    }

    // Associate the coupon to the user
    const userCupon = await prisma.users_cupons.create({
      data: {
        email: userEmail,
        userCuponCode: cuponCode,
        cuponExpirationDate: cupon.expirationDate,
      },
    });

    console.log(
      `\nUser with email '${userEmail}' assigned cupon with code '${cuponCode}' successfully!`
    );
    res.json(userCupon);
  } catch (error) {
    console.error("Error assigning cupon to user:", error);
    res.status(500).json({ error: "Error assigning cupon to user" });
  }
};

// Update user cupon availability
const updateUserCupon = async (req, res) => {
  const { userCuponId } = req.params;

  try {
    // Check if the user-cupon association exists
    const userCupon = await prisma.users_cupons.findUnique({
      where: {
        id: userCuponId,
      },
    });

    if (!userCupon) {
      return res
        .status(404)
        .json({ error: "User-cupon association not found" });
    }

    // Get the current date and time
    const now = new Date();

    // Update the application date
    const updatedUserCupon = await prisma.users_cupons.update({
      where: {
        id: userCuponId,
      },
      data: {
        applicationDate: now,
      },
    });

    console.log("User cupon availability updated successfully!");
    res.json(updatedUserCupon);
  } catch (error) {
    console.error("Error updating user cupon availability:", error);
    res.status(500).json({ error: "Error updating user cupon availability" });
  }
};

// Delete a coupon assignment to user
const deleteUserCupon = async (req, res) => {
  const { userCuponId } = req.params;

  try {
    // Check if the assignment exists
    const userCuponExists = await prisma.users_cupons.findUnique({
      where: {
        id: userCuponId,
      },
    });

    if (!userCuponExists) {
      return res.status(404).json({ error: "User-cupon assignment not found" });
    }

    // Delete coupon assignment to user
    await prisma.users_cupons.delete({
      where: {
        id: userCuponId,
      },
    });

    console.log("User-cupon successfully deleted!");
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user-cupon assignment:", error);
    res.status(500).json({ error: "Error deleting user-cupon assignment" });
  }
};

module.exports = {
  getAllUserCupons,
  getUserCuponById,
  assignCuponToUser,
  updateUserCupon,
  deleteUserCupon,
};
