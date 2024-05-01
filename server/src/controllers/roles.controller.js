const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los roles
const getRoles = async (req, res) => {
  try {
    const roles = await prisma.roles.findMany();
    res.json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ error: "Error fetching roles" });
  }
};

// Obtener un rol por su ID
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

    res.json(role);
  } catch (error) {
    console.error("Error fetching role by ID:", error);
    res.status(500).json({ error: "Error fetching role by ID" });
  }
};

// Crear un nuevo rol
const createRole = async (req, res) => {
  const { name } = req.body;

  try {
    // Usar Prisma para crear un nuevo rol en la base de datos
    const newRole = await prisma.roles.create({
      data: {
        name,
      },
    });

    // Devolver el nuevo rol creado
    res.json(newRole);
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ error: "Error creating role" });
  }
};

module.exports = { getRoles, getRoleById, createRole };
