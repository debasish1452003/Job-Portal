import express from "express";
import {
  createUniversity,
  getUniversityDetails,
  loginUniversity,
  universityLogout,
  updateUniversityPassword,
  updateUniversityProfile,
} from "../controllers/universityController.js";

import { isAuthenticatedUniversity } from "../middleware/universityAuth.js";

const router = express.Router();

router.route("/universityRegister").post(createUniversity);
// router.route("/universityLogin").post(loginUniversity);

router.route("/universityLogout").get(universityLogout);

router
  .route("/university")
  .get(isAuthenticatedUniversity, getUniversityDetails);
router
  .route("/universityPassword/update")
  .put(isAuthenticatedUniversity, updateUniversityPassword);
router
  .route("/university/update")
  .put(isAuthenticatedUniversity, updateUniversityProfile);

export default router;
