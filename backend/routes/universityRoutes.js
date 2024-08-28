import express from "express";
import {
  createUniversity,
  loginUniversity,
  universityLogout,
} from "../controllers/universityController.js";

import { isAuthenticatedUniversity } from "../middleware/universityAuth.js";

const router = express.Router();

router.route("/universityRegister").post(createUniversity);
router.route("/universityLogin").post(loginUniversity);

router.route("/universityLogout").get(universityLogout);

export default router;
