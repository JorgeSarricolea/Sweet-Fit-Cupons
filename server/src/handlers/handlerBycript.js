const bcrypt = require("bcrypt");

// Hashing function
const encrypt = async (plainText) => {
  try {
    const hash = await bcrypt.hash(plainText, 10);
    return hash;
  } catch (error) {
    throw new Error("Error hashing");
  }
};

module.exports = { encrypt };
