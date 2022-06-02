const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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

//User Logout
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});

//forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("There is no user with this email", 404));
  }

  //get reset password token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  //create reset url
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  //send email
  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetPasswordUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: `ProductHunt - Password Reset`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //crating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("reset password token is Invalid or has expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//Update user password
exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Old password is incorrect", 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("New password does not match", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

//Update user Profile
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  //we will add caloudinary image upload later
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Get all users
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  if (null == req?.user?.role) {
    return next(new ErrorHandler(`Bad request`, 400));
  }

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User --Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
