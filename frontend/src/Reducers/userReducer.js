import {
  // Common Constants
  CLEAR_ERRORS,

  // Student Constants
  STUDENT_LOGIN_REQUEST,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_REGISTER_FAIL,
  LOAD_STUDENT_REQUEST,
  LOAD_STUDENT_SUCCESS,
  LOAD_STUDENT_FAIL,
  STUDENT_LOGOUT_REQUEST,
  STUDENT_LOGOUT_SUCCESS,
  STUDENT_LOGOUT_FAIL,

  // University Constants
  UNIVERSITY_LOGIN_REQUEST,
  UNIVERSITY_LOGIN_SUCCESS,
  UNIVERSITY_LOGIN_FAIL,
  UNIVERSITY_REGISTER_REQUEST,
  UNIVERSITY_REGISTER_SUCCESS,
  UNIVERSITY_REGISTER_FAIL,
  LOAD_UNIVERSITY_REQUEST,
  LOAD_UNIVERSITY_SUCCESS,
  LOAD_UNIVERSITY_FAIL,
  UNIVERSITY_LOGOUT_REQUEST,
  UNIVERSITY_LOGOUT_SUCCESS,
  UNIVERSITY_LOGOUT_FAIL,

  // Employer Constants
  EMPLOYER_LOGIN_REQUEST,
  EMPLOYER_LOGIN_SUCCESS,
  EMPLOYER_LOGIN_FAIL,
  EMPLOYER_REGISTER_REQUEST,
  EMPLOYER_REGISTER_SUCCESS,
  EMPLOYER_REGISTER_FAIL,
  LOAD_EMPLOYER_REQUEST,
  LOAD_EMPLOYER_SUCCESS,
  LOAD_EMPLOYER_FAIL,
  EMPLOYER_LOGOUT_REQUEST,
  EMPLOYER_LOGOUT_SUCCESS,
  EMPLOYER_LOGOUT_FAIL,
} from "../Constants/userConstant";

export const userReducer = (
  state = { student: {}, university: {}, employer: {} },
  action
) => {
  switch (action.type) {
    // Student actions
    case STUDENT_LOGIN_REQUEST:
    case STUDENT_REGISTER_REQUEST:
    case LOAD_STUDENT_REQUEST:
    case STUDENT_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticatedStudent: false,
      };

    case STUDENT_LOGIN_SUCCESS:
    case STUDENT_REGISTER_SUCCESS:
    case LOAD_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticatedStudent: true,
        student: action.payload,
      };

    case STUDENT_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        student: null,
        isAuthenticatedStudent: false,
      };

    case STUDENT_LOGIN_FAIL:
    case STUDENT_REGISTER_FAIL:
    case LOAD_STUDENT_FAIL:
    case STUDENT_LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticatedStudent: false,
        student: null,
        error: action.payload,
      };

    // University actions
    case UNIVERSITY_LOGIN_REQUEST:
    case UNIVERSITY_REGISTER_REQUEST:
    case LOAD_UNIVERSITY_REQUEST:
    case UNIVERSITY_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticatedUniversity: false,
      };

    case UNIVERSITY_LOGIN_SUCCESS:
    case UNIVERSITY_REGISTER_SUCCESS:
    case LOAD_UNIVERSITY_SUCCESS:
      if (state.university === action.payload) return state;
      return {
        ...state,
        loading: false,
        isAuthenticatedUniversity: true,
        university: action.payload,
      };

    case UNIVERSITY_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        university: null,
        isAuthenticatedUniversity: false,
      };

    case UNIVERSITY_LOGIN_FAIL:
    case UNIVERSITY_REGISTER_FAIL:
    case LOAD_UNIVERSITY_FAIL:
    case UNIVERSITY_LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticatedUniversity: false,
        university: null,
        error: action.payload,
      };

    // Employer actions
    case EMPLOYER_LOGIN_REQUEST:
    case EMPLOYER_REGISTER_REQUEST:
    case LOAD_EMPLOYER_REQUEST:
    case EMPLOYER_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticatedEmployer: false,
      };

    case EMPLOYER_LOGIN_SUCCESS:
    case EMPLOYER_REGISTER_SUCCESS:
    case LOAD_EMPLOYER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticatedEmployer: true,
        employer: action.payload,
      };

    case EMPLOYER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        employer: null,
        isAuthenticatedEmployer: false,
      };

    case EMPLOYER_LOGIN_FAIL:
    case EMPLOYER_REGISTER_FAIL:
    case LOAD_EMPLOYER_FAIL:
    case EMPLOYER_LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticatedEmployer: false,
        employer: null,
        error: action.payload,
      };

    // Common actions
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
