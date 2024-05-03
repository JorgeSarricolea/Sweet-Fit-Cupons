const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let rolesCache = {}; // Hash table to store the roles

// Function to load the roles into the hash table
const loadRoles = async () => {
  const roles = await prisma.roles.findMany();
  roles.forEach((role) => {
    rolesCache[role.name] = role.id;
  });
};

// Function to find the user role ID
const findUserRole = async (roleName) => {
  // Load roles if hash table is empty
  if (Object.keys(rolesCache).length === 0) {
    await loadRoles();
  }

  // Find the role ID in the hash table
  const roleId = rolesCache[roleName];

  // Return the roleId
  return roleId;
};

// Function to find a user by their email
const findUserByEmail = async (email) => {
  return prisma.users.findUnique({
    where: {
      email: email,
    },
  });
};

module.exports = { loadRoles, findUserRole, findUserByEmail };
