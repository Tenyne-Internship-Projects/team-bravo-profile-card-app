const Sentry = require("@sentry/node");

const errorLogger = (err, req, res, next) => {
  Sentry.captureException(err); // Useful for manual error capture

  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};

module.exports = {
  errorLogger,
};
