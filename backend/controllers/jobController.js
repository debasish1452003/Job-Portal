// const ApiFeatures = require("../utils/apifeatures");
// const cloudinary = require("cloudinary");
import Job from "../models/jobModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "../middleware/catchAsyncError.js";

// Create Jobs --Recruiter
export const createJob = catchAsyncErrors(async (req, res, next) => {
  req.body.employer = req.employer.id;

  const job = await Job.create(req.body);

  res.status(201).json({
    success: true,
    job,
  });
});

// Apply for Jobs --Students
export const applyForJob = catchAsyncErrors(async (req, res, next) => {
  const { jobId } = req.params;

  if (!req.student || !req.student._id) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  const studentId = req.student._id;

  const job = await Job.findByIdAndUpdate(
    jobId,
    { $addToSet: { applicants: studentId } },
    { new: true, runValidators: true }
  );

  if (!job) {
    return next(new ErrorHandler("Job not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Application successful",
    job,
  });
});
