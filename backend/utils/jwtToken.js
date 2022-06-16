//create token and save in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.generateToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      options: {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
      },

      httpOnly: true,
    })
    .json({
      success: true,
      user,
      token,
    });
};

module.exports = sendToken;
