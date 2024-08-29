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

// Apply for Jobs
export const applyForJob = async (req, res, next) => {
  try {
    // Extract jobId from route parameters and studentId from request body
    const { studentId } = req.body;
    const { jobId } = req.params;

    // Validate input
    if (!studentId) {
      return next(new ErrorHandler("Student ID is required", 400));
    }

    // Find the job and add the student to the applicants array
    const job = await Job.findByIdAndUpdate(
      jobId,
      { $addToSet: { applicants: studentId } }, // Add student ID to applicants array if not already present
      { new: true, runValidators: true }
    );

    if (!job) {
      return next(new ErrorHandler("Job not found", 404));
    }

    // Optionally, update the student document (e.g., to track applied jobs)
    // You can extend the Student schema to include an array of applied job IDs if needed

    // Send response
    res.status(200).json({
      success: true,
      message: "Application successful",
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
