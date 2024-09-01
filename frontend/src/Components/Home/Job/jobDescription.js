import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobDetails } from "../../../Actions/jobActions";
import { useSnackbar } from "notistack";

const JobDescription = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const { job, loading, error } = useSelector((state) => state.jobs);
  const { enqueueSnackbar } = useSnackbar();

  const formatSalary = (salary) => {
    return new Intl.NumberFormat("en-IN").format(salary);
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    dispatch(getJobDetails(id));
  }, [dispatch, id, error, enqueueSnackbar]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Job not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{job.title}</h1>
        <div className="border-b border-gray-300 mb-4"></div>

        <div className="flex items-center mb-6">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
            Location: {job.location}
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800">
            Salary:{" "}
            {/* {job.salary ? `₹${job.salary.toLocaleString()}` : "Not specified"} */}
            {`₹${formatSalary(job.salary)}`}
          </span>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Job Description
          </h2>
          <p className="text-gray-600 leading-relaxed">{job.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Requirements
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            {job.requirements &&
              job.requirements
                .split(",")
                .map((requirement, index) => (
                  <li key={index}>{requirement.trim()}</li>
                ))}
          </ul>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 transform hover:scale-105">
            Apply Now
          </button>

          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
            Save Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
