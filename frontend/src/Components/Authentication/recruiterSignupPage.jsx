import React from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { MdHomeWork } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsBrowserEdge } from "react-icons/bs";
import { Link } from "react-router-dom";

function RecruiterSignupPage() {
  return (
    <div className="border-2 border-green-500 mt-10 py-4 mx-4 rounded-xl lg:w-2/6 lg:mx-auto">
      <h1 className="mb-6 text-2xl">
        <span className="text-green-500">Sign Up </span> Page For Recuriter
      </h1>
      <form className="flex flex-col justify-center items-center gap-2">
        <div className="flex border-2 h-10 w-3/4  bg-gray-300">
          <MdHomeWork className="my-auto mx-3 h-6 w-6 " />
          <input placeholder="Comapnyname" type="text" className="px-2 w-full" />
        </div>
        <div className="flex border-2 h-10 w-3/4  bg-gray-300">
          <MdOutlineMailOutline className="my-auto mx-3 h-6 w-6 " />
          <input placeholder="email" type="email" className="px-2 w-full" />
        </div>
        <div className="flex border-2 h-10 w-3/4  bg-gray-300">
          <FaUniversity className="my-auto mx-3 h-6 w-6 " />
          <input placeholder="adress" type="text" className="px-2 w-full" />
        </div>
        <div className="flex border-2 h-10 w-3/4  bg-gray-300">
          <BsBrowserEdge className="my-auto mx-3 h-6 w-6 " />
          <input placeholder="website" type="text" className="px-2 w-full" />
        </div>
        <div className="flex border-2 h-fit w-3/4  bg-gray-300">
          <MdDescription className="my-auto mx-3 h-6 w-6 " />
          <textarea
            placeholder="describe about the company"
            rows="2"
            cols="50"
            className="px-2"
          ></textarea>
        </div>
        <div className="flex border-2 h-10 w-3/4  bg-gray-300">
          <RiLockPasswordLine className="my-auto mx-3 h-6 w-6 " />
          <input placeholder="password" type="text" className="w-full px-2" />
        </div>
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-green-500 to-cyan-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-2/5 mt-4"
        >
          Sign in
        </button>
        <p className="text-base">
          Alreday have an accout ?{" "}
          <Link to="/login" className="text-xl text-green-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RecruiterSignupPage;
