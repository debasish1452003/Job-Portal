import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineMailOutline, MdLockOutline, MdPersonOutline } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../Actions/userActions";
import { useSnackbar } from "notistack";

const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    error,
    loading,
    isAuthenticatedStudent,
    isAuthenticatedUniversity,
    isAuthenticatedEmployer,
  } = useSelector((state) => state.user);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [role, setRole] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validRoles = ["student", "university", "employer"];



  const loginSubmit = (e) => {
    e.preventDefault();

    if (!validRoles.includes(role)) {
      console.error("Invalid role specified");
      enqueueSnackbar("Invalid role specified. Please try again.", {
        variant: "error",
      });
      return;
    }

    setFormSubmitted(true);
    const userType = role;
    dispatch(login(loginEmail, loginPassword, userType));
  };


  const redirect = location.search ? location.search.split("=")[1] : "/Home";

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (
      formSubmitted &&
      ((role === "student" && isAuthenticatedStudent) ||
        (role === "university" && isAuthenticatedUniversity) ||
        (role === "employer" && isAuthenticatedEmployer))
    ) {
      enqueueSnackbar("Login successful!", { variant: "success" });
      navigate(redirect);
    }
  }, [
    dispatch,
    error,
    formSubmitted,
    enqueueSnackbar,
    navigate,
    isAuthenticatedStudent,
    isAuthenticatedUniversity,
    isAuthenticatedEmployer,
    redirect,
    role,
  ]);

  const isFormValid = loginEmail && loginPassword && role;

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="border-2 border-green-500 py-6 px-6 mx-4 rounded-xl w-full max-w-md">
        <h1 className="mb-4 text-2xl text-center">
          <span className="text-green-500">Login</span> Page
        </h1>
        <form
          className="flex flex-col justify-center items-center gap-3"
          onSubmit={loginSubmit}
        >
          <div className="flex border-2 h-10 w-3/4 bg-gray-300">
            <AiOutlineMail className="my-auto mx-3 h-6 w-6" />
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
            <MdLockOutline className="my-auto mx-3 h-6 w-6" />
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
            <MdPersonOutline className="my-auto mx-3 h-6 w-6" />
            <select
              className="px-2 w-full"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="university">University</option>
              <option value="employer">Recruiter</option>
            </select>
          </div>
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-green-500 to-cyan-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 w-2/5 mt-3"
            disabled={!isFormValid}
          >
            Login
          </button>
          <p className="text-sm mt-1">Do not have an account?</p>
          <div className="flex flex-col items-center space-y-1">
            <Link to="/recruitersignup" className="text-sm text-green-600">
              Register as a Recruiter
            </Link>
            <Link to="/studentsignup" className="text-sm text-blue-600">
              Register as a Student
            </Link>
            <Link to="/universitysignup" className="text-sm text-red-600">
              Register as a University
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
