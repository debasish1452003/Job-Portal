import catchAsyncErrors from "../middleware/catchAsyncError.js";
import Employer from "../models/employerModel.js";
import sendToken from "../utils/jwtToken.js";
import ErrorHandler from "../utils/errorhandler.js";
import cloudinary from "cloudinary";

// Create Recruitere
export const createEmployer = catchAsyncErrors(async (req, res, next) => {
  const { companyName, address, description, email, password, image } =
    req.body;

  // Handle image upload to Cloudinary
  let imageLink = {};

  if (image) {
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "students",
    });

    imageLink = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const employer = await Employer.create({
    companyName,
    address,
    description,
    email,
    password,
    image: imageLink,
  });

  sendToken(employer, 201, res);
});

// Login Recruiter
// export const loginEmployer = catchAsyncErrors(async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return next(new ErrorHandler("Please Enter Email & Password", 400));
//   }

//   const employer = await Employer.findOne({ email }).select("+password");

//   if (!employer) {
//     return next(new ErrorHandler("Invalid email or password", 401));
//   }

//   const isPasswordMatched = await employer.comparePassword(password);

//   if (!isPasswordMatched) {
//     return next(new ErrorHandler("Invalid email or password", 401));
//   }

//   sendToken(employer, 200, res);
// });

// LogOut Employer
export const employerLogout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// ----------------------------  Employer Details -------------------------------------

// GET EMPLOYER DETAILS
export const getEmployerDetails = catchAsyncErrors(async (req, res, next) => {
  const employer = await Employer.findById(req.employer.id);

  res.status(200).json({
    success: true,
    employer,
  });
});

// Update Employer password
export const updateEmployerPassword = catchAsyncErrors(
  async (req, res, next) => {
    const employer = await Employer.findById(req.employer.id).select(
      "+password"
    );

    const isPasswordMatched = await employer.comparePassword(
      req.body.oldPassword
    );

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword != req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }

    employer.password = req.body.newPassword;

    await employer.save();

    sendToken(employer, 200, res);
  }
);

// Update Employer Profile
export const updateEmployerProfile = catchAsyncErrors(
  async (req, res, next) => {
    const newEmployerData = {
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

    const employer = await Employer.findByIdAndUpdate(
      req.employer.id,
      newEmployerData,
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
