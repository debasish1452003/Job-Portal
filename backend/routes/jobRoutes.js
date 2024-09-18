import express from "express";
import {
  applyForJob,
  createJob,
  getAllJobs,
  getJobDetails,
} from "../controllers/jobController.js";
import {
  isAuthenticatedRecruiter,
  authorizeRecruiterRoles,
} from "../middleware/employerAuth.js";
import {
  isAuthenticatedStudent,
  authorizeStudentRoles,
} from "../middleware/studentAuth.js";

const router = express.Router();

router
  .route("/recruiter/job/new")
  .post(
    isAuthenticatedRecruiter,
    authorizeRecruiterRoles("recruiter"),
    createJob
  );

router.post(
  "/jobApply/:jobId",
  isAuthenticatedStudent,
  authorizeStudentRoles("student"),
  applyForJob
);

router.get("/jobs", getAllJobs);
router.get("/job/:id", getJobDetails);

export default router;
