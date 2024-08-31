import Student from "../models/studentModel.js";
import Employer from "../models/employerModel.js";
import University from "../models/universityModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middleware/catchAsyncError.js";

// All Login Controlls
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, userType } = req.body;

  if (!email || !password || !userType) {
    return next(
      new ErrorHandler("Email, password, and userType are required", 400)
    );
  }

  let UserModel;

  // Determine the model based on userType
  switch (userType) {
    case "student":
      UserModel = Student;
      break;
    case "recruiter":
      UserModel = Employer;
      break;
    case "university":
      UserModel = University;
      break;
    default:
      return next(new ErrorHandler("Invalid userType", 400));
  }

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  res.status(200).json({
    success: true,
    token,
    userType,
    user,
  });
});
