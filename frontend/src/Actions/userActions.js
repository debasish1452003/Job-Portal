import axios from "axios";

import {
  CLEAR_ERRORS,
  EMPLOYER_LOGOUT_REQUEST,
  STUDENT_LOGOUT_REQUEST,
  UNIVERSITY_LOGOUT_REQUEST, // Common action to clear errors
} from "../Constants/userConstant";

// Student Constants
import {
  STUDENT_LOGIN_REQUEST,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_REGISTER_FAIL,
  LOAD_STUDENT_REQUEST,
  LOAD_STUDENT_SUCCESS,
  LOAD_STUDENT_FAIL,
  STUDENT_LOGOUT_SUCCESS,
  STUDENT_LOGOUT_FAIL,
} from "../Constants/userConstant";

// University Constants
import {
  UNIVERSITY_LOGIN_REQUEST,
  UNIVERSITY_LOGIN_SUCCESS,
  UNIVERSITY_LOGIN_FAIL,
  UNIVERSITY_REGISTER_REQUEST,
  UNIVERSITY_REGISTER_SUCCESS,
  UNIVERSITY_REGISTER_FAIL,
  LOAD_UNIVERSITY_REQUEST,
  LOAD_UNIVERSITY_SUCCESS,
  LOAD_UNIVERSITY_FAIL,
  UNIVERSITY_LOGOUT_SUCCESS,
  UNIVERSITY_LOGOUT_FAIL,
} from "../Constants/userConstant";

// Employer Constants
import {
  EMPLOYER_LOGIN_REQUEST,
  EMPLOYER_LOGIN_SUCCESS,
  EMPLOYER_LOGIN_FAIL,
  EMPLOYER_REGISTER_REQUEST,
  EMPLOYER_REGISTER_SUCCESS,
  EMPLOYER_REGISTER_FAIL,
  LOAD_EMPLOYER_REQUEST,
  LOAD_EMPLOYER_SUCCESS,
  LOAD_EMPLOYER_FAIL,
  EMPLOYER_LOGOUT_SUCCESS,
  EMPLOYER_LOGOUT_FAIL,
} from "../Constants/userConstant";

// ------------------------- Login ----------------------

// Unified Login Action
export const login = (email, password, userType) => async (dispatch) => {
  // Determine the type of request based on the role
  let requestType, successType, failType;

  switch (userType) {
    case "student":
      requestType = STUDENT_LOGIN_REQUEST;
      successType = STUDENT_LOGIN_SUCCESS;
      failType = STUDENT_LOGIN_FAIL;
      break;
    case "university":
      requestType = UNIVERSITY_LOGIN_REQUEST;
      successType = UNIVERSITY_LOGIN_SUCCESS;
      failType = UNIVERSITY_LOGIN_FAIL;
      break;
    case "employer":
      requestType = EMPLOYER_LOGIN_REQUEST;
      successType = EMPLOYER_LOGIN_SUCCESS;
      failType = EMPLOYER_LOGIN_FAIL;
      break;
    default:
      throw new Error("Invalid role specified");
  }

  try {
    dispatch({ type: requestType });

    const config = { headers: { "Content-Type": "application/json" } };

    // Unified API call with role specified
    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password, userType },
      config
    );

    // Dispatch based on role success type
    dispatch({ type: successType, payload: data });
  } catch (error) {
    dispatch({
      type: failType,
      payload: error.response.data.message,
    });
  }
};

// --------------------------- Log Out ---------------------------

// Student Logout
export const logoutStudent = () => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_LOGOUT_REQUEST });

    await axios.get("/api/v1/logout");

    dispatch({ type: STUDENT_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: STUDENT_LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// University Logout
export const logoutUniversity = () => async (dispatch) => {
  try {
    dispatch({ type: UNIVERSITY_LOGOUT_REQUEST });

    await axios.get("/api/v1/universityLogout");

    dispatch({ type: UNIVERSITY_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: UNIVERSITY_LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Employer Logout
export const logoutEmployer = () => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYER_LOGOUT_REQUEST });

    await axios.get("/api/v1/logout/employerLogout");

    dispatch({ type: EMPLOYER_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: EMPLOYER_LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//  ------------------------- Student Actions ----------------------

export const studentRegister = (studentData) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_REGISTER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/register`, studentData, config);

    dispatch({ type: STUDENT_REGISTER_SUCCESS, payload: data.student });
  } catch (error) {
    dispatch({
      type: STUDENT_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Load Student
export const loadStudent = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_STUDENT_REQUEST });

    const { data } = await axios.get(`/api/v1/student/me`);

    dispatch({ type: LOAD_STUDENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_STUDENT_FAIL, payload: error.response.data.message });
  }
};

// Student Logout
export const studentLogout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/student/logout`);

    dispatch({ type: STUDENT_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: STUDENT_LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// ----------------------------------Universit Actions -----------------------------

// University Register
export const universityRegister = (universityData) => async (dispatch) => {
  try {
    dispatch({ type: UNIVERSITY_REGISTER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `/api/v1/university/register`,
      universityData,
      config
    );

    dispatch({ type: UNIVERSITY_REGISTER_SUCCESS, payload: data.university });
  } catch (error) {
    dispatch({
      type: UNIVERSITY_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load University
export const loadUniversity = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_UNIVERSITY_REQUEST });

    const { data } = await axios.get(`/api/v1/university/me`);
    console.log("API Response:", data);

    dispatch({ type: LOAD_UNIVERSITY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOAD_UNIVERSITY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// University Logout
export const universityLogout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/university/logout`);

    dispatch({ type: UNIVERSITY_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: UNIVERSITY_LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// -------------------------------- Employer Actions  --------------------------------

// Employer Login
export const employerLogin =
  (email, password, userType) => async (dispatch) => {
    try {
      dispatch({ type: EMPLOYER_LOGIN_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/employer/login`,
        { email, password, userType },
        config
      );

      dispatch({ type: EMPLOYER_LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EMPLOYER_LOGIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Employer Register
export const employerRegister = (employerData) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYER_REGISTER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `/api/v1/employer/register`,
      employerData,
      config
    );

    dispatch({ type: EMPLOYER_REGISTER_SUCCESS, payload: data.employer });
  } catch (error) {
    dispatch({
      type: EMPLOYER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load Employer
export const loadEmployer = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_EMPLOYER_REQUEST });

    const { data } = await axios.get(`/api/v1/employer`);

    dispatch({ type: LOAD_EMPLOYER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOAD_EMPLOYER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Employer Logout
export const employerLogout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/employer/logout`);

    dispatch({ type: EMPLOYER_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: EMPLOYER_LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
