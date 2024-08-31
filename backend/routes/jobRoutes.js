import express from "express";
import {
  applyForJob,
  createJob,
  getAllJobs,
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
  "/jobs/:jobId",
  isAuthenticatedStudent,
  authorizeStudentRoles("student"),
  applyForJob
);

router.get("/jobs", getAllJobs);

export default router;
