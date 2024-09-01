import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getAllJobs } from "../../Actions/jobActions.js";
import Loader from "../layout/Loader/Loader";
import JobCard from "./Job";
import Pagination from "react-js-pagination";
// import Slider from "@material-ui/core/Slider";
import Slider from "@mui/material/Slider";
import { useSnackbar } from "notistack";
import MetaData from "../layout/MetaData";

const AllJobs = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [currentPage, setCurrentPage] = useState(1);
  const [salaryRange, setSalaryRange] = useState([0, 100000]);
  const [jobType, setJobType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState(0);

  const { jobs, loading, error, jobsCount, resultPerPage, filteredJobsCount } =
    useSelector((state) => state.jobs);

  const { keyword } = useParams();

  const jobTypes = ["Full-Time", "Part-Time", "Internship", "Remote"];

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSalaryRangeChange = (event, newRange) => {
    setSalaryRange(newRange);
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    dispatch(
      getAllJobs(keyword, currentPage, salaryRange, jobType, experienceLevel)
    );
  }, [
    dispatch,
    keyword,
    currentPage,
    salaryRange,
    jobType,
    experienceLevel,
    enqueueSnackbar,
    error,
  ]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="All Jobs - JobPortal" />
          <h2 className="text-3xl font-semibold text-center my-6">
            Available Jobs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {jobs && jobs.map((job) => <JobCard key={job._id} job={job} />)}
          </div>

          {keyword && (
            <div className="filterBox bg-white shadow-md p-4 rounded-md">
              <h3 className="text-lg font-medium mb-3">Filters</h3>

              <div>
                <label className="block mb-2">Salary Range</label>
                <Slider
                  value={salaryRange}
                  onChange={handleSalaryRangeChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="salary-slider"
                  min={0}
                  max={100000}
                />
              </div>

              <div className="my-4">
                <label className="block mb-2">Job Type</label>
                <select
                  className="border w-full px-2 py-1"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option value="">All</option>
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="my-4">
                <label className="block mb-2">Experience Level</label>
                <Slider
                  value={experienceLevel}
                  onChange={(e, newValue) => setExperienceLevel(newValue)}
                  aria-labelledby="experience-slider"
                  min={0}
                  max={10}
                  valueLabelDisplay="auto"
                />
              </div>
            </div>
          )}

          {resultPerPage < jobsCount && (
            <div className="paginationBox mt-6">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={jobsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default AllJobs;
