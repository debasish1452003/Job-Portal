import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaFreeCodeCamp } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../Actions/userActions";
import { useSnackbar } from 'notistack';

const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Adjust the selector based on role for authentication
  const { error, loading, isAuthenticatedStudent, isAuthenticatedUniversity, isAuthenticatedEmployer } = useSelector((state) => state.user);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [role, setRole] = useState("");

  // Unified login submission handler
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword, role));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/Home";

  useEffect(() => {
    if (error) {

      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    // Check the relevant authentication flag based on the role
    if (
      (role === "student" && isAuthenticatedStudent) ||
      (role === "university" && isAuthenticatedUniversity) ||
      (role === "employer" && isAuthenticatedEmployer)
    ) {
      enqueueSnackbar("Login successful!", { variant: "success" });
      navigate(redirect);
    }
  }, [dispatch, error, enqueueSnackbar, navigate, isAuthenticatedStudent, isAuthenticatedUniversity, isAuthenticatedEmployer, redirect, role]);

  const isFormValid = loginEmail && loginPassword && role;

  return (
    <div className="border-2 border-green-500 mt-16 py-4 mx-4 rounded-xl lg:w-2/6 lg:mx-auto">
      <h1 className="mb-6 text-2xl">
        <span className="text-green-500">Login </span> Page
      </h1>
      <form className="flex flex-col justify-center items-center gap-2" onSubmit={loginSubmit}>
        <div className="flex border-2 h-10 w-3/4 bg-gray-300">
          <FaFreeCodeCamp className="my-auto mx-3 h-6 w-6" />
          <input
            placeholder="Email"
            type="text"
            className="px-2 w-full"
            required
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div className="flex border-2 h-10 w-3/4 bg-gray-300">
          <MdOutlineMailOutline className="my-auto mx-3 h-6 w-6" />
          <input
            placeholder="Password"
            type="password"
            className="px-2 w-full"
            required
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <div className="flex border-2 h-10 w-3/4 bg-gray-300">
          <MdOutlineMailOutline className="my-auto mx-3 h-6 w-6" />
          <select
            className="px-2 w-full"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="university">University</option>
            <option value="employer">Employer</option>
          </select>
        </div>
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-green-500 to-cyan-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-2/5 mt-4"
          disabled={!isFormValid}
        >
          Login
        </button>
        <p className="text-base">Do not have an account?</p>
        <Link to="/recruitersignup" className="text-base text-green-600">
          Register Page for Recruiter
        </Link>
        <Link to="/studentsignup" className="text-base text-blue-600">
          Register Page for Student
        </Link>
        <Link to="/universitysignup" className="text-base text-red-600">
          Register Page for University
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
