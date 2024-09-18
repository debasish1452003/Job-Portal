import express from "express";
import {
  createUniversity,
  getUniversitiesByName,
  getUniversityDetails,
  // loginUniversity,
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
  .route("/university/me")
  .get(isAuthenticatedUniversity, getUniversityDetails);

router
  .route("/universityPassword/update")
  .put(isAuthenticatedUniversity, updateUniversityPassword);
router
  .route("/university/update")
  .put(isAuthenticatedUniversity, updateUniversityProfile);

router.get("/universities", getUniversitiesByName);

export default router;
