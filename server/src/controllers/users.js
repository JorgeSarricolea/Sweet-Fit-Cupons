const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

// Update an existing user
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, password, roleId } = req.body;

  try {
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        email,
        password,
        roleId,
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

module.exports = { getUsers, getUserById, updateUser, deleteUser };
