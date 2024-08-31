import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <Link
      className="jobCard flex flex-col bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
      to={`/job/${job._id}`}
    >
      <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
      <p className="text-sm text-gray-600 mt-1">{job.description}</p>

      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">{job.location}</span>
        {job.salary && (
          <span className="text-sm font-medium text-green-500">{`₹${job.salary}`}</span>
        )}
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <span>Requirements: {job.requirements || "Not specified"}</span>
      </div>

      <div className="mt-3 text-xs text-gray-400">
        Posted by:{" "}
        <span className="text-gray-600 font-medium">
          {job.employer.name || "Employer"}
        </span>
      </div>
    </Link>
  );
};

export default JobCard;
