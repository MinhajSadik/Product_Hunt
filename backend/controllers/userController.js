const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

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

  //If everything is ok, send token to client
  sendToken(user, 201, res);
});

//Login a User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //1. Check if email and password exist
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }
  //2. Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }

  //3. Check if password is correct
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }

  //4. If everything is ok, send token to client
  sendToken(user, 200, res);
});
