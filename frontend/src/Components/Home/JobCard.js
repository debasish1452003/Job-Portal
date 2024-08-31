import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const formatSalary = (salary) => {
    return new Intl.NumberFormat("en-IN").format(salary);
  };

  return (
    <Link
      className="jobCard flex flex-col bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition-shadow duration-300"
      to={`/job/${job._id}`}
    >
      <div className="flex items-center justify-between mb-4">
        {/* Company Logo */}
        <img
          src={
            job.employer.logoUrl ||
            "https://i.postimg.cc/bJbpjrwD/pngimg-com-microsoft-PNG18.png"
          }
          alt="Company Logo"
          className="w-12 h-12 object-cover border border-gray-200"
        />

        {/* Job Title and Salary */}
        <div className="flex flex-col items-end">
          <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
          {job.salary && (
            <span className="text-md font-medium text-gray-800">
              CTC(Annual):{" "}
              <span className="text-green-600">{`₹${formatSalary(
                job.salary
              )}`}</span>
            </span>
          )}
        </div>
      </div>

      {/* Job Requirements */}
      <div className="text-sm text-gray-500 mt-1">
        <span className="font-medium">Requirements:</span>{" "}
        {job.requirements || "Not specified"}
      </div>

      {/* Location and Posted by */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
        <div className="text-gray-600">
          <span className="font-medium">Location:</span>{" "}
          {job.location || "Not specified"}
        </div>
        <div>
          Posted by:{" "}
          <span className="text-gray-600 font-medium">
            {job.employer.companyName || "Employer"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
