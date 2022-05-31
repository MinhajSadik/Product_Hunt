//create token and save in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.generateToken();

  res
    .status(statusCode)
    .cookie("token", token, { options: 2 * 60 * 60 * 1000, httpOnly: true })
    .json({
      success: true,
      user,
      token,
    });
};

module.exports = sendToken;
