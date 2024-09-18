import React, { useState } from 'react';
import { MdOutlineMailOutline, MdDescription } from "react-icons/md";
import { FaUniversity, FaPhotoVideo } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function UniversitySignupPage() {
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePhotoRemove = () => {
    setPhoto(null);
  };

  return (
    <div className="mt-8 flex justify-center">
      <div className="border-2 border-green-500 py-4 mt-10 px-6 rounded-xl lg:w-2/6 lg:mx-auto bg-white shadow-lg">
        <h1 className="mb-6 text-2xl text-center">
          <span className="text-green-500">Sign Up </span> Page For University
        </h1>
        <form className="flex flex-col gap-4">
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <FaUniversity className="my-auto mx-3 h-6 w-6" />
            <input
              placeholder="Name"
              type="text"
              className="px-2 w-full bg-transparent"
            />
          </div>
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <MdOutlineMailOutline className="my-auto mx-3 h-6 w-6" />
            <input
              placeholder="Email"
              type="email"
              className="px-2 w-full bg-transparent"
            />
          </div>
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <FaUniversity className="my-auto mx-3 h-6 w-6" />
            <input
              placeholder="Address"
              type="text"
              className="px-2 w-full bg-transparent"
            />
          </div>
          <div className="relative border-2 h-32 w-full bg-gray-300 rounded-md">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handlePhotoChange}
            />
            {photo && (
              <div className="relative h-full w-full">
                <img
                  src={photo}
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
            )}
            {!photo && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <FaPhotoVideo className="mr-2 h-6 w-6" />
                <span>Upload Photo</span>
              </div>
            )}
          </div>
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <MdDescription className="my-auto mx-3 h-6 w-6" />
            <textarea
              placeholder="Describe about the university"
              rows="2"
              className="px-2 w-full bg-transparent"
            ></textarea>
          </div>
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <RiLockPasswordLine className="my-auto mx-3 h-6 w-6" />
            <input
              placeholder="Password"
              type="password"
              className="px-2 w-full bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-green-500 to-cyan-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
          >
            Sign Up
          </button>
          <p className="text-base text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-xl text-green-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default UniversitySignupPage;
