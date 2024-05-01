require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env" : ".env.local",
});

const express = require("express");
const cors = require("cors");
const app = express();
const { clientUrl } = require("./config/config.js");

// Middleware to parse request body as JSON
app.use(express.json());

// Routes
const usersRoutes = require("./routes/users.route.js");
const rolesRoutes = require("./routes/roles.route.js");
const cuponsRoutes = require("./routes/cupons.route.js");

// Enable CORS for all requests
app.use(
  cors({
    origin: clientUrl,
  })
);

// Endpoints
app.use("/api", usersRoutes);
app.use("/api", rolesRoutes);
app.use("/api", cuponsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server launched on port ${PORT}!`);
});
