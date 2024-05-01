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

// Get a user by their ID
const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Error fetching user by ID" });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { firstName, lastName, email, password, rolId, cuponCode } = req.body;

  try {
    // Use Prisma to create a new user in the database
    const newUser = await prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        rol: { connect: { id: rolId } }, // Connect the user to their role using the ID
        cuponCode,
      },
    });

    // Returns the new user created
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

module.exports = { getUsers, getUserById, createUser };
