const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Handlers functions
const { encrypt, compare } = require("../handlers/handlerBcrypt");
const { findUserRole, findUserByEmail } = require("../handlers/handlerUsers");

// Register a new user with a default roleId as 'User'
const register = async (req, res) => {
  const { firstName, lastName, email, password, cuponCode } = req.body;

  try {
    // Find the roleId for 'User'
    const userRoleId = await findUserRole("User");

    // Hash the password
    const hashedPassword = await encrypt(password);

    // Use Prisma to create a new user in the database
    const newUser = await prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: { connect: { id: userRoleId } },
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

// Register a new user with email only
const registerWithEmailOnly = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the roleId for 'User'
    const userRoleId = await findUserRole("User");

    // Use Prisma to create a new user in the database with only email
    const newUser = await prisma.users.create({
      data: {
        email,
        firstName: "Undefined",
        lastName: "Undefined",
        password: "Undefined",
        role: { connect: { id: userRoleId } },
      },
    });

    // Return the new created user
    console.log("\nNew user with email only successfully created!\n", newUser);
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user with email only:", error);
    res.status(500).json({ error: "Error creating user with email only" });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await findUserByEmail(email);

    // If user doesn't exist, return error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Passwords match, return success
    console.log("Login successful!");
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};

module.exports = { register, login, registerWithEmailOnly };
