const nodemailer = require("nodemailer");

// Create the createTransporter function
function createTransporter() {
  const transporter = nodemailer.createTransport({
    host: process.env.NM_HOST,
    port: process.env.NM_PORT,
    secure: false,
    auth: {
      user: process.env.NM_USER,
      pass: process.env.NM_PWD,
    },
  });
  return transporter;
}

module.exports = createTransporter;
