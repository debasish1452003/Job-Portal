import catchAsyncErrors from "../middleware/catchAsyncError.js";
import University from "../models/universityModel.js";
import sendToken from "../utils/jwtToken.js";

// Create University
export const createUniversity = catchAsyncErrors(async (req, res, next) => {
  const { name, address, description, contactEmail, password } = req.body;

  const university = await University.create({
    name,
    address,
    password,
    description,
    contactEmail,
  });

  sendToken(university, 201, res);
});

// Login University
export const loginUniversity = catchAsyncErrors(async (req, res, next) => {
  const { contactEmail, password } = req.body;

  if (!contactEmail || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const university = await University.findOne({ contactEmail }).select(
    "+password"
  );

  if (!university) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await university.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(university, 200, res);
});

// LogOut University
export const universityLogout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
