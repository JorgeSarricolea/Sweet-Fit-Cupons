const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

// Handlers functions
const { encrypt, compare } = require("../handlers/handlerBcrypt");
const { findUserById, findUserByEmail } = require("../handlers/handlerUsers");
const { getRoleName, findUserRole } = require("../handlers/handlerRoles");

// Function to generate a JWT
const generateToken = (userId, userRoleId) => {
  const payload = {
    userId: userId,
    roleId: userRoleId,
  };

  const expiresInOneDay = 24 * 60 * 60;
  const algorithm = process.env.JWT_ALGORITHM || "HS256";
  const secret = process.env.JWT_SECRET;

  return jwt.sign(payload, secret, {
    expiresIn: expiresInOneDay,
    algorithm: algorithm,
  });
};

// Function to verify a JWT
const verifyToken = async (req, res) => {
  const token = req.body.token; // Get token from request body

  try {
    // Verify token using secret key
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    // Extract userId and roleId from decoded token
    const { userId, roleId } = decodedToken;

    // Check if the user exists
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Get the user's role name
    const roleName = await getRoleName(roleId);

    // Valid token, return validity, roleId and roleName
    res.json({ isValid: true, roleId: roleId, roleName: roleName });
    console.log(roleId, roleName);
  } catch (error) {
    console.error("Error verificando el token:", error);
    res.status(500).json({ error: "Error verificando el token" });
  }
};

// Register a new user with a default roleId as 'User'
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

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
    // Verificar si el correo electrónico ya está en uso
    const existingUser = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      // Si el correo electrónico ya está registrado, responder con un error
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está en uso" });
    }

    // Si el correo electrónico no está en uso, proceder con la creación del usuario
    const userRoleId = await findUserRole("User");

    const newUser = await prisma.users.create({
      data: {
        role: { connect: { id: userRoleId } },
        firstName: "Undefined",
        lastName: "Undefined",
        email,
        password: "Undefined",
      },
    });

    const newUserWithoutCode = await prisma.users_coupons.create({
      data: {
        email: newUser.email,
      },
    });

    console.log("\nNew user with email only successfully created!\n", newUser);
    return res.json({ newUser, newUserWithoutCode });
  } catch (error) {
    console.error("Error creating user with email only:", error);
    return res
      .status(500)
      .json({ error: "Error creating user with email only" });
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

    // Get roleId for the user
    const userRoleId = user.roleId;

    // Passwords match, generate JWT token with user's role
    const token = generateToken(user.id, userRoleId); // Pass userId and roleId to generateToken

    // Passwords match, return success
    res.json({ message: "Login successful", token: token });
    console.log("Login successful for user:", email);
    console.log("Token:", token);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};

module.exports = { register, login, registerWithEmailOnly, verifyToken };
