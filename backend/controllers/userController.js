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

//Login a User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.isPasswordMatch(password, user.password))) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }
  // const token = user.generateToken();
  res.status(200).json({
    success: true,
    token,
  });
});
