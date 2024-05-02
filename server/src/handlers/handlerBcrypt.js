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

// Comparing function
const compare = async (plainText, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainText, hashedPassword);
    return match;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

module.exports = { encrypt, compare };
