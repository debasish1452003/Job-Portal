import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import studentUser from "../models/studentModel.js";
import universityUser from "../models/universityModel.js";
import employerUser from "../models/employerModel.js";

export const isAuthenticatedStudent = catchAsyncErrors(
  async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
      return next(
        new ErrorHandler("Please Login to access this resource", 401)
      );
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.student = await studentUser.findById(decodedData.id);
    next();
  }
);

export const authorizeStudentRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.student.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.student.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
