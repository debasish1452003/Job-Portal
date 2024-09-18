import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import universityUser from "../models/universityModel.js";

export const isAuthenticatedUniversity = catchAsyncErrors(
  async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
      return next(
        new ErrorHandler("Please Login to access this resource", 401)
      );
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // Check if decodedData exists and contains id
    if (!decodedData || !decodedData.id) {
      return next(
        new ErrorHandler("Token is invalid, please log in again.", 401)
      );
    }

    req.university = await universityUser.findById(decodedData.id);
    next();
  }
);

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.university.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.university.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
