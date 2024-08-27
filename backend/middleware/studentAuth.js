import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import studentUser from "../models/studentModel.js";

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

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
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
