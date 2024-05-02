const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { encrypt } = require("../handlers/handlerBycript");

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

module.exports = { register };
