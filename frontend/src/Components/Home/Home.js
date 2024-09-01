import React, { Fragment, useEffect, useState } from "react";
import { CgMouse } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAllJobs } from "../../Actions/jobActions.js";
import Loader from "../layout/Loader/Loader.js";
import { useSnackbar } from "notistack";
import JobCard from "./JobCard.js";
import MetaData from "../layout/MetaData.js";

const Home = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const { loading, error, jobs } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    dispatch(getAllJobs());
  }, [dispatch, error, enqueueSnackbar]);

  const handleSearch = () => {
    console.log("Searching for:", search, "in location:", location);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Home" />

          {/* Banner Section */}
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-center py-24">
            <p className="text-white text-lg">Welcome to Job Portal</p>
            <h1 className="text-white text-5xl font-bold mt-4">
              FIND YOUR DREAM JOBS BELOW
            </h1>

            {/* Search Bar Section */}
            <div className="flex flex-wrap justify-center items-center gap-4 mt-10 w-full px-6 md:px-20">
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search jobs by title, skills, or company"
                className="w-full md:w-1/3 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* Location Dropdown */}
              <select
                className="w-full md:w-1/5 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Select Location</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>

              {/* Search Button */}
              <button
                className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            {/* Scroll Button */}
            <a href="#jobContainer" className="mt-8 inline-block">
              <button className="mt-6 px-6 py-2 bg-white text-green-500 rounded-full flex items-center mx-auto hover:shadow-lg transition-shadow">
                Scroll <CgMouse className="ml-2" />
              </button>
            </a>
          </div>

          {/* Featured Jobs Section */}
          <h2 className="text-3xl font-bold text-center mt-12 mb-6">
            Featured Jobs
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
            id="jobContainer"
          >
            {jobs && jobs.map((job) => <JobCard key={job._id} job={job} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
