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

const assignCuponToUser = async (req, res) => {
  const { userCuponId } = req.params;
  const { userCuponCode } = req.body;

  try {
    // Buscar la asociación usuario-cupón
    const userCupon = await prisma.users_cupons.findUnique({
      where: {
        id: userCuponId,
      },
    });

    if (!userCupon) {
      return res
        .status(404)
        .json({ error: "Asociación usuario-cupón no encontrada" });
    }

    // Verificar si el código del cupón proporcionado está presente en la tabla de cupones
    const existingCupon = await prisma.cupons.findUnique({
      where: {
        code: userCuponCode,
      },
    });

    if (!existingCupon) {
      return res
        .status(400)
        .json({ error: "El código del cupón proporcionado no es válido" });
    }

    // Verificar si la fecha de vencimiento del cupón es posterior a la fecha actual
    const currentDate = new Date();
    if (existingCupon.expirationDate < currentDate) {
      return res
        .status(400)
        .json({ error: "El cupón ha expirado y ya no es válido" });
    }

    // Actualizar el cupón
    const updatedUserCupon = await prisma.users_cupons.update({
      where: {
        id: userCuponId,
      },
      data: {
        userCuponCode,
        cuponExpirationDate: existingCupon.expirationDate,
      },
    });

    console.log("Cupón asignado al usuario exitosamente!");
    res.json(updatedUserCupon);
  } catch (error) {
    console.error("Error al actualizar el cupón del usuario:", error);
    res.status(500).json({ error: "Error al actualizar el cupón del usuario" });
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
