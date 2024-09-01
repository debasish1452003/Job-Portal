import axios from "axios";
import {
  CREATE_JOB_REQUEST,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAIL,
  GET_ALL_JOBS_REQUEST,
  GET_ALL_JOBS_SUCCESS,
  GET_ALL_JOBS_FAIL,
  APPLY_FOR_JOB_REQUEST,
  APPLY_FOR_JOB_SUCCESS,
  APPLY_FOR_JOB_FAIL,
  GET_JOB_DETAILS_REQUEST,
  GET_JOB_DETAILS_SUCCESS,
  GET_JOB_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../Constants/jobConstants";

// Create Job --Recruiter
export const createJob = (jobData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_JOB_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/recruiter/job/new`,
      jobData,
      config
    );

    dispatch({ type: CREATE_JOB_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_JOB_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Job Details by ID
export const getJobDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_JOB_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/job/${id}`);

    dispatch({
      type: GET_JOB_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_JOB_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Jobs
export const getAllJobs =
  (queryParams = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_JOBS_REQUEST });

      const { data } = await axios.get(`/api/v1/jobs?${queryParams}`);

      dispatch({
        type: GET_ALL_JOBS_SUCCESS,
        payload: {
          jobs: data.jobs,
          jobsCount: data.jobsCount,
          filteredjobsCount: data.filteredjobsCount,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_JOBS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Apply for Job --Students
export const applyForJob = (jobId) => async (dispatch) => {
  try {
    dispatch({ type: APPLY_FOR_JOB_REQUEST });

    const { data } = await axios.put(`/api/v1/job/${jobId}/apply`);

    dispatch({ type: APPLY_FOR_JOB_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: APPLY_FOR_JOB_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
