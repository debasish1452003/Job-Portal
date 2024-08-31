import express from "express";
import {
  createStudent,
  getAllstudents,
  getSingleStudent,
  getStudentDetails,
  loginStudent,
  logout,
  updatePassword,
  updateProfile,
  deleteProfile
} from "../controllers/studentController.js";

import { isAuthenticatedStudent } from "../middleware/studentAuth.js";

const router = express.Router();

router.route("/register").post(createStudent);
router.route("/login").post(loginStudent);

router.route("/logout").get(logout);
router.route("/student").get(isAuthenticatedStudent, getStudentDetails);
router.route("/password/update").put(isAuthenticatedStudent, updatePassword);
router.route("/student/update").put(isAuthenticatedStudent, updateProfile);
router.route("/student/delete").delete(isAuthenticatedStudent,deleteProfile);

// router
//   .route("/admin/users")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getAllstudents);

// router
//   .route("/admin/users/:id")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleStudent)

export default router;
