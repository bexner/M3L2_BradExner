const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from config.env
dotenv.config({ path: "./config.env" });

// Import the file logger and rate limiter
const logger = require("./utils/fileLogger");
const rateLimiter = require("./middleware/rateLimiter");

// Import Swagger packages for API documentation
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerConfig");

const app = express();

// Parse JSON request bodies
app.use(express.json());

// ================================================================
// Swagger API Documentation Route
// ================================================================
// This serves the Swagger UI at http://localhost:3000/api-docs
// The Swagger UI page is NOT rate limited so students can
// browse the documentation freely without getting blocked.
// ================================================================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Apply rate limiter to ALL routes (3 requests per minute)
app.use(rateLimiter);

// Log every incoming request to the file
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url} - from IP: ${req.ip}`);
  next();
});

// MongoDB connection setup using Mongoose
const DB = process.env.DATABASE
mongoose
  .connect(DB)
  .then(() => {
    logger.info("MongoDB connection successful");
  })
  .catch((err) => {
    logger.error("MongoDB connection FAILED: " + err.message);
  });

// Routes
const loanRoutes = require("./routes/loanRoutes.js");
app.use("/api", loanRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`App running on port http://localhost:${port}`);
  logger.info(`Swagger API docs available at http://localhost:${port}/api-docs`);
  logger.info("Rate limit is set to 3 requests per minute per IP");
  logger.info("Logs are being saved to logs/app.log");
});
