const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all coupon assignments to users
const getAllUserCuponAssignments = async (req, res) => {
  try {
    // Find all coupon assignments to users
    const userCuponAssignments = await prisma.users_cupons.findMany();

    console.log("\nList of user-cupon assignments:\n", userCuponAssignments);
    res.json(userCuponAssignments);
  } catch (error) {
    console.error("Error fetching user-cupon assignments:", error);
    res.status(500).json({ error: "Error fetching user-cupon assignments" });
  }
};

// Get a coupon assignment to user by their IDs
const getUserCuponAssignmentByIds = async (req, res) => {
  const { userId, cuponId } = req.params;

  try {
    // Find a coupon assignment to user by their IDs
    const userCuponAssignment = await prisma.users_cupons.findUnique({
      where: {
        userId_cuponId: { userId, cuponId },
      },
    });

    if (!userCuponAssignment) {
      return res.status(404).json({ error: "User-cupon assignment not found" });
    }

    console.log(
      "\nUser with ID '" +
        userId +
        "' assigned cupon with ID '" +
        cuponId +
        "' successfully!"
    );

    console.log("User ID: ", userId, "\nCupon ID", cuponId);
    res.json(userCuponAssignment);
  } catch (error) {
    console.error("Error fetching user-cupon assignment:", error);
    res.status(500).json({ error: "Error fetching user-cupon assignment" });
  }
};

// Assign a coupon to a user
const assignCuponToUser = async (req, res) => {
  const { userId, cuponId } = req.body;

  try {
    // Check if the user and coupon exist
    const userExists = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    const cupon = await prisma.cupons.findUnique({
      where: {
        id: cuponId,
      },
    });

    if (!userExists || !cupon) {
      return res.status(404).json({ error: "User or cupon not found" });
    }

    // Associate the coupon to the user
    const userCupon = await prisma.users_cupons.create({
      data: {
        userId,
        cuponId,
        userCuponCode: cupon.code, // Assign the coupon code to the userCuponCode attribute
      },
    });

    // Update the user's couponCode with the coupon code
    await prisma.users.update({
      where: { id: userId },
      data: {
        cuponCode: cupon.code,
      },
    });

    console.log(
      "\nUser with ID '" +
        userId +
        "' assigned cupon with ID '" +
        cuponId +
        "' successfully!"
    );
    res.json(userCupon);
  } catch (error) {
    console.error("Error assigning cupon to user:", error);
    res.status(500).json({ error: "Error assigning cupon to user" });
  }
};

// Update coupon availability for a user
const updateUserCuponAvailability = async (req, res) => {
  const { userId, cuponId, isAvailable } = req.body;

  try {
    // Check if the user-coupon association exists
    const userCupon = await prisma.users_cupons.findUnique({
      where: {
        userId_cuponId: { userId, cuponId },
      },
    });

    if (!userCupon) {
      return res
        .status(404)
        .json({ error: "User-cupon association not found" });
    }

    // Update coupon availability for the user
    const updatedUserCupon = await prisma.users_cupons.update({
      where: {
        userId_cuponId: { userId, cuponId },
      },
      data: {
        isAvailable,
      },
    });

    console.log(
      "\nUser with ID '" +
        userId +
        "' cupon with ID '" +
        cuponId +
        "' updated successfully!"
    );
    res.json(updatedUserCupon);
  } catch (error) {
    console.error("Error updating user cupon availability:", error);
    res.status(500).json({ error: "Error updating user cupon availability" });
  }
};

// Delete a coupon assignment to user
const deleteUserCuponAssignment = async (req, res) => {
  const { userId, cuponId } = req.params;

  try {
    // Check if the assignment exists
    const userCuponExists = await prisma.users_cupons.findUnique({
      where: {
        userId_cuponId: { userId, cuponId },
      },
    });

    if (!userCuponExists) {
      return res.status(404).json({ error: "User-cupon assignment not found" });
    }

    // Delete coupon assignment to user
    await prisma.users_cupons.delete({
      where: {
        userId_cuponId: { userId, cuponId },
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
  getAllUserCuponAssignments,
  getUserCuponAssignmentByIds,
  assignCuponToUser,
  updateUserCuponAvailability,
  deleteUserCuponAssignment,
};
