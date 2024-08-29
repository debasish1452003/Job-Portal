import React from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaFreeCodeCamp } from "react-icons/fa6";
import { Link } from "react-router-dom";
function LoginPage() {
  return (
    <div className="border-2 border-green-500 mt-16 py-4 mx-4 rounded-xl lg:w-2/6 lg:mx-auto">
      <h1 className="mb-6 text-2xl">
        <span className="text-green-500">Login </span> Page
      </h1>
      <form className="flex flex-col justify-center items-center gap-2">
        <div className="flex border-2 h-10 w-3/4  bg-gray-300">
          <FaFreeCodeCamp className="my-auto mx-3 h-6 w-6 " />
          <input placeholder="Name" type="text" className="px-2 w-full" />
        </div>
        <div className="flex border-2 h-10 w-3/4  bg-gray-300">
          <MdOutlineMailOutline className="my-auto mx-3 h-6 w-6 " />
          <input placeholder="email" type="email" className="px-2 w-full" />
        </div>
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-green-500 to-cyan-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-2/5 mt-4"
        >
          Login
        </button>
        <p className="text-base">Do not have accout ?</p>
        <Link to="/recuritersignup" className="text-base text-green-600">
          Register Page for Recuriter
        </Link>
        <Link to="/studentsignup" className="text-base text-blue-600">
          Register Page for Student
        </Link>
        <Link to="/unversitysignup" className="text-base text-red-600">
          Register Page for University
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
