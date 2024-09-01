import express from "express";

import { isAuthenticatedRecruiter } from "../middleware/employerAuth.js";
import {
  createEmployer,
  employerLogout,
  getEmployerDetails,
  // loginEmployer,
  updateEmployerPassword,
  updateEmployerProfile,
} from "../controllers/employerController.js";

const router = express.Router();

router.route("/employerRegister").post(createEmployer);
// router.route("/employerLogin").post(loginEmployer);

router.route("/employerLogout").get(employerLogout);

router.route("/employer").get(isAuthenticatedRecruiter, getEmployerDetails);
router
  .route("/employerPassword/update")
  .put(isAuthenticatedRecruiter, updateEmployerPassword);
router
  .route("/employerProfile/update")
  .put(isAuthenticatedRecruiter, updateEmployerProfile);

export default router;
