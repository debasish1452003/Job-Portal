const sendToken = (student, statusCode, res) => {
  // Validate the student object and method
  if (!student || typeof student.getJWTToken !== "function") {
    return res.status(400).json({
      success: false,
      message: "Invalid student object or getJWTToken method not found.",
    });
  }

  const token = student.getJWTToken();

  // Ensure COOKIE_EXPIRE is a valid number
  const cookieExpire = parseInt(process.env.COOKIE_EXPIRE, 10);
  if (isNaN(cookieExpire)) {
    return res.status(500).json({
      success: false,
      message: "Invalid COOKIE_EXPIRE value in environment variables.",
    });
  }

  // Options for cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Send response with token cookie
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    student,
    token,
  });
};

export default sendToken;
