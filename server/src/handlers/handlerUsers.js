const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to find a user by their email
const findUserByEmail = async (email) => {
  return prisma.users.findUnique({
    where: {
      email: email,
    },
  });
};

// Function to find a user by their ID
const findUserById = async (userId) => {
  return prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
};

module.exports = { findUserById, findUserByEmail };
