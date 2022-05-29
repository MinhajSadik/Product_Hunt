const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");

//Register a User

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a simple public id",
      url: "this is a profile pic url",
    },
  });
  res.status(201).json({
    success: true,
    user,
  });
});
