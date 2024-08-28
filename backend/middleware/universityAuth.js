import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import university from "../models/universityModel.js";

export const isAuthenticatedUniversity = catchAsyncErrors(
  async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
      return next(
        new ErrorHandler("Please Login to access this resource", 401)
      );
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.university = await university.findById(decodedData.id);
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
