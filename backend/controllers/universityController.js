import catchAsyncErrors from "../middleware/catchAsyncError.js";
import University from "../models/universityModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import sendToken from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

// Create University
export const createUniversity = catchAsyncErrors(async (req, res, next) => {
  const { name, address, description, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new Error("Please provide all required fields"));
  }

  // Handle image upload to Cloudinary
  // let imageLink = {};

  // if (image) {
  //   const result = await cloudinary.v2.uploader.upload(image, {
  //     folder: "students",
  //   });

  //   imageLink = {
  //     public_id: result.public_id,
  //     url: result.secure_url,
  //   };
  // }

  const university = await University.create({
    name,
    address,
    email,
    password,
    description,
  });

  sendToken(university, 201, res);
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

// ----------------------------  University Details -------------------------------------

// GET UNIVERSITY DETAILS
export const getUniversityDetails = catchAsyncErrors(async (req, res, next) => {
  const university = await University.findById(req.university.id).populate(
    "students",
    "firstName lastName email"
  );

  if (!university.id) {
    return next(new ErrorHandler("Student not found", 404));
  }

  res.status(200).json({
    success: true,
    university,
  });
});

// Update University password
export const updateUniversityPassword = catchAsyncErrors(
  async (req, res, next) => {
    const university = await University.findById(req.university.id).select(
      "+password"
    );

    const isPasswordMatched = await university.comparePassword(
      req.body.oldPassword
    );

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword != req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }

    university.password = req.body.newPassword;

    await university.save();

    sendToken(university, 200, res);
  }
);

export const getUniversitiesByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res
        .status(400)
        .json({ message: "Name query parameter is required" });
    }

    console.log(`Searching for universities with name: ${name}`);

    const universities = await University.find({
      name: { $regex: new RegExp(name, "i") },
    });

    console.log(`Found universities: ${JSON.stringify(universities)}`);

    res.status(200).json({ success: true, data: universities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update University Profile
export const updateUniversityProfile = catchAsyncErrors(
  async (req, res, next) => {
    const newUniversityData = {
      name: req.body.name,
      email: req.body.email,
    };

    const university = await University.findByIdAndUpdate(
      req.university.id,
      newUniversityData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  }
);
