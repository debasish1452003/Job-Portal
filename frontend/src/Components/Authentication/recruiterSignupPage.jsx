import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { MdHomeWork } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsBrowserEdge } from "react-icons/bs";
import { Link } from "react-router-dom";

function RecruiterSignupPage() {
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    if (e.target.files.length) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
  };

  return (
    <div className="mt-8 flex justify-center">
      <div className="border-2 border-green-500 py-4 px-6 mt-10 rounded-xl lg:w-2/6 lg:mx-auto bg-white shadow-lg">
        <h1 className="mb-6 text-2xl text-center">
          <span className="text-green-500">Sign Up </span> Page For Recruiter
        </h1>
        <form className="flex flex-col gap-4">
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <MdHomeWork className="my-auto mx-3 h-6 w-6" />
            <input placeholder="Company Name" type="text" className="px-2 w-full bg-transparent" />
          </div>
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <MdOutlineMailOutline className="my-auto mx-3 h-6 w-6" />
            <input placeholder="Email" type="email" className="px-2 w-full bg-transparent" />
          </div>
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <FaUniversity className="my-auto mx-3 h-6 w-6" />
            <input placeholder="Address" type="text" className="px-2 w-full bg-transparent" />
          </div>
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <BsBrowserEdge className="my-auto mx-3 h-6 w-6" />
            <input placeholder="Website" type="text" className="px-2 w-full bg-transparent" />
          </div>
          <div className="flex border-2 h-fit w-full bg-gray-300 rounded-md">
            <MdDescription className="my-auto mx-3 h-6 w-6" />
            <textarea
              placeholder="Describe about the company"
              rows="2"
              className="px-2 w-full bg-transparent"
            ></textarea>
          </div>
          <div className="flex border-2 h-10 w-full bg-gray-300 rounded-md">
            <RiLockPasswordLine className="my-auto mx-3 h-6 w-6" />
            <input placeholder="Password" type="password" className="w-full px-2 bg-transparent" />
          </div>
          <div className="relative border-2 h-24 w-full bg-gray-300 rounded-md">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {photo ? (
              <div className="relative h-full w-full flex justify-center items-center">
                <img src={photo} alt="Uploaded" className="object-cover h-full w-full rounded-md" />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-200"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-full">
                <p className="text-gray-500">Upload Photo</p>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-green-500 to-cyan-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
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

export default RecruiterSignupPage;
