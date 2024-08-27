import catchAsyncErrors from "../middleware/catchAsyncError.js";
import Student from "../models/studentModel.js";

export const createStudent = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    university,
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
    university,
    degree,
    major,
    graduationYear,
    skills,
  });

  res.status(201).json({
    success: true,
    student,
  });
});
