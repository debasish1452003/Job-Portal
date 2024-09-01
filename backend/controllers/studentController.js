import catchAsyncErrors from "../middleware/catchAsyncError.js";
import Student from "../models/studentModel.js";
import University from "../models/universityModel.js";
import sendToken from "../utils/jwtToken.js";
import Job from "../models/jobModel.js";
import cloudinary from "cloudinary";

// Create Student user
export const createStudent = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    degree,
    major,
    graduationYear,
    skills,
    university,
    image,
  } = req.body;

  let imageLink = {};

  if (typeof image === "string" && image.startsWith("data:image/")) {
    try {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

      // Upload to Cloudinary
      const result = await cloudinary.v2.uploader.upload(
        `data:image/jpeg;base64,${base64Data}`,
        {
          folder: "students",
        }
      );

      imageLink = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      // return next(
      //   new Error(
      //     "Failed to upload image to Cloudinary. Please check the image format."
      //   )
      // );
    }
  } else {
    console.error("Received image is not in the expected format.");
    // return next(
    //   new Error("Invalid image format. Please upload a valid image.")
    // );
  }

  // Create the student record in the database
  const student = await Student.create({
    firstName,
    lastName,
    email,
    password,
    degree,
    major,
    graduationYear,
    skills,
    university,
    image: imageLink,
  });

  // Update the university with the new student
  await University.findByIdAndUpdate(
    university,
    { $push: { students: student._id } },
    { new: true, runValidators: true }
  );

  // Send response
  sendToken(student, 201, res);
});

// LogOut Student
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// ----------------------------  Student Details -------------------------------------

// GET STUDENT DETAILS
export const getStudentDetails = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.student.id).populate(
    "university",
    "name"
  );

  if (!student) {
    return next(new ErrorHandler("Student not found", 404));
  }

  res.status(200).json({
    success: true,
    student,
  });
});

// Update Student password
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.student.id).select("+password");

  const isPasswordMatched = await student.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  student.password = req.body.newPassword;

  await student.save();

  sendToken(student, 200, res);
});

// Update Student Profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newStudentData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
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

  const student = await Student.findByIdAndUpdate(
    req.student.id,
    newStudentData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

// ------------------------------Admin Controllers -------------------------------

// Get all students(admin)
export const getAllstudents = catchAsyncErrors(async (req, res, next) => {
  const students = await Student.find();

  res.status(200).json({
    success: true,
    students,
  });
});

// Get Single Student (admin)
export const getSingleStudent = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    student,
  });
});

// delete student prfile
export const deleteProfile = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id);
  // delete the student form all applied job
  // student.appliedJobs.forEach(async(jobid)=>{
  //    const job_id= await Job.findById(jobid);
  //    const index = await job_id.applicants()
  // })
  await Student.deleteOne();
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
  });
  res.status(200).json({
    success: true,
    message: "your profile deleted sucessfully",
  });
});
