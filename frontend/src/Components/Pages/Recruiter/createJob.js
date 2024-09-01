import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJob, clearErrors } from "../../../Actions/jobActions.js";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    requirements: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.jobs);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createJob(jobData))
      .then(() => {
        enqueueSnackbar("Job created successfully!", { variant: "success" });
        navigate("/jobs");
      })
      .catch((error) => {
        enqueueSnackbar("Failed to create job: " + error.message, {
          variant: "error",
        });
      });
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mt-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create New Job
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter job title"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              value={jobData.description}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter job description"
              rows="4"
              required
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter job location"
              required
            />
          </div>

          <div>
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-gray-700"
            >
              Salary (in INR)
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter salary"
              required
            />
          </div>

          <div>
            <label
              htmlFor="requirements"
              className="block text-sm font-medium text-gray-700"
            >
              Requirements
            </label>
            <input
              type="text"
              id="requirements"
              name="requirements"
              value={jobData.requirements}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter job requirements (e.g., MySQL, Python)"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
