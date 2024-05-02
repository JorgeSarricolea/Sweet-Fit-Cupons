const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

// To get all users
const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    console.log("\nList of users:\n", users);
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

    console.log("\nUser ID: ", user.id, "\n", user);
    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Error fetching user by ID" });
  }
};

// Create a new user with a randomly generated couponCode and default roleId as 'User'
const createUser = async (req, res) => {
  const { firstName, lastName, email, password, cuponCode } = req.body;

  try {
    // Find the roleId for 'User'
    const userRole = await prisma.roles.findFirst({
      where: {
        name: "User",
      },
    });

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use Prisma to create a new user in the database
    const newUser = await prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: { connect: { id: userRole.id } }, // Connect the user to the 'User' role
        cuponCode,
      },
    });

    // Return the new created user
    console.log("\nNew user successfully created!\n", newUser);
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

// Update an existing user
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, password, rolId, cuponCode } = req.body;

  try {
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        email,
        password,
        rol: { connect: { id: rolId } }, // Connect the user to their role using the ID
        cuponCode,
      },
    });

    console.log("User with ID '" + updatedUser.id + "' successfully updated!");
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

// Delete an existing user
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await prisma.users.delete({
      where: { id: userId },
    });

    console.log("User successfully deleted!");
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
