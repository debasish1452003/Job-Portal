import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import Employer from "../models/employerModel.js";

export const isAuthenticatedRecruiter = catchAsyncErrors(
  async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
      return next(
        new ErrorHandler("Please Login to access this resource", 401)
      );
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.employer = await Employer.findById(decodedData.id);
    next();
  }
);

export const authorizeRecruiterRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.employer.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.employer.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
