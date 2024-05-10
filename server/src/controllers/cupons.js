const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");

// Get all cupons
const getCupons = async (req, res) => {
  try {
    const cupons = await prisma.cupons.findMany();
    console.log("\nList of cupons:\n", cupons);
    res.json(cupons);
  } catch (error) {
    console.error("Error fetching cupons:", error);
    res.status(500).json({ error: "Error fetching cupons" });
  }
};

// Get a cupon by its ID
const getCuponById = async (req, res) => {
  const cuponId = req.params.id;

  try {
    const cupon = await prisma.cupons.findUnique({
      where: {
        id: cuponId,
      },
    });

    if (!cupon) {
      return res.status(404).json({ error: "Cupon not found" });
    }

    console.log("\nCupon ID: ", cupon.id, "\n", cupon);
    res.json(cupon);
  } catch (error) {
    console.error("Error fetching cupon by ID:", error);
    res.status(500).json({ error: "Error fetching cupon by ID" });
  }
};

// Create a new cupon
const createCupon = async (req, res) => {
  const { name, description, expirationDate, isValid } = req.body;

  try {
    const parsedExpirationDate = new Date(expirationDate).toISOString();
    // Generate a random couponCode using uuid
    const code = uuidv4().slice(0, 6).toUpperCase(); // Take the first 6 characters of the generated UUID

    // Use Prisma to create a new cupon in the database
    const newCupon = await prisma.cupons.create({
      data: {
        code,
        name,
        description,
        expirationDate: parsedExpirationDate,
        isValid,
      },
    });

    // Return the newly created cupon
    console.log("\nNew cupon successfully created!\n", newCupon);
    res.json(newCupon);
  } catch (error) {
    console.error("Error creating cupon:", error);
    res.status(500).json({ error: "Error creating cupon" });
  }
};

// Update an existing cupon
const updateCupon = async (req, res) => {
  const cuponId = req.params.id;
  const { code, name, description, expirationDate, isValid } = req.body;

  try {
    const updatedCupon = await prisma.cupons.update({
      where: { id: cuponId },
      data: {
        code,
        name,
        description,
        expirationDate,
        isValid,
      },
    });

    console.log(
      "Cupon with ID '" + updatedCupon.id + "' successfully updated!"
    );
    res.json(updatedCupon);
  } catch (error) {
    console.error("Error updating cupon:", error);
    res.status(500).json({ error: "Error updating cupon" });
  }
};

// Delete an existing cupon
const deleteCupon = async (req, res) => {
  const cuponId = req.params.id;

  try {
    await prisma.cupons.delete({
      where: { id: cuponId },
    });

    console.log("Cupon successfully deleted!");
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting cupon:", error);
    res.status(500).json({ error: "Error deleting cupon" });
  }
};

module.exports = {
  getCupons,
  getCuponById,
  createCupon,
  updateCupon,
  deleteCupon,
};
