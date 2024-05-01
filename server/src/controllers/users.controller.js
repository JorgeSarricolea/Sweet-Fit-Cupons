const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// To get all users
const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};

module.exports = { getUsers };
