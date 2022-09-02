const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongodb id cast error
  if (err.name === "CastError") {
    const message = `Resource not found, Invalid: ${err.path}`;
    err = new ErrorHandler(message, 404);
  }

  // mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate field value: ${Object.keys(err.keyValue)}`;
    err = new ErrorHandler(message, 400);
  }

  // Json Web Token error
  if (err.name === "JsonWebTokenError") {
    const message = `Jwon Web Token Error: ${err.message}`;
    err = new ErrorHandler(message, 404);
  }

  // Jwt Expire error
  if (err.name === "TokenExpiredError") {
    const message = `Jwon Web Token Expired: ${err.message}`;
    err = new ErrorHandler(message, 404);
  }

  // not found error
  if (err.name === "NotFoundError") {
    const message = `Could not found expected route: ${err.message}`;
    err = new ErrorHandler(message, 404);
  }

  // validator error
  if (err.name === "ValidatorError") {
    const message = `Validate your expected path: ${err.message}`;
    err = new ErrorHandler(message, 404);
  }
  res.status(err.statusCode).json({
    success: false,
    // error: err.stack,
    message: err.message,
  });
};
