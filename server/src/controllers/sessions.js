const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { encrypt, compare } = require("../handlers/handlerBcrypt");

// Register a new user with a default roleId as 'User'
const register = async (req, res) => {
  const { firstName, lastName, email, password, cuponCode } = req.body;

  try {
    // Find the roleId for 'User'
    const userRole = await prisma.roles.findFirst({
      where: {
        name: "User",
      },
    });

    // Hash the password using encrypt function
    const hashedPassword = await encrypt(password);

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

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

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

module.exports = { register, login };
