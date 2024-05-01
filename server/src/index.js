require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env" : ".env.local",
});

const express = require("express");
const cors = require("cors");
const app = express();
const { clientUrl } = require("./config/config.js");

// Routes
const usersRoutes = require("./routes/users.route.js");

// Enable CORS for all requests
app.use(
  cors({
    origin: clientUrl,
  })
);

// Endpoints
app.use("/api", usersRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server launched on port ${PORT}!`);
});
