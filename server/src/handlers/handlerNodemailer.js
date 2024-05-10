const createTransporter = require("../config/nodemailer.js");

const sendMail = (userEmail, subject, body) => {
  const transporter = createTransporter(); // Obtener el transporter

  const mailOptions = {
    from: process.env.NM_USER,
    to: userEmail,
    subject: subject,
    html: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo electrónico:", error);
    } else {
      console.log("Correo electrónico enviado:", info.response);
    }
  });
};

module.exports = sendMail;
