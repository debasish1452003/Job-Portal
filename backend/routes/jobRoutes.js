import express from "express";
import { createJob } from "../controllers/jobController.js";
import {
  isAuthenticatedRecruiter,
  authorizeRecruiterRoles,
} from "../middleware/employerAuth.js";

const router = express.Router();

router
  .route("/recruiter/job/new")
  .post(
    isAuthenticatedRecruiter,
    authorizeRecruiterRoles("recruiter"),
    createJob
  );

export default router;
