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
const sessionsRoutes = require("./routes/sessions.js");
const usersRoutes = require("./routes/users.js");
const rolesRoutes = require("./routes/roles.js");
const cuponsRoutes = require("./routes/cupons.js");
const usersCuponsRoutes = require("./routes/usersCupons.js");

// Enable CORS for all requests
app.use(
  cors({
    origin: clientUrl,
  })
);

// Endpoints
app.use("/api", sessionsRoutes);
app.use("/api", usersRoutes);
app.use("/api", rolesRoutes);
app.use("/api", cuponsRoutes);
app.use("/api", usersCuponsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server launched on port ${PORT}!`);
});
