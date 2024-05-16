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
const authRoutes = require("./routes/auth.js");
const usersRoutes = require("./routes/users.js");
const rolesRoutes = require("./routes/roles.js");
const couponsRoutes = require("./routes/coupons.js");
const usersCouponsRoutes = require("./routes/usersCoupons.js");

// Enable CORS for all requests
app.use(
  cors({
    origin: clientUrl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Endpoints
app.use("/api/auth", authRoutes);
app.use("/api", usersRoutes);
app.use("/api", rolesRoutes);
app.use("/api", couponsRoutes);
app.use("/api", usersCouponsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server launched on port ${PORT}!`);
});
