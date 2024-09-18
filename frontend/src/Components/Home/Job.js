import React from "react";
import { Link } from "react-router-dom";

const Job = ({ job }) => {
  const formatSalary = (salary) => {
    return new Intl.NumberFormat("en-IN").format(salary);
  };

  return (
    <Link
      className="jobCard flex flex-col bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
      to={`/job/${job._id}`}
    >
      <div className="flex flex-col md:flex-row items-center mb-6">
        {/* Company Logo */}
        <img
          src={
            job.employer.logoUrl ||
            "https://i.postimg.cc/bJbpjrwD/pngimg-com-microsoft-PNG18.png"
          }
          alt="Company Logo"
          className="w-24 h-auto object-contain border border-gray-300 mb-4 md:mb-0"
        />

        {/* Job Title and Salary */}
        <div className="flex flex-col md:ml-6 md:items-start">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
            {job.title}
          </h2>
          {job.salary && (
            <span className="text-lg font-medium text-gray-800">
              CTC (Annual):{" "}
              <span className="text-green-800 font-semibold">{`₹${formatSalary(
                job.salary
              )}`}</span>
            </span>
          )}
        </div>
      </div>

      {/* Job Requirements */}
      <div className="text-base text-gray-700 mb-4">
        <span className="font-semibold text-gray-900">Requirements:</span>{" "}
        {job.requirements || "Not specified"}
      </div>

      {/* Location and Posted by */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <div>
          <span className="font-semibold text-gray-900">Location:</span>{" "}
          {job.location || "Not specified"}
        </div>
        <div className="mt-2 md:mt-0">
          Posted by:{" "}
          <span className="text-gray-800 font-medium">
            {job.employer.companyName || "Employer"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Job;
