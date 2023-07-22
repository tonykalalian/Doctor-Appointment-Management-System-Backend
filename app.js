const express = require("express");
const app = express();

// Load environment variables from .env
require("dotenv").config();

// Import the database configuration
const dbConfig = require("./config/db");

// Connect to the database
dbConfig.connectDB();

// Middleware for parsing JSON data
app.use(express.json());

// Import routes for each collection
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const absenceRoutes = require("./routes/absenceRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// Routes for Users collection
app.use("/api/users", userRoutes);

// Routes for other collections
app.use("/api/patients", patientRoutes);
app.use("/api/absences", absenceRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/reviews", reviewRoutes);

// Error handling middleware
const { errorHandler } = require("./middlewares/errorMiddleware");
app.use(errorHandler);

const PORT = dbConfig.getAppPort();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
