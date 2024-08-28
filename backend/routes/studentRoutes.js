import express from "express";
import {
  createStudent,
  loginStudent,
  logout,
} from "../controllers/studentController.js";
// import {
//   isAuthenticatedStudent,
//     authorizeRoles,
// } from "../middleware/studentAuth.js";

const router = express.Router();

router.route("/register").post(createStudent);
router.route("/login").post(loginStudent);

router.route("/logout").get(logout);

export default router;
