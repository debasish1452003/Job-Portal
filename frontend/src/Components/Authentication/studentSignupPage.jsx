import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MdOutlineMailOutline, MdDateRange } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi";
import { FaUserAlt, FaPhotoVideo, FaFreeCodeCamp } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { studentRegister } from "../../Actions/userActions";
import { useSnackbar } from "notistack";
import imageCompression from "browser-image-compression";

function StudentSignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    degree: "",
    major: "",
    graduationYear: "",
    skills: "",
    university: "",
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("/default-avatar.jpg");

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        // Options for image compression
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        // Compress the image
        const compressedFile = await imageCompression(file, options);

        // Create a preview of the image
        const reader = new FileReader();
        reader.onload = () => {
          setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(compressedFile);

        // Set the compressed file as the photo
        setPhoto(compressedFile);
      } catch (error) {
        enqueueSnackbar("Failed to upload photo. Please try again.", {
          variant: "error",
        });
        console.error("Image compression error:", error);
      }
    }
  };

  const handlePhotoRemove = () => {
    setPhoto(null);
    setPhotoPreview("/default-avatar.jpg");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.university
    ) {
      enqueueSnackbar("All required fields must be filled out.", {
        variant: "error",
      });
      return;
    }

    const studentData = new FormData();
    Object.keys(formData).forEach((key) => {
      studentData.append(key, formData[key]);
    });
    if (photo) {
      studentData.append("photo", photo);
    }

    try {
      await dispatch(studentRegister(studentData));
      enqueueSnackbar("Registration successful!", {
        variant: "success",
      });
      navigate("/login");
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Registration failed. Please try again.",
        {
          variant: "error",
        }
      );
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="mt-8 flex justify-center">
      <div className="border-2 border-green-500 py-4 px-6 mt-10 rounded-xl lg:w-2/6 lg:mx-auto bg-white shadow-lg">
        <h1 className="mb-6 text-2xl text-center">
          <span className="text-green-500">Sign Up</span> Page For Student
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <FaUserAlt className="my-auto mx-3 h-6 w-6" />
            <input
              name="firstName"
              placeholder="First Name"
              type="text"
              className="px-2 w-full bg-transparent"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <FaUserAlt className="my-auto mx-3 h-6 w-6" />
            <input
              name="lastName"
              placeholder="Last Name"
              type="text"
              className="px-2 w-full bg-transparent"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <MdOutlineMailOutline className="my-auto mx-3 h-6 w-6" />
            <input
              name="email"
              placeholder="Email"
              type="email"
              className="px-2 w-full bg-transparent"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <RiLockPasswordLine className="my-auto mx-3 h-6 w-6" />
            <input
              name="password"
              placeholder="Password"
              type="password"
              className="px-2 w-full bg-transparent"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <HiAcademicCap className="my-auto mx-3 h-6 w-6" />
            <input
              name="degree"
              placeholder="Degree"
              type="text"
              className="px-2 w-full bg-transparent"
              value={formData.degree}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <HiAcademicCap className="my-auto mx-3 h-6 w-6" />
            <input
              name="major"
              placeholder="Major"
              type="text"
              className="px-2 w-full bg-transparent"
              value={formData.major}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <MdDateRange className="my-auto mx-3 h-6 w-6" />
            <input
              name="graduationYear"
              placeholder="Expected Graduation Year"
              type="number"
              className="px-2 w-full bg-transparent"
              value={formData.graduationYear}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <FaFreeCodeCamp className="my-auto mx-3 h-6 w-6" />
            <input
              name="skills"
              placeholder="Skills"
              type="text"
              className="px-2 w-full bg-transparent"
              value={formData.skills}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <FaUserAlt className="my-auto mx-3 h-6 w-6" />
            <input
              name="university"
              placeholder="University"
              type="text"
              className="px-2 w-full bg-transparent"
              value={formData.university}
              onChange={handleInputChange}
            />
          </div>

          <div className="relative border-2 h-32 w-full bg-gray-300 rounded-md">
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handlePhotoChange}
            />
            {photo ? (
              <div className="relative h-full w-full">
                <img
                  src={photoPreview}
                  alt="Profile Preview"
                  className="object-contain w-full h-full rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  onClick={handlePhotoRemove}
                >
                  X
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <FaPhotoVideo className="mr-2 h-6 w-6" />
                <span>Upload Photo</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-green-500">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default StudentSignupPage;
