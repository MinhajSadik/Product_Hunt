const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { accessToken } = req.cookies;

  console.log(accessToken);
  if (!accessToken) {
    throw new Error("Invalid Token!");
  }

  const userData = jwt.verify(accessToken, process.env.JWT_SECRET);

  if (!userData) throw new Error("No User Found");

  req.user = userData;

  next();

  // const token = req.headers.authorization.split(" ")[1];

  // if (!token) {
  //   return next(new ErrorHandler("Please Login to access this resource", 401));
  // }

  // const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  // req.user = await User.findById(decodedData.id);

  // next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
