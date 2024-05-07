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

// Get the role name by its ID
const getRoleName = async (roleId) => {
  try {
    const role = await prisma.roles.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      return null; // Returns null if the role is not found
    }

    return role.name; // Returns the role name
  } catch (error) {
    console.error("Error obteniendo el nombre del rol:", error);
    throw error;
  }
};

module.exports = { loadRoles, getRoleName, findUserRole };
