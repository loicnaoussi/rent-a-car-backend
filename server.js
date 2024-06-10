// server.js
const express = require("express");
const { connectDB } = require("./config/db");
const vehicleRoutes = require("./routes/vehicleRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
require("dotenv").config();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
