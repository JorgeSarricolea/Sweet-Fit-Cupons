const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all roles
const getRoles = async (req, res) => {
  try {
    const roles = await prisma.roles.findMany();
    console.log("\nList of roles:\n", roles);
    res.json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ error: "Error fetching roles" });
  }
};

// Get a role by its ID
const getRoleById = async (req, res) => {
  const roleId = req.params.id;

  try {
    const role = await prisma.roles.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    console.log("\nRole ID: ", role.id, "\n", role);
    res.json(role);
  } catch (error) {
    console.error("Error fetching role by ID:", error);
    res.status(500).json({ error: "Error fetching role by ID" });
  }
};

// Create a new role
const createRole = async (req, res) => {
  const { name } = req.body;

  try {
    // Use Prisma to create a new role in the database
    const newRole = await prisma.roles.create({
      data: {
        name,
      },
    });

    // Return the newly created role
    console.log("\nNew role successfully created!\n", newRole);
    res.json(newRole);
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ error: "Error creating role" });
  }
};

// Update an existing role
const updateRole = async (req, res) => {
  const roleId = req.params.id;
  const { name } = req.body;

  try {
    const updatedRole = await prisma.roles.update({
      where: { id: roleId },
      data: {
        name,
      },
    });

    console.log("Role with ID '" + updatedRole.id + "' successfully updated!");
    res.json(updatedRole);
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ error: "Error updating role" });
  }
};

// Delete an existing role
const deleteRole = async (req, res) => {
  const roleId = req.params.id;

  try {
    await prisma.roles.delete({
      where: { id: roleId },
    });

    console.log("Role successfully deleted!");
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ error: "Error deleting role" });
  }
};

module.exports = { getRoles, getRoleById, createRole, updateRole, deleteRole };
