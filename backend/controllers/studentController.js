import catchAsyncErrors from "../middleware/catchAsyncError.js";
import Student from "../models/studentModel.js";
import sendToken from "../utils/jwtToken.js";

// Create Student user
export const createStudent = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    //university,
    degree,
    major,
    graduationYear,
    skills,
  } = req.body;

  const student = await Student.create({
    firstName,
    lastName,
    email,
    password,
    // university,
    degree,
    major,
    graduationYear,
    skills,
  });

  sendToken(student, 201, res);
});

// Login User
export const loginStudent = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Checking if the user has provided both email and password
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await Student.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// LogOut Student
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
