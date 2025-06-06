require("./instrument");
require("dotenv").config();
require("events").EventEmitter.defaultMaxListeners = 20;

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const helmet = require("helmet");
const morgan = require("morgan");
const { errorLogger } = require("./middlewares/errorLogger");

const Sentry = require("@sentry/node");
const authRoute = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const isProduction = process.env.NODE_ENV === "production";

// Initialize Sentry before anything else
if (isProduction && process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
  });
}

const app = express();
connectDB();

// These must go BEFORE routes
if (isProduction) {
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler()); // optional
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoutes);

app.get("/debug-sentry", (req, res) => {
  throw new Error("Sentry test error");
});

// Error handler must come AFTER routes
if (isProduction) {
  app.use(Sentry.Handlers.errorHandler());
}

// Custom error logging
app.use(errorLogger);

// Fallback
app.get("/", (req, res) => res.send("API is running..."));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

module.exports = app;
