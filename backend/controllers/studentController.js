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
