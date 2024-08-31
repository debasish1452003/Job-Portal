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
  CLEAR_ERRORS,
} from "../Constants/jobConstants";

const initialState = {
  jobs: [],
  job: {},
  loading: false,
  error: null,
  jobsCount: 0,
  filteredJobsCount: 0,
};

export const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_JOB_REQUEST:
    case GET_ALL_JOBS_REQUEST:
    case APPLY_FOR_JOB_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        job: action.payload.job,
        jobs: [...state.jobs, action.payload.job],
      };

    case GET_ALL_JOBS_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: action.payload.jobs,
        jobsCount: action.payload.jobsCount,
        filteredJobsCount: action.payload.filteredjobsCount,
      };

    case APPLY_FOR_JOB_SUCCESS:
      // Find the updated job and replace it in the list of jobs
      const updatedJobs = state.jobs.map((job) =>
        job._id === action.payload.job._id ? action.payload.job : job
      );
      return {
        ...state,
        loading: false,
        jobs: updatedJobs,
        job: action.payload.job,
      };

    case CREATE_JOB_FAIL:
    case GET_ALL_JOBS_FAIL:
    case APPLY_FOR_JOB_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
