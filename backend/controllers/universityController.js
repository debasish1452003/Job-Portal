import catchAsyncErrors from "../middleware/catchAsyncError.js";
import University from "../models/universityModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import sendToken from "../utils/jwtToken.js";

// Create University
export const createUniversity = catchAsyncErrors(async (req, res, next) => {
  const { name, address, description, email, password } = req.body;

  const university = await University.create({
    name,
    address,
    password,
    description,
    email,
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
  const university = await University.findById(req.university.id);

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

// Update University Profile
export const updateUniversityProfile = catchAsyncErrors(
  async (req, res, next) => {
    const newUniversityData = {
      name: req.body.name,
      email: req.body.email,
    };

    // if (req.body.avatar && req.body.avatar !== "") {
    //   const user = await User.findById(req.user.id);

    //   if (!user) {
    //     // Handle case where user is not found
    //     return res.status(404).json({ message: "User not found" });
    //   }

    //   const imageId = user.avatar.public_id;

    //   if (imageId) {
    //     await cloudinary.v2.uploader.destroy(imageId);
    //   }

    //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    //   });

    //   newUserData.avatar = {
    //     public_id: myCloud.public_id,
    //     url: myCloud.secure_url,
    //   };
    // }

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
